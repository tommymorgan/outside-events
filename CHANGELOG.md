# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2019-01-07
### Changed
- The main script in package.json now points to the built package.
- Bundle is now packaged as a UMD module.
- Split webpack config into development and production configs, with the development config serving as the base for production.
- Added a `build:dev` npm script to package without minifying.

## [1.0.0] - 2019-01-06
### Added
- Initial release
