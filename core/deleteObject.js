const storage = require('./googleStorage');

// This is the method to get list from the Google Storage
module.exports = {

    command: 'deleteObject [parameter] [parameter2]',
    aliases: ['del', 'delete'],
    describe: 'Delete an object of your bucket',
    builder: yargs => yargs.default('parameter', 'parameter2'),
    handler: argv => {

        storage
            .bucket(argv.parameter)
            .file(argv.parameter2)
            .delete()
            .then(() => {
                console.log(`gs://${argv.parameter}/${argv.parameter2} deleted.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}