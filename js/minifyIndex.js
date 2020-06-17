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
    var dir = './homepage/js';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var newContents = [];
    var len = data.length;
    var i = 7,
        prev = 0,
        minified_counter = 0;

    //what this loop does is that it will find all the code between
    //<script></script> tags minify it push it into the array newContents
    while (i < len) {
        if (data.substring(i - 7, i) === '<script') {
            var endingTag = i;
            while (data[endingTag] != '>') {
                endingTag++;
            }
            //newContents.push(data.substring(prev, endingTag + 1));
            var startOfScript = endingTag;
            while (true) {
                if (data.substring(startOfScript + 1, startOfScript + 10) === '</script>') {
                    break;
                }
                startOfScript++;
            }
            //console.log(endingTag + " " + startOfScript);
            var str = data.substring(endingTag + 1, startOfScript + 1);
            //console.log('Found');
            //console.log(str);
            var result = Terser.minify(str);
            if (result.code) {
                minified_counter++;
                newContents.push(data.substring(prev, i - 7));
                var pathToMinifiedFile = "js/minfied_js_" + minified_counter + ".js";
                fs.writeFileSync("./homepage/" + pathToMinifiedFile,
                    result.code);

                var newScriptTag = `<script type="text/javascript" src="${pathToMinifiedFile}" ></script>`;
                newContents.push(newScriptTag);
                prev = startOfScript + 10;
                i = prev;
                //console.log('EEEEEEE');
            } else {
                newContents.push(data.substring(prev, startOfScript + 10));
                prev = startOfScript + 10;
                i = prev;
            }

            // var newScriptTag = `<script type="text/javascript" src="${pathToMinifiedFile}" ></script>`;
            // newContents.push(newScriptTag);
            // prev = startOfScript + 10;
            // i = prev;
            // }

            // prev = startOfScript + 10;
            // i = prev;

            // newContents.push(result.code);
            // prev = startOfScript + 1;
            // i = prev;
        } else {
            i++;
        }
    }
    newContents.push(data.substring(prev, i));
    //Pushing the contents in the array into the modifed file
    for (let xx = 0; xx < newContents.length; xx++) {
        fs.appendFileSync("./homepage/newIndex.html", newContents[xx], 'utf-8');
    }
    fs.unlinkSync("./homepage/index.html");
    fs.renameSync("./homepage/newIndex.html", "./homepage/index.html");


}

module.exports = {
    minifyIndex
};