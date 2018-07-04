var os = require('os');
var prettyBytes = require('pretty-bytes');

dataObj={
	"cpus":os.cpus()
};



module.exports = {
	"data":dataObj
}