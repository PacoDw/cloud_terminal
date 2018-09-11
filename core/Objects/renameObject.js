const storage = require('../googleStorage')

// This is the method to get list from the Google Storage
module.exports = {
  command: 'renameObject [nameBucket] [srcFilename] [destFilename]',
  aliases: ['ren', 'rename'],
  describe: 'Rename an object of your bucket',
  builder: yargs => yargs.default('nameBucket', 'srcFilename', 'destFilename'),
  handler: argv => {

    storage
      .bucket( argv.nameBucket )
      .file( argv.srcFilename )
      .move( argv.destFilename )
      .then(() => {
        console.log(
          `gs://${argv.nameBucket}/${argv.srcFilename} renamed to gs://${argv.nameBucket}/${argv.destFilename}.`
        )
      })
      .catch(err => {
        console.error('ERROR:', err.errors[0].message)
      })
  }
}
