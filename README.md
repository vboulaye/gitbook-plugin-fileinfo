# Access package.json information in Gitbook


[![Build Status](https://travis-ci.org/vboulaye/gitbook-plugin-fileinfo-img.svg?branch=master)](https://travis-ci.org/vboulaye/gitbook-plugin-fileinfo)


From https://github.com/abhishekdev/gitbook-plugin-packageinfo

Access project file (xml or json) info into the gitbook config object.

You can use it by first adding it to your plugins:

```
{
    "plugins": ["fileinfo"]
}
```

then run `gitbook install`.

## Usage

Configure it in the pluginsConfig section by adding file location definitions where `name` is the tag used in the config to locate the file and `path` the location of the file (relative to the book contents directory):

```
    "pluginsConfig": {
        "fileinfo": {
          "files": [
            {"name":"pom", "path":"pom.xml"},
            {"name":"json", "path":"package.json"}
          ]
    },
```

The file contents are available inside the config, as `config.fileinfo.[filename].[fieldpath]`

For example `{{ config.fileinfo.pom.project.version }}` with the plugin configuration above will be replaced by the pom.xml version tag value.
