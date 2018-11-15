const storage = require('../../services/googleStorage');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
    command: 'del-o ' +'<Filename> ' + '[Bucket]',
    describe: 'Delete an object of your bucket',
    builder: yargs => yargs
        .positional('Bucket', {})
        .positional('Filename', {})
        .default('Bucket', 'my-project-inegi')
        .example(({blue:'ct' ,cmd:'del-o',req:'filename',opt:'bucket'})),
    handler: argv => {
        storage
            .bucket( argv.Bucket )
            .file( argv.Filename )
            .delete()
            .then( _ => console.log(inn({s:`gs://${argv.Bucket}/${argv.Filename}`}), inn({err:'deleted'})) )
			.catch(err => console.error(inn({err:"Error:"}), err.errors[0].message) );
    }
}