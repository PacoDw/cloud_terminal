const config =  require('./config');
const storage = require('./googleStorage');

module.exports = {

    command: 'myFolder',
    aliases: ['mf'],
    describe: 'Setting a local folder',
    builder: yargs => yargs
        .option('set', {
            desc: 'Set a new local folder',
            alias: 's',
            type: 'string',
            group: 'Local folder Options',
            nargs : 1,
        })
        .option('get', {
            desc: 'Get default local folder',
            alias: 'g',
            type: 'string',
            group: 'Local folder Options',
            nargs : 0,
        })
        .check( argv => {
            if( !argv.set && argv.get == null )
                throw 'Required at least a one options';
            return argv;
          }),
    handler: argv => {
        if( argv.set )
            config.newPath( argv, ( res, currentPath ) => {
                argv.path = currentPath;
                switch (res['code']) {
                    case 'EEXIST':
                        console.log(`\nYou already have a path here!`)            
                        console.log(`\nIt has changed, now it's: ${argv.path}`)            
                        break;
                    case 'SAME':
                        console.log(`\nThis path is already in use: ${argv.path}`);
                        break;
                    case 'SAVED':
                        console.log(`\nYou don't have any path here!`)            
                        console.log(`\nCreating path, now your path is: ${argv.path}`)            
                        break;
                    case 'NOEEXIST':
                        console.error(`\nParameter: "${argv.set}" is not a path.`);
                        console.error('\nIf you want to change the path, you should input a real path.');
                        break;
                    case 'ERR':
                        console.error(`ERROR: ${res['err']}`);
                        break;
                }
            });
        else
            console.log(`\nYour default path is: ${argv.path}`)            
    }
}