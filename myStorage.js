const yargs = require('yargs');

// Config
const JsonFile = require('./core/config');
const jsonFile = new JsonFile(yargs);


// My method
const listObject = require('./core/Objects/listObject');
const deleteObject = require('./core/Objects/deleteObject');
const downloadObject = require('./core/Objects/downloadObject');
const uploadObject = require('./core/Objects/uploadObject');
const renameObject = require('./core/Objects/renameObject');
const createBucket = require('./core/Buckets/createBucket');
const listBuckets = require('./core/Buckets/listBuckets');
const localFolder = require('./core/localFolder');


let checkConfig = _ => jsonFile.checkConfig()

yargs
	.middleware( [checkConfig] )
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
	.config( jsonFile.config )
	.wrap( yargs.customWrap )
	.argv;