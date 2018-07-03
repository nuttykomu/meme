# メ² (Meme Maker)

> Server built with Node.js and Hapi.js.

## Prerequisites

Make sure that you have ImageMagick installed on your system and that `magick` is added to your `$PATH` environment variable. If you provision the server using the `docker` script in the root directory of this repository, this step will be automatically be taken care of.

## Build

``` bash
# install dependencies
npm install

# start the server
npm start
```

## Test

``` bash
# test the /generate endpoint
npm test
```