const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'uploadObject [parameter] [filename]',
    aliases: ['up', 'upload'],
    describe: 'Upload an object from your bucket',
    builder: yargs => yargs.default('parameter', 'filename'),
    handler: argv => {

        storage
            .bucket(argv.parameter)
            .upload(argv.filename)
            .then(() => {
                console.log(`${argv.filename} uploaded to ${argv.parameter}.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });

    }
}