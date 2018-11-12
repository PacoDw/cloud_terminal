require('./themeColors');

module.exports = ( code = '',  path, message = '' )  => {
    let messages = {   
        PATH_CREATED : `Success: your path has been created in: ${path}`,
        PATH_NOT_EXISTS : '\nYour path is not exits, take us a moment to create it...',
        PATH_ALREADY_USE : `\nThis path is now in use: ${path}`,
        FOLDER_NOT_EXISTS : "\nYou don't have any container folder, we will create one...\n",
        FOLDER_CREATED : `Success: The folder has been created in: ${path}`,
        FOLDER_SAME_PATH_EXIST : '\nYou already have a container folder in the same path...',
        EXIST_FOLDER : `\nYou already have a container folder here! \nIt just has changed the path, it's now: ${path}`,
        NO_EXIST_PATH_PARAMETER : `\nThe path is not exists:`,
        TRY_AGAIN : '\nSorry, Try again please...',
        CONFIG_SAVED : 'Done! You new config has been saved.',
    }
    console.log(`${messages[code]} ${message}`);
}