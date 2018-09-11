const storage = require('../googleStorage');
const path = require('path');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'downloadObj <Filename> [Bucket]',
    aliases: ['down-o'],
    describe: 'Download an object from a bucket',
    builder: yargs => yargs.default('Bucket', 'my-project-inegi'),
    handler: argv => {

        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: path.join( argv.path, `/${argv.Filename}` ),
          };
          
        storage
            .bucket(argv.Bucket)
            .file(argv.Filename)
            .download(options)
            .then( _ => {
                console.log(
                    `\nYour file ${argv.Filename} from ${argv.Bucket} has been downloaded in ${argv.path}.`
                );
            })
            .catch(err => console.error('ERROR:',err) );
    }
}