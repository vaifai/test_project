const fs = require('fs');
const Terser = require('terser');

function minifyIndex() {
    const data = fs.readFileSync('./homepage/index.html', {
        encoding: 'utf-8',
        flag: 'r'
    });
    //newcontents will hold the contents that will be included in the new
    //html file. Why this is done because to include the minified inline
    //JavaScript Code.

    var newContents = [];
    var len = data.length;
    var i = 7,
        prev = 0;

    //what this loop does is that it will find all the code between
    //<script></script> tags minify it push it into the array newContents
    while (i < len) {
        if (data.substring(i - 7, i) === '<script') {
            var endingTag = i;
            while (data[endingTag] != '>') {
                endingTag++;
            }
            newContents.push(data.substring(prev, endingTag + 1));
            var startOfScript = endingTag;
            while (true) {
                if (data.substring(startOfScript + 1, startOfScript + 10) === '</script>') {
                    break;
                }
                startOfScript++;
            }
            var str = data.substring(endingTag + 1, startOfScript + 1);

            var result = Terser.minify(str);

            newContents.push(result.code);
            prev = startOfScript + 1;
            i = prev;
        } else {
            i++;
        }
    }
    newContents.push(data.substring(prev, i));
    //Pushing the contents in the array into the modifed file
    for (let xx = 0; xx < newContents.length; xx++) {
        fs.appendFileSync("./newIndex.html", newContents[xx], 'utf-8');
    }


}

module.exports = {
    minifyIndex
};