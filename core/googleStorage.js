const Storage = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: 'google_cloud_storage.json'
});

module.exports = storage;