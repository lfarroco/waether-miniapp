module.exports = function (grunt) {

    grunt.initConfig({

        concat: {
            options: {
                separator: '\r\n;',
            },
            dist: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'src/core.js',
                    'src/*.js'],
                dest: 'app.min.js',
            },
        },

        watch: {
            files: ['src/*.js'],
            tasks: ['concat']
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);

};