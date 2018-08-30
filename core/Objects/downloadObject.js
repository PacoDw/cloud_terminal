const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'downloadObject [parameter] [srcFilename] [destFilename]',
    aliases: ['down', 'download'],
    describe: 'Download an object from your bucket',
    builder: yargs => yargs.default('parameter', 'srcFilename', 'destFilename'),
    handler: argv => {

        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: argv.destFilename,
          };
          
        storage
            .bucket(argv.parameter)
            .file(argv.srcFilename)
            .download(options)
            .then(() => {
                console.log(
                    `gs://${argv.parameter}/${argv.srcFilename} downloaded to ${argv.destFilename}.`
                );
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}