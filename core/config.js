const fs = require('fs');
const path = require('path');
const os = require('os'); 
const findUp = require('find-up');

class SettingsFile {
    constructor(){
        this.pathConfig = findUp.sync( '.config.json' ) || ''; 
        this.config = this.pathConfig ? JSON.parse( fs.readFileSync(this.pathConfig, 'utf-8')) : {}; 
        this.yargs = {};
        this.variable = 'Algo';
    }


    // Method To Write Config
    static writeConfig( pathConfig, config, code, callback ) {
        fs.writeFile( pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
            (err) ? callback( err, { code : 'ERR' } ) : {};   
            
            if( callback ) return callback( err, code || 'SAVED', config['path'] ); 
        });
    }


    // Method to Create a JSON CONFIGURATION FILE FILE
    createSettingsFile(config) {
        return new Promise( (resolve, reject) => {
            let defaultConfig = {
                "path": path.join(findUp.sync(['Documents', 'Documentos']), 'Inegi_Downloads'),
                "bucket" : "",
                "wrap": "84"
            };                
                config ? {} : config = defaultConfig, this.config = defaultConfig;
    
            SettingsFile.writeConfig( path.join(process.cwd(), '.config.json'), config, undefined, err => {
                if( err ) reject(err);
    
                config['pathExists'] = true;
                console.log(`Success: your path has been created in: ${config['path']}`);

                if( !findUp.sync(config['path']) )
                {
                    console.log("\nYou don't have any container folder , we will create one...");
                    fs.mkdir( this.config['path'], err => {
                        if( err ) reject(err);
                        console.log('Success: The folder has been created in: ',this.config['path']);
                    }); 
                }
                else
                    console.log('\nYou already have a container folder in the same path...')

                resolve(config);
            });
        });
    }


    // Method that Create a container folder
    createFolderContainer() {
        return new Promise( (resolve, reject) => {
            let myPath = '';
    
            if(this.config['path'] != '')
                myPath = this.config['path']
            else
                myPath = path.join(findUp.sync(['Documents', 'Documentos']), 'Inegi_Downloads');
                
                this.config['path'] = myPath;

            fs.mkdir( myPath, err => {
                if( err ) return reject(err)
                console.log('Success: The folder has been created in: ',this.config['path']);
                    return resolve(true);
            }); 
        });
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

                SettingsFile.writeConfig( this.pathConfig, this.config, { code : 'EEXIST' }, callback );
            }
            else
                fs.mkdir( this.config['path'], err => {
                    (err) ? callback( err, { code : 'ERR' } ) : {};    
                    SettingsFile.writeConfig( this.pathConfig, this.config, { code : 'SAVED' }, callback );
                });
        }
        else
            return callback( { code : 'NOEEXIST' }, new_path ); 
    }


    // METHOD THAT CHECK THE CONFIGURATION
    checkConfig(yargs) {
        this.yargs = yargs;

        if (!fs.existsSync( this.pathConfig ) ) 
        {
            console.log('\nYour path is not exits, take us a moment to create it...');
            return this.createSettingsFile()
                        .then( config => {
                            this.yargs.config( config );
                            return { y :this.yargs };
                        })
                        .then( res => res );
        }
        else if( !findUp.sync(this.config['path']) )
        {
            console.log("\nYou don't have any container folder, we will create one...\n");
            return this.createFolderContainer().then( _ => { y :this.yargs } );
        }
        return Promise.resolve( { y :this.yargs } );
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

module.exports = new SettingsFile();