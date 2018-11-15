const storage = require('../../services/googleStorage');
const inn = require('../../core/config/interfaceMessages');
require('../../core/config/themeColors');

module.exports = {
	command: 'lb',
	describe: 'List all Buckets',
	handler: argv => {
		storage
			.getBuckets()
			.then(results => {
				const buckets = results[0];
				console.log('Buckets:');
				buckets.forEach( bucket => console.log(inn({s:bucket.name})) );
			})
			.catch(err => console.error(inn({err:"Error:"}), err.errors[0].message) );
	}
}