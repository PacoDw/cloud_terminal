const argv = require('yargs');

// My method
const listObject = require('./core/Objects/listObject');
const deleteObject = require('./core/Objects/deleteObject');
const downloadObject = require('./core/Objects/downloadObject');
const uploadObject = require('./core/Objects/uploadObject');
const renameObject = require('./core/Objects/renameObject');
const createBucket = require('./core/Buckets/createBucket');
const listBuckets = require('./core/Buckets/listBuckets');
const localFolder = require('./core/localFolder');

// Config
const { config, checkPath } = require('./core/config');

argv
	.middleware( [ checkPath ] )
	.usage('\nWelcome Google Storage.\n\nUsage: $0 [options]')
	.command( localFolder )
	.command( uploadObject )
	.command( createBucket )
	.command( listObject )
	.command( deleteObject )
	.command( downloadObject )
	.command( listBuckets )
	.command( renameObject )
	
	// -Here other command
	.demandCommand()
	.example('node myStorage.js ls my-project-inegi')
	.help()
	.alias('help', 'h')
	.config( config )
	.wrap( argv.myWrap )
	.argv;