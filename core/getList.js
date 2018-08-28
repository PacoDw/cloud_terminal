const storage = require('./googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command  : 'getList [parameter]',
    aliases  : ['ls', 'list'],
    describe : 'Get all data',
    builder  : yargs => yargs.default('parameter'),
    handler  : argv => {

        // This is the storage method----------------------------
        storage
            .bucket(argv.parameter)
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('Files:');
                files.forEach(file => console.log(file.name) );
            } )
            .catch(err => console.error('ERROR:', err) );
        // End method --------------------------------------------

    }
} 