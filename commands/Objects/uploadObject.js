const storage = require('../../services/googleStorage');
require('../../core/config/themeColors');

module.exports = {
    command: 'up-o'.cmd + ' <Filename>'.req + ' [Bucket]'.opt,
    describe: 'Upload an object from your bucket',
    builder: yargs => yargs
		.positional('Filename', {})
		.positional('Bucket', {})
        .default('Bucket', 'my-project-inegi')
		.example('ct'.blue + ' up-o'.cmd + ' <Filename>'.req + ' [Bucket]'.opt),
    handler: argv => {
        storage
            .bucket(argv.Bucket)
            .upload(argv.Filename)
            .then(() => console.log(`${argv.Filename} uploaded to ${argv.Bucket}.`) )
            .catch(_ => console.error('ERROR: File or Bucket not found') );
    }
}