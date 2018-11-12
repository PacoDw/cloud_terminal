const storage = require('../../services/googleStorage');
require('../../core/config/themeColors');

module.exports = {
    command: 'del-o '.cmd +'<Filename> '.req + '[Bucket]'.opt,
    describe: 'Delete an object of your bucket',
    builder: yargs => yargs
        .positional('Bucket', {})
        .positional('Filename', {})
        .default('Bucket', 'my-project-inegi')
        .example('ct'.blue + ' del-o'.cmd + ' filename'.req + ' bucket'.opt),
    handler: argv => {
        storage
            .bucket( argv.Bucket )
            .file( argv.Filename )
            .delete()
            .then( _ => console.log(`gs://${argv.Bucket}/${argv.Filename} deleted.`) )
            .catch( err => console.error('ERROR:',err.errors[0].message) );
    }
}