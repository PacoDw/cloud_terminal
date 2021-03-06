const storage = require('../../services/googleStorage');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
    command:  'ls-o' + ' [Bucket]',
    describe: 'List all objects/files',
    builder: yargs => yargs
        .default('Bucket', 'my-project-inegi'),
    handler: argv => {
        storage
            .bucket(argv.Bucket)
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('\nFiles:'.s);
                files.forEach((file, i) => console.log(`${i} ${file.name}`) );
            } )
            .catch(err => console.error('ERROR: '.bgRed, err.errors[0].message.red) );
    }
} 