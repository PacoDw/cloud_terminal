const fif = require('../core/findInFiles').find;
const fs = require('fs');
const path = require('path');
const findUp = require('find-up');
require('./config/themeColors');

class PDFsValidate {
    constructor() {
        this.pathConfig = findUp.sync( '.config.json' ) || ''; 
        this.config = this.pathConfig ? JSON.parse( fs.readFileSync(this.pathConfig, 'utf-8')) : {}; 
        this.results = {};
    }   

    findInFiles({ word, dir, typeFile, resultsName }) {
        console.log('\nWorking...'.yellow)

        return fif(word, path.join(dir, 'PDFs'), typeFile || '.$')
            .then( res => {
                console.log('Creating results file... '.yellow)
                this.setResults = res;
                createRes(res, this.config['path'], resultsName);
            })
            .catch( err => console.log('Error: ',err));
    }
}

function createRes(res, dir, resultsName) {
    let fullPath = path.join(dir, `${resultsName}.json`);
    fs.writeFile(fullPath, JSON.stringify( res, 0, 4 ), 'utf-8', err => {
        if (err)   console.err('ERROR: '.red, err);
        console.log('Finish\n'.s)
        console.log('The results file has been created at: ', fullPath.s);
    });
}

module.exports = new PDFsValidate();
