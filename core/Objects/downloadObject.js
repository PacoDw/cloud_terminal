const storage = require('../googleStorage');
const path = require('path');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'downloadObject [Bucketname] [srcFilename]',
    aliases: ['down', 'download'],
    describe: 'Download an object from your bucket',
    builder: yargs => yargs.default('Bucketname', 'my-project-inegi'),
    handler: argv => {

        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: path.join( argv.path, `/${argv.srcFilename}` ),
          };
          
        storage
            .bucket(argv.Bucketname)
            .file(argv.srcFilename)
            .download(options)
            .then(() => {
                console.log(
                    `gs://${argv.Bucketname}/${argv.srcFilename} downloaded to ${argv.path}.`
                );
            })
            .catch(err => console.error('ERROR:',err.message) );
    }
}