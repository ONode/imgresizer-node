# imgresizer-node
resize images on the server size
==================

A node library to resize images using ImageMagick

you need [ImageMagick](http://www.imagemagick.org/) on your system

## install

You need imagemagick on your machine.

For Windows - download the [ImageMaigck Installer](http://www.imagemagick.org/script/binary-releases.php#windows)

For Linux:

```
$ sudo apt-get install imagemagick
```

## usage

Resize a folder of images and write to a new folder.

Each image is resized multiple times.

```js
var resize = require('imgresizer-node')()

resize.folder('./imgs', './output', [{
  width:1024,
  height:768
},{
  width:102,
  height:77,
  name:'thumb'
}], function(){
	console.log('images resized!');
})
```

Resize a single image and control what size the output is written at:

### The basic control format for the single image resize




```js

const config_basic = {

    size: {
        width: 400,

        //proportional based on height in px
        height: 600
    },

    // jpg format or png format
    format: "jpg",

    //the quality from 0.0 to 1.0
    quality: 1.0
};


/**
 * process single image
 * @param inpath path for input
 * @param outpath path for output
 * @param options the process configurations
 * @param done the callback
 */

resize.image('./imgs/balloon.jpg', './output/balloon.jpg', config_basic, function(err){
	console.log('image is resized')
})

```

If ./imgs was a folder with:

 * image1.png (2048 x 1536)
 * image2.png (2048 x 1536)

Then ./output would contain:

 * image1.png (1024 x 768)
 * image1.thumb.png (102 x 77)
 * image2.png (1024 x 768)
 * image2.thumb.png (102 x 77)

## installation

```
$ npm install imgresizer-node
```