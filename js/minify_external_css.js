const fs = require('fs');
const path = require('path');
const cleanCss = require('clean-css');
const {
    minifyInternal
} = require('./minifyInternalCss.js');

function minifyCss() {
    minifyInternal();
    if (fs.existsSync('./homepage/css')) {
        var options = {
            level: 1
        }
        const folder = './homepage/css';
        var fileList = fs.readdirSync(folder);
        for (let j = 0; j < fileList.length; j++) {
            var actualPath = path.join(process.cwd(), 'homepage', 'css', fileList[j]);
            var oldName = fileList[j];
            var data = fs.readFileSync(actualPath, "utf-8");
            var output = new cleanCss(options).minify(data);
            //console.log(output.styles);
            //console.log(output.stats.efficiency);
            fs.writeFileSync(actualPath, output.styles);

        }
    }
}

module.exports = {
    minifyCss
};