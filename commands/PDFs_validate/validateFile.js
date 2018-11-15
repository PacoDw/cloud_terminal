const fif = require('../../core/PDFsValidate');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
    command: 'val' + ' <word>' + ' [resultsFileName]',
    describe: 'Validate PDF file to get results',
    builder: yargs => yargs
		.positional('word', {})
		.positional('resultsFileName', {})
        .example( inn({cmd:'val',req:'<word>',opt:'[resultsFileName]'})),
    handler: ( yargs ) => {
        fif.findInFiles({
            word : yargs.word, 
            dir : yargs.path, 
            resultsName : yargs.resultsFileName || 'RESULTS'
        });
    }
}