#!/usr/bin/env node
const yargs = require('yargs');
const SettingsFile = require('./core/SettingsFile');
const cmd = require('./commands');
const inn =require('./core/config/interfaceMessages')
require('./core/config/themeColors');

let checkConfig =  _ => {
	return { yargs :  SettingsFile.checkConfig(yargs) }
}

/* All commands */
yargs
	.middleware( [checkConfig] )
	.scriptName("ct".blue)
	.usage('\nWelcome Google Storage.\n\nUsage: $0 '+ inn({cmd: 'command', req: '<required>', opt: '[optional]'}))
	.command( cmd.localFolder )
	.command( cmd.listBuckets )
	.command( cmd.uploadObject )
	.command( cmd.createBucket )
	.command( cmd.listObject )
	.command( cmd.deleteObject )
	.command( cmd.downloadObject )
	.command( cmd.renameObject )
	.command( cmd.validateFile )
	.demandCommand()
	.example(inn({ct: 'ct', cmd: 'ls-o', opt: 'my-project-inegi',}))
	.help()
	.alias('help', 'h')
	.locale('en')
	.config( SettingsFile.config )
	.wrap( yargs.customWrap )
	yargs
	.argv;