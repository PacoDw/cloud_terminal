const storage = require('../googleStorage');

module.exports = {
    command: 'listObject [Bucket]',
    aliases: ['ls-o'],
    describe: 'List all objects/files',
    builder: yargs => yargs
        .default('Bucket', 'my-project-inegi'),
    handler: argv => {
        storage
            .bucket(argv.Bucket)
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('\nFiles:');
                files.forEach(file => console.log(file.name) );
            } )
            .catch(err => console.error('ERROR:',err.errors[0].message) );
    }
} 