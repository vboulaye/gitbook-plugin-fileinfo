var xml = require("xml2js");
var fs = require("fs");

var CONTENTS = {};

function getFileInfoValue(keyName, gitbook) {

    var namespace = CONTENTS;
    var searchNames;
    var err;

    if (keyName && typeof keyName === 'string') {
        searchNames = keyName.split('.');

        for (var i = 0; i < searchNames.length; ++i) {
            if (namespace[searchNames[i]]) {
                namespace = namespace[searchNames[i]];
            } else {
                err = 'Key "' + searchNames[i] + '" not found in "';
                searchNames.splice(i, searchNames.length - (i - 1));
                err += (searchNames.length ? searchNames.join('.') : 'package') + '""';
                gitbook.log.error(err);
                gitbook.log.error("available contents at this level: " + JSON.stringify(namespace));
                throw new Error(err);
            }
        }
    }

    return namespace;
}

// from https://github.com/Leonidas-from-XIV/node-xml2js/pull/241
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
                CONTENTS[fileDef.name] = fileContents;
            });
            //
            //
            this.config.values.fileinfo = CONTENTS;
            //this.config.options.fileinfo = CONTENTS;
            //
            // gitbook.log.debug('config ' + JSON.stringify( this.config));

        }
    },

    filters: {
        fileInfo: function (label, key) {
            var value = getFileInfoValue(key || 'name', this) || '__no_package_name__';

            switch (typeof value) {
                case 'object':
                    // serialize objects to string
                    if (Array.isArray(value)) {
                        // If Array: get array values as CSV
                        value = value.join(', ');
                    } else {
                        // If Object: get Object keys as CSV
                        value = Object.keys(value).join(', ');
                    }
                    break;
                default:
                // do nothing
            }

            return label + value;
        }
    }
};
