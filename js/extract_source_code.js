//Here we use website-scraper to extract source code of a website
//It segregates the CSS,JS,images,fonts and html file in a separate directory



const scrape = require('website-scraper');
const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const {
    beginMinification
} = require('./minify_external_files.js');

//We have to provide the url and a folder where the 
//source code will be downloaded.

function downloadPage(url) {
    let options = {
        urls: [url],
        directory: './homepage'
    };

    try {
        //Checking whether the folder already exists
        //Otherwise scrape the page
        if (!fs.existsSync("./homepage")) {
            scrape(options, (err, res) => {
                if (err) {
                    return console.log('Error occured');
                }
                console.log('Successfully Scraped');
                beginMinification();

            });
        } else {
            //beginMinification();
            //console.log('Website already Scraped');
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    downloadPage
};