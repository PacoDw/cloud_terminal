module.exports = {
    command: 'localFolder',
    aliases: ['lf'],
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
          })
        .example('node myStorage -s your_new_path'),
    handler: ( { yargs }  ) => {
        yargs.then( y => {
            if ( y.argv['s'] )
                y.settings.newPath( y.argv['s'] );
            else
                console.log(`\nYour local folder is now in: ${y.argv['path']}`);
        })
        .catch( err => console.log(err) ); 
    }
}