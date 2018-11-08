const storage = require('../googleStorage');

module.exports = {
    command: 'up-o <Filename> [Bucket]',
    describe: 'Upload an object from your bucket',
    builder: yargs => yargs
		.positional('Filename', {})
		.positional('Bucket', {})
        .default('Bucket', 'my-project-inegi')
		.example('ct up-o Filename [optional bucket]'),
    handler: argv => {
        storage
            .bucket(argv.Bucket)
            .upload(argv.Filename)
            .then(() => console.log(`${argv.Filename} uploaded to ${argv.Bucket}.`) )
            .catch(_ => console.error('ERROR: File or Bucket not found') );
    }
}