const { src, dest } = require('gulp');
var replace = require('gulp-string-replace');

exports.default = function () {
    return src('build/index.html')
        .pipe(replace(new RegExp(/\/assets\/.*?\.png+/g), function (replacement) {
            return '.' + replacement;
        }))
        .pipe(dest('build'));
}