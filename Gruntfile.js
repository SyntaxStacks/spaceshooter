var fs = require('fs');
var async = require('async');
var _ = require('lodash');

module.exports = function (grunt) {

  grunt.initConfig({

  });

  grunt.registerTask('assets', 'Configure Asset Files', function () {
    var fileList = {};
    var done = this.async();

    function parseDir (dir, callback) {
      fs.readdir(dir, function (err, files) {
        if (err) {
          callback(err);
        }
        var pattern = /\w+(?=\/$)/;
        var assetKey = dir.match(pattern)[0];
        var assets = {};
        assets[assetKey] = {};

        _(files).forEach (function (file) {
          file = file.split('.');
          var fileName = file[0];
          var fileType = file[1];
          var fileListHasKey = _.has(assets[assetKey], fileName);

          if (fileListHasKey) {
            assets[assetKey][file[0]].push(file[1]);
            return;
          }

          assets[assetKey][file[0]] = [file[1]];
        });

        callback(null, assets);
      });
    }

    var opts = ['./assets/snd/', './assets/img/'];

    async.map(opts, parseDir, function(err, results) {
      _.map(results, function (asset) {
        var key = Object.keys(asset)[0];
        fileList[key] = asset[key];
      });

      fs.writeFile('./assets/assets.js', JSON.stringify(fileList), function (err) {
        if (err) throw err;
        console.log(fileList);
        done();
      });
    });

  });

};
