findInFiles = require('./index').find;

ObjectTwo = {
    'term': "duplicate",
    'flags': "gm"
}


findInFiles('duplicate', './test', 'txt$')
    .then( results => {
        // for (let result in results) {
        //     let res = results[result];
        //     console.log(`found "${res.matches[0]}" ${res.count} times"${result}"`)
        // }
    console.log(results);
    // for (var result in results) {
    //     var res = results[result];
    // }
})