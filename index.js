var PROJECT = {};

function getPackageInfoValue(keyName) {

    var namespace = PROJECT;
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
                throw new Error(err);
            }
        }
    }

    return namespace;
}

module.exports = {
    // Hook process during build
    hooks: {
        // This is called before the book is generated
        'init': function() {
            console.log('Reading package.json');

            var fs = require('fs');

            try {
                PROJECT = JSON.parse(fs.readFileSync('./package.json'));
            } catch (e) {
                console.log('Error reading package.json');
                throw new Error(e);
            }
        }
    },

    filters: {
        npmPackage: function(label, key) {
            var value = getPackageInfoValue(key || 'name') || '__no_package_name__';

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
