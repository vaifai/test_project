const fs = require('fs');
const path = require('path');
const cleanCss = require('clean-css');

function minifyInternal() {
    const data = fs.readFileSync('./homepage/index.html', {
        encoding: 'utf-8',
        flag: 'r'
    });
    var options = {
        level: 1
    }
    //console.log(data);
    var newContents = [];
    var len = data.length;
    var i = 6,
        prev = 0;
    while (i < len) {
        if (data.substring(i - 6, i) === '<style') {
            var endingTag = i;
            while (data[endingTag] != '>') {
                endingTag++;
            }
            //console.log(endingTag);
            var startOfScript = endingTag;
            while (true) {
                if (data.substring(startOfScript + 1, startOfScript + 9) === '</style>') {
                    break;
                }
                startOfScript++;
            }
            var str = data.substring(endingTag + 1, startOfScript + 1);
            var output = new cleanCss(options).minify(str);
            if (output.styles) {
                newContents.push(data.substring(prev, i - 6));
                newContents.push('<style>' + output.styles + '</style>');
                prev = startOfScript + 9;
                i = prev;
            } else {
                newContents.push(data.substring(prev, startOfScript + 9));
                prev = startOfScript + 9;
                i = prev;
            }

        } else {
            i++;
        }
    }
    newContents.push(data.substring(prev, i));
    for (let xx = 0; xx < newContents.length; xx++) {
        fs.appendFileSync("./homepage/newIndex.html", newContents[xx], 'utf-8');
    }
    fs.unlinkSync("./homepage/index.html");
    fs.renameSync("./homepage/newIndex.html", "./homepage/index.html");

}

module.exports = {
    minifyInternal
};