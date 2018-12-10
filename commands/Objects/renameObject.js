const storage = require('../../services/googleStorage');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
	command: 'ren-o' + ' <Filename>' + ' <newName>' + ' [Bucket]',
	describe: 'Rename an object of your bucket',
	builder: yargs => yargs
		.positional('Bucket', {})
		.positional('Filename', {})
		.positional('newName', {})
		.default('Bucket', 'my-project-inegi')
		.example(inn({ct:"ct",cmd:'ren-o',req: '<Filename>',req:'<newName>',opt:'[Bucket]'})),	
	handler: argv => {
		storage
			.bucket(argv.Bucket)
			.file(argv.Filename)
			.move(argv.newName)
			.then(() => console.log(inn({err:`gs://${argv.Bucket}/${argv.Filename}`}), `renamed to`, inn({s:`gs://${argv.Bucket}/${argv.newName}.`})) )
			.catch(err => console.error(inn({err:"Error:"}), err.errors[0].message) );
	}
}
