var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var _ = require('lodash');

module.exports = function (grunt) {

    grunt.initConfig({
    });

    grunt.registerTask('assets', 'Configure Asset Files', function () {
        var fileList = {};
        var done = this.async();

        function parseDir (dir) {
            return fs.readdirAsync(dir).then(function (files) {
                var pattern = /\w+(?=\/$)/;
                var assetKey = dir.match(pattern)[0];
                var assets = {};
                assets[assetKey] = {};

                _.each(files, function (file) {
                    file = file.split('.');
                    var fileName = file[0];
                    var fileType = file[1];
                    var fileListHasKey = _.has(assets[assetKey], fileName);

                    if (fileListHasKey) {
                      assets[assetKey][fileName].push(file[1]);
                      return;
                    }

                    assets[assetKey][file[0]] = [file[1]];
                });

                return assets;
            });
        }

        var opts = ['./assets/snd/', './assets/img/'];

        promise.map(opts, parseDir).then(function(results) {
            _.map(results, function (asset) {
                var key = Object.keys(asset)[0];
                fileList[key] = asset[key];
            });

            var assetsFile = ""+
            "var assets = " + JSON.stringify(fileList) + "\n" +
            "module.exports = { snd: assets.snd, img: assets.img }";

            fs.writeFileAsync('./assets/assets.js', assetsFile)
                .then(function () {
                    console.log("success!");
                    done();
            });
        });
    });
};
