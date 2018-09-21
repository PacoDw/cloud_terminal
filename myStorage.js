const yargs = require('yargs');
const SettingsFile = require('./core/config');

const cmd = require('./core');

let checkConfig =  _ => {
	return { 
		yargs :  SettingsFile.checkConfig(yargs)
	} 
}

/* All commands */
yargs
	.middleware( [checkConfig] )
	.usage('\nWelcome Google Storage.\n\nUsage: $0 [options]')
	.command( cmd.localFolder )
	.command( cmd.uploadObject )
	.command( cmd.createBucket )
	.command( cmd.listObject )
	.command( cmd.deleteObject )
	.command( cmd.downloadObject )
	.command( cmd.listBuckets )
	.command( cmd.renameObject )
	.demandCommand()
	.example('node myStorage.js ls-o my-project-inegi')
	.help()
	.alias('help', 'h')
	// .config( SettingsFile.config )
	.wrap( yargs.customWrap )
	.argv;