const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'createBucket [parameter]',
    aliases: ['cr', 'create'],
    describe: 'Create a new Bucket',
    builder: yargs => yargs.default('parameter'),
    handler: argv => {

        storage
        .createBucket(argv.parameter, {
            location: 'ASIA',
            storageClass: 'COLDLINE',
        })
        .then(() => {
            console.log(`Bucket ${argv.parameter} created.`);
        })
        .catch(err => {
            console.error('ERROR:',err.errors[0].message);
        });
    }
}