var xml = require("xml2js");
var fs = require("fs");

// from https://github.com/Leonidas-from-XIV/node-xml2js/pull/241
// not sure how this works
function parseXmlStringSync(str) {
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
            if (!pluginConfig || !pluginConfig.files) {
                throw new Error('this plugin needs to be configured in a pluginsConfig.fileinfo section.')
            }
            pluginConfig.files.forEach(function (fileDef) {
                var fileContents;
                try {
                    if (fileDef.path.endsWith(".xml")) {
                        // not sure if this is really part of the public api
                        var resolved = gitbook.resolve(fileDef.path);
                        var fileRawContents = fs.readFileSync(resolved);
                        fileContents = parseXmlStringSync(fileRawContents);
                    }
                    else {
                        // not sure if this is really part of the public api
                        var resolved = gitbook.resolve(fileDef.path);
                        fileContents = JSON.parse(fs.readFileSync(resolved));
                    }
                } catch (e) {
                    gitbook.log.error('plugin fileinfo: Could not read '+fileDef.path+', its contents will not be available');
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
