var path = require('path');
var tester = require('gitbook-tester');
var assert = require('assert');

describe('FileInfo', function() {
    it('should correctly replace xml file data in the generated book', function() {
        return tester.builder()
            .withFile('pom.xml','<project><name>projectName</name><version>v1.0</version></project>')
            .withContent('{{ config.fileinfo.pom.project.version }}')
            .withBookJson({
                plugins: ['fileinfo'],
                pluginsConfig: {
                    fileinfo: {
                        files: [
                            {name: "pom", path: "./pom.xml"}
                        ]
                    }
                }
            })
            .withLocalPlugin(path.join(__dirname, '..'))
            .create()
            .then(function(result) {
                assert.equal(result[0].content, '<p>v1.0</p>')
            });
    });
    it('should correctly replace json file data in the generated book', function() {
        return tester.builder()
            .withFile('package.json','{"name": "gitbook-plugin-fileinfo","version": "1.0.0"}')
            .withContent('{{ config.fileinfo.package.version}}')
            .withBookJson({
                plugins: ['fileinfo'],
                pluginsConfig: {
                    fileinfo: {
                        files: [
                            {name: "package", path: "package.json"}
                        ]
                    }
                }
            })
            .withLocalPlugin(path.join(__dirname, '..'))
            .create()
            .then(function(result) {
                assert.equal(result[0].content, '<p>1.0.0</p>')
            });
    });
});
