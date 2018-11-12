#!/usr/bin/env node
const yargs = require('yargs');
const SettingsFile = require('./core/SettingsFile');
const cmd = require('./commands');
require('./core/config/themeColors');

let checkConfig =  _ => {
	return { yargs :  SettingsFile.checkConfig(yargs) }
}

/* All commands */
yargs
	.middleware( [checkConfig] )
	.scriptName("ct".blue)
	.usage('\nWelcome Google Storage.\n\nUsage: $0 '+ 'command '.cmd + '<required>'.req +  ' [optional]'.opt)
	.command( cmd.localFolder )
	.command( cmd.uploadObject )
	.command( cmd.createBucket )
	.command( cmd.listObject )
	.command( cmd.deleteObject )
	.command( cmd.downloadObject )
	.command( cmd.listBuckets )
	.command( cmd.renameObject )
	.command( cmd.validateFile )
	.demandCommand()
	.example('ct'.blue + ' ls-o '.cmd + 'my-project-inegi'.opt)
	.help()
	.alias('help', 'h')
	.locale('en')
	.config( SettingsFile.config )
	.wrap( yargs.customWrap )
	.argv;