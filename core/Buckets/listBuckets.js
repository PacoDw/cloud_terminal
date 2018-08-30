const storage = require('../googleStorage');

module.exports = {

//quitar el parametro innecesario
    command: 'listBuckets [parameter]',
    aliases: ['lsb', 'listB'],
    describe: 'List all Buckets',
    builder: yargs => yargs.default('parameter'),
    handler: argv => {

        storage
        .getBuckets()
        .then(results => {
          const buckets = results[0];
      
          console.log('Buckets:');
          buckets.forEach(bucket => {
            console.log(bucket.name);
          });
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }
}