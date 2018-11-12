const storage = require('../../services/googleStorage');
require('../../core/config/themeColors');

module.exports = {
	command: 'ren-o'.cmd + ' <Filename>'.req + ' <newName>'.req + ' [Bucket]'.opt,
	describe: 'Rename an object of your bucket',
	builder: yargs => yargs
		.positional('Bucket', {})
		.positional('Filename', {})
		.positional('newName', {})
		.default('Bucket', 'my-project-inegi')
		.example('ct'.blue + ' ren-o'.cmd + ' <Filename>'.req + ' <newName>'.req + ' [Bucket]'.opt),	
	handler: argv => {
		storage
			.bucket(argv.Bucket)
			.file(argv.Filename)
			.move(argv.newName)
			.then(() => console.log(`gs://${argv.Bucket}/${argv.Filename} renamed to gs://${argv.Bucket}/${argv.newName}.`) )
			.catch(err => console.error('ERROR:', err.errors[0].message) )
	}
}
