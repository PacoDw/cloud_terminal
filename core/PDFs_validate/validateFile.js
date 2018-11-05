const fif = require('./index');

module.exports = {
    command: 'validateFiles <word> [resultsName]',
    aliases: ['vfs'],
    describe: 'Validate PDF file to get results',
    builder: yargs => yargs
		.positional('word', {})
		.positional('resultsName', {})
        .example('node ct vfs word resultsName'),
    handler: ( yargs ) => {
        fif.findInFiles({
            word : yargs.word, 
            dir : yargs.path, 
            resultsName : yargs.resultsName || 'RESULTS'
        });
    }
}