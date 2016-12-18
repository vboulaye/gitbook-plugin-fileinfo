# Access package.json information in Gitbook

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

Configure it in the pluginsConfig section:

```
    "pluginsConfig": {
        "fileinfo": {
          "files": [
            {"name":"pom", "path":"./pom.xml"},
            {"name":"json", "path":"./package.json"}
          ]
    },
```

The file contents are available inside the config, as `config.fileinfo.[filename].[fieldpath]`

For example `{{ config.fileinfo.pom.project.version }}` with the plugin configuration above will be replaced by the pom.xml version tag value.
