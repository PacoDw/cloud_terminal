const argv = require('yargs');

// My method
const getList = require('./core/Objects/getList');
const deleteObject = require('./core/Objects/deleteObject');
const downloadObject = require('./core/Objects/downloadObject');
const uploadObject = require('./core/Objects/uploadObject');
const renameObject = require('./core/Objects/renameObject');
const createBucket = require('./core/Buckets/createBucket');
const listBuckets = require('./core/Buckets/listBuckets');


argv
	.usage('\nWelcome Google Storage.\n\nUsage: $0 [options]')
	.command( getList )
	.command(deleteObject)
	.command(downloadObject)
	.command(uploadObject)
	.command(createBucket)
	.command(listBuckets)
	.command(renameObject)

	// -Here other command
	.demandCommand()
	.example('node myStorage.js ls my-project-inegi')
	.help()
	.alias('help', 'h')
	.wrap(72)
	.argv;