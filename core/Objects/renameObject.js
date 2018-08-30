const storage = require('../googleStorage')

// This is the method to get list from the Google Storage
module.exports = {
  command: 'renameObject [parameter] [srcFilename] [destFilename]',
  aliases: ['ren', 'rename'],
  describe: 'Rename an object of your bucket',
  builder: yargs => yargs.default('parameter', 'srcFilename', 'destFilename'),
  handler: argv => {

    storage
      .bucket(argv.parameter)
      .file(argv.srcFilename)
      .move(argv.destFilename)
      .then(() => {
        console.log(
          `gs://${argv.parameter}/${argv.srcFilename} renamed to gs://${argv.parameter}/${argv.destFilename}.`
        )
      })
      .catch(err => {
        console.error('ERROR:', err)
      })
  }
}
