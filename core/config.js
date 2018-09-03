const fs = require('fs');
const path = require('path');
const os = require('os'); 
const findUp = require('find-up');


let pathConfig = findUp.sync( '.config.json' );
let config = JSON.parse( fs.readFileSync(pathConfig, 'utf-8') );

module.exports = {
    config,
    newPath : ( argv, callback ) => {
        let new_path = argv['set'];

        if ( fs.existsSync( new_path) )
        {
            let complete_path = path.join( new_path, 'Inegi_Downloads' );
            config['path'] = complete_path;

            if ( fs.existsSync( complete_path ) )
            {
                if( argv.path == complete_path )
                    return callback( { code : 'SAME' }, complete_path );
         
                fs.writeFile( pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
                    (err) ? callback( { code : 'ERR' }, { err } ) : {};    
                    return callback( { code : 'EEXIST' }, complete_path ); 
                });
            }
            else
            {
                fs.mkdir( complete_path, err => {
                    (err) ? callback( { code : 'ERR' }, { err } ) : {};    
                    
                    fs.writeFile( pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
                        (err) ? callback( { code : 'ERR' }, { err } ) : {};    
                        return callback( { code : 'SAVED' }, complete_path ); 
                    });
                });
            }
        }
        else
            return callback( { code : 'NOEEXIST' }, new_path ); 
    },
    checkPath : argv => {
        if ( argv.path == '' )
        {
            argv.path = path.join(findUp.sync(['Documents', 'Documentos']), 'Inegi_Downloads');
            config['path'] = argv.path; 
            fs.mkdirSync(argv.path);
            
            fs.writeFile(pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
                if (err) throw err;
            });
        }
        // else 
        // {
            // Determinated if a pach exists in config.json and so in real path 
            // if not exists so we should created it with de same path that is in 
            // config.json
            // if( fs.existsSync( argv.path ) )
        // }
    },
    newWrap : newWrap => {
        if ( newWrap != '' )
        {
            argv.myWrap = newWrap
            config['wrap'] = argv.myWrap; 
    
            fs.writeFile(pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
                if (err) throw err;
                console.log('Done! You new config has been saved.');
            }); 
        }
    },
};