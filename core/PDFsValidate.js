const fif = require('../core/find-in-files').find;
const fs = require('fs');
const path = require('path');
const findUp = require('find-up');

class PDFsValidate {
    constructor() {
        this.pathConfig = findUp.sync( '.config.json' ) || ''; 
        this.config = this.pathConfig ? JSON.parse( fs.readFileSync(this.pathConfig, 'utf-8')) : {}; 
        this.results = {};
    }   

    findInFiles({ word, dir, typeFile, resultsName }) {
        return fif(word, path.join(dir, 'PDFs'), typeFile || '.$')
            .then( res => {
                console.log('Finish')
                console.log('\nCreating results file... ')
                this.setResults = res;
                createRes(res, this.config['path'], resultsName);
            })
            .catch( err => console.log('Error: ',err));
    }
}

function createRes(res, dir, resultsName) {
    let fullPath = path.join(dir, `${resultsName}.json`);
    fs.writeFile(fullPath, JSON.stringify( res, 0, 4 ), 'utf-8', err => {
        if (err)   console.err('ERROR: ', err);
        console.log('Finish')
        console.log('The results file has been created at: ', fullPath);
    });
}

module.exports = new PDFsValidate();
