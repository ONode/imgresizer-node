const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const util = require('util');
const async = require('async');
const im = require('imagemagick');

function ImageProcessor() {
    EventEmitter.call(this);
}

util.inherits(ImageProcessor, EventEmitter);
const config_basic = {
    size: {
        width: 400,
        //proportional based on height
        height: 600
    },
    format: "jpg",
    quality: 1.0
};
/**
 * process single image
 * @param inpath path for input
 * @param outpath path for output
 * @param options the process configurations
 * @param done the callback
 */
ImageProcessor.prototype.image = function (inpath, outpath, options, done) {
    async.series([
        function (nextstep) {
            im.resize({
                srcPath: inpath,
                dstPath: outpath,
                quality: options.quality || 0.8,
                format: options.format || 'png',
                height: options.size.height
            }, nextstep)
        },

        function (nextstep) {
            im.crop({
                srcPath: outpath,
                dstPath: outpath,
                quality: options.quality || 0.8,
                format: options.format || 'png',
                width: options.size.width,
                height: options.size.height
            }, nextstep)
        }
    ], done)
}
;
ImageProcessor.prototype.folder = function (inputfolder, outputfolder, sizes, done) {
    var self = this;

    if (!fs.existsSync(inputfolder)) {
        throw new Error(inputfolder + ' does not exist');
    }

    var files = fs.readdirSync(inputfolder);

    async.forEach(files, function (file, nextfile) {

        if (!file.match(/\.(png|jpg)$/i)) {
            nextfile();
            return;
        }

        var inpath = inputfolder + '/' + file;

        async.forEach(sizes, function (size, nextsize) {
            var outpath = outputfolder + '/' + file;

            if (size.name) {
                outpath = outpath.replace(/\.(\w+)$/, function (match, ext) {
                    return '.' + size.name + '.' + ext;
                })
            }

            self.image(inpath, outpath, size, nextsize);

        }, nextfile);

    }, done);
}
;
module.exports = function () {
    return new ImageProcessor()
};