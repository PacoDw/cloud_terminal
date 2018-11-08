const storage = require('../googleStorage');
const path = require('path');

module.exports = {
    command: 'down-o <Filename> [Bucket]',
    describe: 'Download an object from a bucket',
    builder: yargs => yargs
        .positional('Bucket', {})
        .positional('Filename', {})
        .default('Bucket', 'my-project-inegi')
        .example('ct down-o Filename [optional bucket]'),
    handler: argv => {          
        storage
            .bucket(argv.Bucket)
            .file(argv.Filename)
            .download( { destination: path.join( argv.path, `/${argv.Filename}` ) } )
            .then( _ => {
                console.log(
                    `\nYour file ${argv.Filename} from ${argv.Bucket} has been downloaded in ${argv.path}.`
                );
            })
            .catch(err => console.error('ERROR:',err.message) );
    }
}