var xml = require("xml2js");
var fs = require("fs");



// from https://github.com/Leonidas-from-XIV/node-xml2js/pull/241
// not sure how this works
function parseStringSync(str) {
    var cb, err, retval;
    retval = void 0;
    err = void 0;
    cb = function (_err, _retval) {
        retval = _retval;
        err = _err;
    };
    xml.parseString(str, cb);
    if (err) {
        throw err;
    }
    return retval;
};

module.exports = {
    // Hook process during build
    hooks: {
        // This is called before the book is generated
        'init': function () {

            var gitbook = this;
            var contents = {};

            var pluginConfig = gitbook.config.get('pluginsConfig.fileinfo', {files: []});

            gitbook.log.debug('Reading ' + JSON.stringify(pluginConfig));
            pluginConfig.files.forEach(function (fileDef) {
                var fileContents;
                try {
                    if (fileDef.path.endsWith(".xml")) {
                        var fileRawContents = fs.readFileSync(fileDef.path);
                        fileContents = parseStringSync(fileRawContents);
                    }
                    else {
                        fileContents = JSON.parse(fs.readFileSync(fileDef.path));
                    }
                } catch (e) {
                    gitbook.log.error('Error reading package.json');
                    throw new Error(e);
                }
                contents[fileDef.name] = fileContents;
            });

            // make the contents available in the config (a bit hacky)
            this.config.values.fileinfo = contents;
            //this.config.options.fileinfo = contents;
            //
            // gitbook.log.debug('config ' + JSON.stringify( this.config));

        }
    }
};
