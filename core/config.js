const fs = require('fs');
const path = require('path');
const os = require('os'); 
const findUp = require('find-up');


let pathConfig = findUp.sync( '.config.json' );
let config = JSON.parse( fs.readFileSync(pathConfig, 'utf-8') );

let writeFileConfig = ( pathConfig, config, code, callback ) => {
    fs.writeFile( pathConfig, JSON.stringify( config, 0, 4 ), 'utf-8', err => {
        (err) ? callback( { code : 'ERR' }, { err } ) : {};   
        
        if( callback ) return callback( code, config['path'] ); 
    });
}

module.exports = {
    config,
    newPath : ( argv, callback ) => {
        let new_path = argv['set'];

        if ( fs.existsSync( new_path) )
        {
            config['path'] = path.join( new_path, 'Inegi_Downloads' );

            if ( fs.existsSync( config['path'] ) )
            {
                if( argv.path == config['path'] ) 
                    return callback( { code : 'SAME' }, config['path'] );

                writeFileConfig( pathConfig, config, { code : 'EEXIST' }, callback );
            }
            else
            {
                fs.mkdir( config['path'], err => {
                    (err) ? callback( { code : 'ERR' }, { err } ) : {};    
                    writeFileConfig( pathConfig, config, { code : 'SAVED' }, callback );
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
            writeFileConfig( pathConfig, config, { code : 'SAVED' }, undefined );
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