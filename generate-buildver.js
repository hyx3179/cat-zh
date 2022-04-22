var fs = require('fs');
var FILE_NAME = "build.version.json";
var GitHub = "sw-GitHub.js"
var Netlify = "sw-Netlify.js"

console.log('Incrementing build number...');
fs.readFile(FILE_NAME, function (err, content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    var str = 'const KGVision = \'' + metadata.buildRevision + '\'\nconst Subfolder = \'/cat-zh\'\nconst KSfolder = \'/scientists\'';
    fs.writeFile(GitHub, str, function (err) {
        if (err) throw err;
        console.log(`sw-GitHub.js Current build number: ${metadata.buildRevision}`);
    })
    var str = 'const KGVision = \'' + metadata.buildRevision + '\'\nconst Subfolder = \'\'\nconst KSfolder = \'\'';
    fs.writeFile(Netlify, str, function (err) {
        if (err) throw err;
        console.log(`sw-Netlify.js Current build number: ${metadata.buildRevision}`);
    })
});