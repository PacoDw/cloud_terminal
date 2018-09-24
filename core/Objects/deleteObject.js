const storage = require('../googleStorage');

module.exports = {
    command: 'deleteObject <Filename> [Bucket]',
    describe: 'Delete an object of your bucket',
    aliases: ['del-o'],
    builder: yargs => yargs
        .positional('Bucket', {})
        .positional('Filename', {})
        .default('Bucket', 'my-project-inegi')
        .example('node myStorage del-o Filename [optional bucket]'),
    handler: argv => {
        storage
            .bucket( argv.Bucket )
            .file( argv.Filename )
            .delete()
            .then( _ => console.log(`gs://${argv.Bucket}/${argv.Filename} deleted.`) )
            .catch( err => console.error('ERROR:',err.errors[0].message) );
    }
}