"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      "options": {
        "sourceMap": true,
        "presets": ["babel-preset-es2015"]
      },
      "dist": {
        "files": [{
          "expand": true,
          "cwd": "lib/",
          "src": ["**/*.es6"],
          "dest": "dist/",
          "ext": ".js"
        }, {
          "expand": true,
          "cwd": "test/lib/",
          "src": ["**/*.spec.es6"],
          "dest": "test/dist/",
          "ext": ".spec.js"
        }]
      }
    },
    "clean": [
      "dist/",
      "test/dist"
    ],
    "watch": {
      "es6": {
        "files": [
          "Gruntfile.js",
          "**/.eslintrc",
          "lib/**/*.es6",
          "test/lib/**/*.es6"
        ],
        "tasks": ["default"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");

  // Default task.
  grunt.registerTask("default", [
    "build"
  ]);

  // Common build task
  grunt.registerTask("build", [
    "clean",
    "babel"
  ]);
};
