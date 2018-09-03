const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'createBucket [name]',
    aliases: ['cr', 'create'],
    describe: 'Create a new Bucket',
    builder: yargs => yargs.default('name'),
    handler: argv => {

        storage
        .createBucket(argv.name, {
            location: 'ASIA',
            storageClass: 'COLDLINE',
        })
        .then( _ => {
            console.log(`Bucket ${argv.name} created.`);
        })
        .catch( err => {
            console.error('ERROR:',err.errors[0].message);
        });
    }
}