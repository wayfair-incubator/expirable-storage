# Expirable storage

[![OSS Template Version](https://img.shields.io/badge/OSS%20Template-0.3.5-7f187f.svg)](https://github.com/wayfair-incubator/oss-template/blob/main/CHANGELOG.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Build Status](https://github.com/wayfair-incubator/expirable-storage/actions/workflows/build.yml/badge.svg)](https://github.com/wayfair-incubator/expirable-storage/actions/workflows/build.yml)
[![NPM version](https://img.shields.io/npm/v/expirable-storage.svg?logo=npm)](https://npmjs.org/package/expirable-storage)
[![NPM downloads](https://img.shields.io/npm/dm/expirable-storage.svg?style=flat)](https://npmjs.org/package/expirable-storage)

## About The Project

Expirable data storage based on `localStorage` and `sessionStorage`.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Be sure you use latest stable version of `npm`:

```sh
npm install npm@latest -g
```

## Usage

```bash
npm install expirable-storage
# Or
yarn add expirable-storage
```

```js
import {
  expirableLocalStorage,
  expirableSessionStorage,
} from "expirable-storage";
const expires = 900; // 900 seconds (15 minutes)

expirableLocalStorage.setItem("key1", "value1", expires);
expirableLocalStorage.getItem("key1");

expirableSessionStorage.setItem("key2", "value2", expires);
expirableSessionStorage.getItem("key2");
```

## Roadmap

See the [open issues](https://github.com/wayfair-incubator/expirable-storage/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. For detailed contributing guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

Distributed under the `MIT` License. See [LICENSE](LICENSE) for more information.

## Contact

Valentin Podkamennyi - [@vpodk](https://twitter.com/vpodk)

Project Link: [https://github.com/wayfair-incubator/expirable-storage](https://github.com/wayfair-incubator/expirable-storage)

## Acknowledgements

This template was adapted from
[https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template).
