const fif = require('../../core/PDFsValidate');
require('../../core/config/themeColors');

module.exports = {
    command: 'val'.cmd + ' <word>'.req + ' [resultsFileName]'.opt,
    describe: 'Validate PDF file to get results',
    builder: yargs => yargs
		.positional('word', {})
		.positional('resultsFileName', {})
        .example('ct'.blue + 'val'.cmd + ' <word>'.req + ' [resultsFileName]'.opt),
    handler: ( yargs ) => {
        fif.findInFiles({
            word : yargs.word, 
            dir : yargs.path, 
            resultsName : yargs.resultsFileName || 'RESULTS'
        });
    }
}