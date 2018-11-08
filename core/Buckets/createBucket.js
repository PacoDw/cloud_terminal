const storage = require('../googleStorage');

module.exports = {
    command: 'new <name>',
    aliases: ['n'],
    describe: 'Create a new Bucket',
    handler: argv => {
        storage
            .createBucket(argv.name, {
                location: 'ASIA',
                storageClass: 'COLDLINE',
            })
            .then( _ => console.log(`Bucket ${argv.name} created.`) )
            .catch( err => console.error('ERROR:',err.errors[0].message) );
    }
}