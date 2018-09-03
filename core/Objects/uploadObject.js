const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'uploadObject [Bucketname] [filename]',
    aliases: ['up', 'upload'],
    describe: 'Upload an object from your bucket',
    builder: yargs => yargs.default('nameBucket', 'my-project-inegi'),
    handler: argv => {

        storage
            .bucket(argv.Bucketname)
            .upload(argv.filename)
            .then(() => {
                console.log(`${argv.filename} uploaded to ${argv.Bucketname}.`);
            })
            .catch(err => console.error('ERROR:',err.errors[0].message) );
    }
}