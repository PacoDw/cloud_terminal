'use strict';

var find = require('find'),
    fs = require('fs'),
    Q = require('q'),
    path = require('path'),
    extract = require('pdf-text-extract');
require('../config/themeColors');
const _cliProgress = require('cli-progress');

function readFile(filename) {
    if (filename.match(/.*\.pdf$/gm))
        return Q.nfcall(extract, filename).catch(_ => Promise.reject(filename));
    else
        return Q.nfcall(fs.readFile, filename, 'utf-8');
}

function searchFile(data) {
    return function (content) {

        var match = [], linesMatch = [];

        if (data.filename.match(/.*\.pdf$/gm)) {
            content.forEach((paragraph, i) => {
                match.push.apply(match, paragraph.match(data.regex))
                linesMatch.push.apply(linesMatch, paragraph.match(data.lineRegEx))
            });
        }
        else {
            match = content.match(data.regex)
            linesMatch = content.match(data.lineRegEx)
        }

        return {
            filename: data.filename,
            match: match || '',
            lines: linesMatch || ''
        };
    };
}

function getFileFilter(fileFilter) {
    if (typeof fileFilter === 'string') {
        fileFilter = new RegExp(fileFilter);
    } else if (typeof fileFilter === 'undefined') {
        fileFilter = new RegExp('.');
    }
    return fileFilter;
}

function getRegEx(pattern, regex) {
    var flags, term, grabLineRegEx

    if (typeof pattern === 'object' && pattern.flags) {
        term = pattern.term
        flags = pattern.flags
    } else {
        term = pattern
        flags = 'g'
    }

    grabLineRegEx = "(.*" + term + ".*)"

    if (regex === 'line') {
        return new RegExp(grabLineRegEx, flags)
    }

    return new RegExp(term, flags);
}

function getMatchedFiles(pattern, files, resultName) {
    if (resultName) {
        let dir = resultName.substring(0, resultName.lastIndexOf('/')+1);
        const progressBar = new _cliProgress.Bar({
            fps: 23,
            position: 'center'
        }, _cliProgress.Presets.shades_classic);

        let count = 0;
        progressBar.start(files.length, count)

        fs.open(resultName, 'a', (err, fd) => {
            if (err) console.log(err);
            return new Promise((resolve, reject) => {

                for (var i = 0; i < files.length; i++) {
                    readFile(files[i])
                        .then(searchFile({
                            regex: getRegEx(pattern),
                            lineRegEx: getRegEx(pattern, 'line'),
                            filename: files[i]
                        }))
                        .then(function (res) {

                            // console.log('RES: ')
                            // console.log('\n :', i)
                            progressBar.update(++count);
                            // console.log('\n\n',count, ' ', i)
                            if (res.match && res.match != '')
                            {
                                fs.appendFile(resultName, JSON.stringify(res, null, 4), 'utf8', (err) => {
                                    if (err) console.log(err);
                                });
                            }
                            else
                            {
                                fs.appendFile(path.join(dir,'withoutMatches.json'), JSON.stringify(res, null, 4), 'utf8', (err) => {
                                    if (err) console.log(err);
                                });   
                            }

                            if (count == i)
                                return resolve(count);    
                        })
                        .catch( e => {
                            progressBar.update(++count);
                            // console.log('\n\n',count, ' ', i)
                            // console.log(files[count])
                            fs.appendFile(path.join(dir,'CORRUPTFILES.json'), JSON.stringify({corrup: e}, null, 4), 'utf8', (err) => {
                                if (err) console.log(err);
                            });
                            if (count == files.length)
                                return resolve(count); 
                        })
                }
            })
                .then(c => {
                    if (c == files.length) {
                        progressBar.stop();
                        fs.close(fd, (err) => {
                            if (err) throw err;
                            console.log('\nFinish!\n'.s)
                            console.log('The Results and WithoutMatches files have been created at: ', dir.s);
                            process.exit()
                        });
                    }
                })
        });
    }
    else {
        var matchedFiles = []
        for (var i = files.length - 1; i >= 0; i--) {
            matchedFiles.push(readFile(files[i])
                .then(searchFile({
                    regex: getRegEx(pattern),
                    lineRegEx: getRegEx(pattern, 'line'),
                    filename: files[i]
                })));
        }
        return matchedFiles;
    }
}

function getResults(content) {
    var results = {}

    for (var i = 0; i < content.length; i++) {
        var fileMatch = content[i].value;
        if (fileMatch && fileMatch.match !== null) {
            results[fileMatch.filename] = {
                matches: fileMatch.match,
                count: fileMatch.match.length,
                line: fileMatch.lines
            };
        }
    }

    return results;
}

exports.find = function (pattern, directory, fileFilter) {
    var deferred = Q.defer()
    find
        .file(getFileFilter(fileFilter), directory, function (files) {
            Q.allSettled(getMatchedFiles(pattern, files))
                .then(function (content) {
                    deferred.resolve(getResults(content));
                })
                .done();
        })
        .error(function (err) {
            deferred.reject(err)
        });
    return deferred.promise;
};

exports.findSync = function (pattern, directory, fileFilter) {
    var deferred = Q.defer();
    var files;
    try {
        files = find.fileSync(getFileFilter(fileFilter), directory);
        Q.allSettled(getMatchedFiles(pattern, files))
            .then(function (content) {
                deferred.resolve(getResults(content));
            })
            .done();
    } catch (err) {
        deferred.reject(err)
    }
    return deferred.promise;
};

exports.findAndCreateFile = function (pattern, directory, fileFilter, resultName) {
    find
        .file(getFileFilter(fileFilter), directory, function (files) {
            getMatchedFiles(pattern, files, resultName)
        });
};