const fif = require('./index');

module.exports = {
    command: 'val <word> [resultsName]',
    describe: 'Validate PDF file to get results',
    builder: yargs => yargs
		.positional('word', {})
		.positional('resultsName', {})
        .example('ct val word resultsName'),
    handler: ( yargs ) => {
        fif.findInFiles({
            word : yargs.word, 
            dir : yargs.path, 
            resultsName : yargs.resultsName || 'RESULTS'
        });
    }
}