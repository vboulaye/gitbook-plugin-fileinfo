# Access package.json information in Gitbook

From https://github.com/abhishekdev/gitbook-plugin-packageinfo

Access project file info as a gitbook plugin filter. This is helpful when you need to refer to information in package.json (like name, version etc.) in the project's documentation maintained as a Gitbook.

Use it for your book, by adding to your book.json:

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
