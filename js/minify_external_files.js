const fs = require('fs');
const Terser = require('terser');
const path = require('path');
const {
    minifyIndex
} = require('./minifyIndex.js');

function beginMinification() {
    minifyIndex();
    var options = {

        // compress: {
        //     toplevel: true,
        //     sequences: false
        // },
        mangle: {
            toplevel: true
        }
        // output: {
        //     beautify: true
        // }

    };
    //If the page contains external JavaScript
    //Then we take the files one by one minify it
    //Store the minified version in a new file.
    //Delete the old file and Rename the minified file
    if (fs.existsSync('./homepage/js')) {
        const folder = './homepage/js';
        var fileList = fs.readdirSync(folder);
        for (let j = 0; j < fileList.length; j++) {
            var actualPath = path.join(process.cwd(), 'homepage', 'js', fileList[j]);
            var oldName = fileList[j];
            fs.writeFileSync("./homepage/js/minified_output.js", Terser.minify({
                "file1.js": fs.readFileSync(actualPath, "utf8")

            }, options).code, "utf8");

            fs.unlinkSync('./homepage/js/' + fileList[j]);
            fs.renameSync("./homepage/js/minified_output.js", "./homepage/js/" + oldName);

        }

    }
}




module.exports = {
    beginMinification
};