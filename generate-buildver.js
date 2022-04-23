var fs = require("fs");
var buildFile = "build.version.json"
var publicFile = "./public/build.version.json"
var GitHub = "sw-GitHub.js"
var Netlify = "sw-Netlify.js"

console.log("Incrementing build number...");
var buildRevision = fs.readFileSync(buildFile)
buildRevision = JSON.parse(buildRevision).buildRevision;

var swRevision = fs.readFileSync(publicFile)
swRevision = JSON.parse(swRevision).swRevision;
swRevision = swRevision ? swRevision : 0

var metadata = { buildRevision: buildRevision, swRevision: swRevision + 1 }
fs.writeFile(publicFile, JSON.stringify(metadata), err => { if (err) throw err; })
console.log(`Current build number: ${metadata.swRevision}`);

var str = "const swRevision = " + metadata.swRevision
	+ "\nconst GHCDN = 'https://cdn.jsdelivr.net/gh/hyx3179'"
var strGitHub = str + "\nconst BACKUP = 'https://cat-zh-hyx3179.netlify.app'"
fs.writeFile(GitHub, strGitHub, err => { if (err) throw err; })
var strNetlify = str + "\nconst BACKUP = 'https://hyx3179.github.io'"
fs.writeFile(Netlify, strNetlify, err => { if (err) throw err; })