const storage = require('../googleStorage')

module.exports = {
	command: 'ren-o <Filename> <newName> [Bucket]',
	describe: 'Rename an object of your bucket',
	builder: yargs => yargs
		.positional('Bucket', {})
		.positional('Filename', {})
		.positional('newName', {})
		.default('Bucket', 'my-project-inegi')
		.example('ct ren-o Filename newName [optional bucket]'),	
	handler: argv => {
		storage
			.bucket(argv.Bucket)
			.file(argv.Filename)
			.move(argv.newName)
			.then(() => console.log(`gs://${argv.Bucket}/${argv.Filename} renamed to gs://${argv.Bucket}/${argv.newName}.`) )
			.catch(err => console.error('ERROR:', err.errors[0].message) )
	}
}
