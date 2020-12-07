
var { src , dest , series , parallel , watch } = require('gulp');
var clean = require('gulp-clean');

function cleanTask(){
    return src('./dist',{ allowEmpty : true})
            .pipe(clean());
}

module.exports = {
    // 开发调用的命令
    dev : series(cleanTask),
    // 生产调用的命令
    build : series(cleanTask)
};