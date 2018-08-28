const argv = require('yargs');

// My method
const getList = require('./core/getList');
const deleteObject = require('./core/deleteObject');

argv
	.usage('\nWelcome Google Storage.\n\nUsage: $0 [options]')
	.command( getList )
	.command(deleteObject)
	// -Here other command
	.demandCommand()
	.example('node myStorage.js ls my-project-inegi')
	.help()
	.alias('help', 'h')
	.wrap(72)
	.argv;