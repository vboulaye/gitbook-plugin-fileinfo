# Access package.json information in Gitbook

Access the project's package.json info as a gitbook plugin filter. This is helpful when you need to refer to information in package.json (like name, version etc.) in the project's documentation maintained as a Gitbook.

Use it for your book, by adding to your book.json:

```
{
    "plugins": ["packageinfo"]
}
```

then run `gitbook install`.

## Usage

`{{ "labelString:" : npmPackage('package.key') }}`

## Examples

```
{{ "Package Name: " | npmPackage() }} => Package Name: gitbook-plugin-packageinfo

{{ "Package Version: " | npmPackage("version") }} => Package Version: 0.1.0

{{ "Package Repository type: " | npmPackage("repository.type") }} => Package Repository type: git

{{ "Package Repository Keys: " | npmPackage("repository") }} => Package Repository Keys: type, url

{{ "Package keywords: " | npmPackage("keywords") }} => Package keywords: gitbook, npm, package, version, packageversion, gitbook-plugin
```
