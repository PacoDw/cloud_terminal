const storage = require('../../services/googleStorage');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
    command: 'up-o' + ' <Filename>' + ' [Bucket]',
    describe: 'Upload an object from your bucket',
    builder: yargs => yargs
		.positional('Filename', {})
		.positional('Bucket', {})
        .default('Bucket', 'my-project-inegi')
		.example(inn({cmd:'up-o',req:'<Filename>',opt:'[Bucket]'})),
    handler: argv => {
        storage
            .bucket(argv.Bucket)
            .upload(argv.Filename)
            .then(() => console.log(`${argv.Filename} uploaded to ${argv.Bucket.s}.`) )
            .catch(_ => console.error('ERROR: '.er, 'File or Bucket not found') );
    }
}