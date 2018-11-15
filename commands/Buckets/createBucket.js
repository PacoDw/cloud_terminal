const storage = require('../../services/googleStorage');
require('../../core/config/themeColors');
const inn = require('../../core/config/interfaceMessages');

module.exports = {
    command: 'new ' + ' <name>',
    aliases: ['n'],
    describe: 'Create a new Bucket',
    handler: argv => {
        storage
            .createBucket(argv.name, {
                location: 'ASIA',
                storageClass: 'COLDLINE',
            })
            .then( _ => console.log(`Bucket ${inn({s:argv.name})} created.`) )
            .catch( err => console.error(inn({err:"Error:"}),err.errors[0].message) );
    }
}