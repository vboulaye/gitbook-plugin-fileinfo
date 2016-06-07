# Gitbook package info plugin

Access the project's package.json info as a gitbook plugin filter

## Usage

`{{ "labelString:" : npmPackage('package.key') }}`

## Example

```
{{ "Package Name: " | npmPackage() }} => Package Name: gitbook-plugin-packageinfo

{{ "Package Version: " | npmPackage("version") }} => Package Version: 0.1.0

{{ "Package Repository type: " | npmPackage("repository.type") }} => Package Repository type: git

{{ "Package Repository Keys: " | npmPackage("repository") }} => Package Repository Keys: type, url

{{ "Package keywords: " | npmPackage("keywords") }} => Package keywords: gitbook, npm, package, version, packageversion, gitbook-plugin
```
