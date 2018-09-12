const fs = require('fs');
const path = require('path');
const os = require('os'); 
const findUp = require('find-up');

module.exports = class JsonFile {
    constructor( yargs ){
        this.pathConfig = findUp.sync( '.config.json' ) || ''; 
        this.config = this.pathConfig ? JSON.parse( fs.readFileSync(this.pathConfig, 'utf-8')) : {}; 
        this.yargs = yargs;
    }


    // Satitc Method To Write Config
    static writeConfig( pathConfig, config, code, callback ) {
        fs.writeFile( pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
            (err) ? callback( err, { code : 'ERR' } ) : {};   
            
            if( callback ) return callback( err, code || 'SAVED', config['path'] ); 
        });
    }


    // Method to Create a JSON CONFIGURATION FILE FILE
    createJsonFile(config) {
        let defaultConfig = {
            "path": "/home/paco/Documents/Inegi_Downloads",
            "bucket" : "",
            "wrap": "84"
        };                
            config ? {} : config = defaultConfig, this.config = defaultConfig;

        JsonFile.writeConfig( path.join(process.cwd(), '.config.json'), config, undefined, err => {
            if( err ) console.log(`ERROR: ${err}`);
            
            if( !findUp.sync(config['path']) )
                fs.mkdir( this.config['path'], err => {
                    if( err ) console.log(`ERROR: ${err}`);
                }); 
        });
    }


    // Method that Create a Folder Container
    createFolderContainer() {
        if( !findUp.sync(this.config['path']) )
        {
            let myPath = '';

            if(this.config['path'] != '')
                myPath = this.config['path']
            else
                myPath = "/home/paco/Documents/Inegi_Downloads";
                
            fs.mkdir( myPath, err => {
                if( err ) console.log(`ERROR: ${err}`);
            }); 
        }
    }


    // METHOD TO SET A NEW PATH AND CREATE A FOLDER 
    newPath(callback) {
        let new_path = this.yargs['set'];

        if ( fs.existsSync( new_path) )
        {
            this.config['path'] = path.join( new_path, 'Inegi_Downloads' );
            if ( fs.existsSync( this.config['path'] ) )
            {
                if( this.yargs.path == this.config['path'] ) 
                    return callback( { code : 'SAME' }, this.config['path'] );

                JsonFile.writeConfig( this.pathConfig, this.config, { code : 'EEXIST' }, callback );
            }
            else
                fs.mkdir( this.config['path'], err => {
                    (err) ? callback( err, { code : 'ERR' } ) : {};    
                    JsonFile.writeConfig( this.pathConfig, this.config, { code : 'SAVED' }, callback );
                });
        }
        else
            return callback( { code : 'NOEEXIST' }, new_path ); 
    }


    // METHOD THAT CHECK THE CONFIGURATION
    checkConfig() {
        if (!fs.existsSync( this.pathConfig ) ) 
        {
            this.yargs.config( { 'pathExists' : false } );
            this.createJsonFile();
            this.createFolderContainer();
            return this.yargs.argv
        }
        else
        {
            this.yargs.config( { 'pathExists' : true } );
            this.createFolderContainer();
            return this.yargs.argv
        }
        

        // if ( this.yargs.path == '' )
        // {
        //     this.yargs.path = path.join(findUp.sync(['Documents', 'Documentos']), 'Inegi_Downloads');
        //     config['path'] = this.yargs.path; 
            
        //     fs.mkdirSync(this.yargs.path);
        //     JsonFile.writeConfig( pathConfig, config, { code : 'SAVED' }, undefined );
        // }
        // else 
        // {
            // Determinated if a pach exists in config.json and so in real path 
            // if not exists so we should created it with de same path that is in 
            // config.json
            // if( fs.existsSync( this.yargs.path ) )
        // }

    }


    newWrap(newWrap) {
        if ( newWrap != '' )
        {
            this.yargs.myWrap = newWrap
            this.config['wrap'] = this.yargs.myWrap; 
    
            fs.writeFile(this.pathConfig, JSON.stringify( this.config, 0, 4 ), 'utf-8', err => {
                if (err) throw err;
                console.log('Done! You new config has been saved.');
            }); 
        }
    }
}

