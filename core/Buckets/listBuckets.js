const storage = require('../googleStorage');

module.exports = {
	command: 'lb',
	describe: 'List all Buckets',
	handler: argv => {
		storage
			.getBuckets()
			.then(results => {
				const buckets = results[0];
				console.log('Buckets:');
				buckets.forEach( bucket => console.log(bucket.name) );
			})
			.catch(err => console.error('ERROR:', err.errors[0].message) );
	}
}