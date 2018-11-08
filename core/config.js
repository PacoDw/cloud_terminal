const fs = require('fs');
const path = require('path');
const findUp = require('find-up');

/** @class This class can create a config.json file that contains all relevant configuration 
 * about the app, also can create a container folder that storing all downolads downloads.
 * This inicialize when starts the app and verify if exists the container folder and config.json,
 * if they do not exist, it creates instead. */
class SettingsFile {
    constructor(){
        this.pathConfig = findUp.sync( '.config.json' ) || ''; 
        this.config = this.pathConfig ? JSON.parse( fs.readFileSync(this.pathConfig, 'utf-8')) : {}; 
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Returns all messages to displaying in terminal */
    message(code, msn) { require('./messages')(code, this.config['path'], msn) }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Receives an object with a path to write inside the config.json file */
    writeConfig( { _path, code, message } ) {
        this.config['path'] = _path ? _path : this.config['path'];
        this.config['PDFsPath'] = _path.join(documentsPath, 'PDFs');
        fs.writeFile( this.pathConfig, JSON.stringify( this.config, 0, 4 ), 'utf-8', err => {
            if (err)   console.err('ERROR: ', err); 
            this.message(code, message);
        });
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Create the config.json and return a promise with all the settings contained in config.json.  */
    createSettingsFile(config) {
        return new Promise( (resolve, reject) => {
            let documentsPath = path.join(findUp.sync(['Documents', 'Documentos']), 'Inegi_Downloads'); 
            let defaultConfig = {
                "path": documentsPath,
                "PDFsPath" : path.join(documentsPath, 'PDFs'),
                "bucket" : "",
                "wrap": "84"
            };                
            config ? {} : config = defaultConfig, this.config = defaultConfig;
            fs.writeFile( path.join(process.cwd(), '.config.json'), JSON.stringify( config, 0, 4 ), 'utf-8', err => {
                if( err ) reject(err);
    
                config['pathExists'] = true;
                this.message('PATH_CREATED');
                resolve(config);
            });
        })
        .then( config => {            
            if( !findUp.sync(config['path']) )
            {
                this.config = config;
                this.message('FOLDER_NOT_EXISTS');
                fs.mkdir( this.config['path'], err => {
                    if( err ) reject(err);
                    fs.mkdir( this.config['PDFsPath'], error => {
                        if( error ) console.log('error: ', error);     
                    });
                    this.message('FOLDER_CREATED');
                    return Promise.resolve(config);            
                }); 
            }
            else
            {
                this.message('FOLDER_SAME_PATH_EXIST');
                return Promise.resolve(config);            
            }
        });
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Creates the container folder by default in Documents if it doesn't exists.  */
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
                fs.mkdir( this.config['PDFsPath'], error => {
                    if( error ) console.log('Error: ', error);     
                });
                this.message('FOLDER_CREATED');
                    return resolve(true);
            }); 
        });
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Change the current path with the parameter new_path and determine if the container folder exists to create it */
    newPath(new_path) {
        if(new_path.startsWith('.' || '..'))
        {
            if (new_path.endsWith('/' || '\\' || '//'))
                new_path = path.join(__dirname, new_path.substring(0, new_path.length-1));
            else
                new_path = path.join(__dirname, new_path);
        }

        if ( fs.existsSync( new_path ) )
        {
            new_path = path.join( new_path, 'Inegi_Downloads' );
            
            if ( fs.existsSync( new_path ) )
            {
                if( new_path === this.config['path']) 
                    this.message('PATH_ALREADY_USE');
                else
                    this.writeConfig( { path : new_path, code : 'EXIST_FOLDER' } );                    
            }
            else
                fs.mkdir( new_path, err => {
                    if (err) console.log('ERROR: ', err);
                    fs.mkdir( this.config['PDFsPath'], error => {
                        if( error ) console.log('Error: ', error);     
                    });
                    this.message('FOLDER_NOT_EXISTS');

                    this.writeConfig( { path : new_path, code : 'FOLDER_CREATED' } ); 
                });
        }
        else
        {
            this.message('NO_EXIST_PATH_PARAMETER'); 
            console.log(new_path); 
        }
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Initializes in the yargs middleware to check if the config.js file and the container folder exist, 
     * if they do not exist, it creates them instead. */
    checkConfig(yargs) {
        Object.assign(yargs, { settings : this } );

        if (!fs.existsSync( this.pathConfig ) ) 
        {
            this.message('PATH_NOT_EXISTS');
            return this.createSettingsFile()
                        .then( config => {
                            yargs.config( config );
                            return yargs;
                        })
        }
        else if( !findUp.sync(this.config['path']) )
        {
            this.message('FOLDER_NOT_EXISTS');
            return this.createFolderContainer().then( _ => yargs );
        }
        return Promise.resolve( yargs );
    }

    // --------------------------------------------------------------------------------------------------------------------------
    /** @method Change the current path with the parameter new_path and determine if the container folder exists to create it */
    newWrap(newWrap) {
        if ( newWrap != '' )
        {
            this.config['wrap'] = newWrap; 
                fs.writeFile(this.pathConfig, JSON.stringify( this.config, 0, 4 ), 'utf-8', err => {
                    if (err){
                        this.message('TRY_AGAIN');
                        process.exit(1);
                    }
                    this.message('CONFIG_SAVED');
                }); 
        }
    } 
}

module.exports = new SettingsFile();