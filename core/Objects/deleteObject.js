const storage = require('../googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'deleteObject [Bucketname] [Filename]',
    aliases: ['delobj'],
    describe: 'Delete an object of your bucket',
    builder: yargs => yargs.default('Bucketname', 'my-project-inegi'),
    handler: argv => {

        storage
            .bucket( argv.Bucketname )
            .file( argv.Filename )
            .delete()
            .then( _ => {
                console.log(`gs://${argv.Bucketname}/${argv.Filename} deleted.`);
            })
            .catch( err => console.error('ERROR:',err.errors[0].message) );
    }
}