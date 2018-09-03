const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'listObject [Bucketname]',
    aliases: ['ls-o'],
    describe: 'Get all data',
    builder: yargs => yargs.default('Bucketname', 'my-project-inegi'),
    handler: argv => {

        // This is the storage method----------------------------
        storage
            .bucket(argv.Bucketname)
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('\nFiles:');
                files.forEach(file => console.log(file.name) );
            } )
            .catch(err => console.error('ERROR:',err.errors[0].message) );

        // End method --------------------------------------------

    }
} 