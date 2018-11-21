const fif = require('../../core/PDFsValidate');
const inn = require('../../core/config/interfaceMessages');
const fs = require('fs');
require('colors');

require('../../core/config/themeColors');

module.exports = {
    command: 'val' + ' <word>' + ' [resultsFileName]',
    describe: 'Validate PDF file to get results',
    builder: yargs => yargs
		.positional('word', {})
		.positional('resultsFileName', {})
        .example( inn({cmd:'val',req:'<word>',opt:'[resultsFileName]'})),
    handler: async ( obj ) => {
        let { word, resultsFileName } = obj
        let yargs = await obj['yargs'];
        let path = yargs.settings.config['PDFsPath'];

        if (fs.readdirSync(path).length == 0)
            console.log('\nYou need to have files in: ', path.green)
        else
        {
            fif.findInFiles({
                word : word, 
                dir : path, 
                resultsName : resultsFileName || 'RESULTS'
            });
        }
    }
}