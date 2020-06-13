//Basic File to create a server , 
//accept an URL, 
//check whether it is a valid url or not
//and pass on that URL to download a pages


//Function to check whether a URL is written correctly or not.
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


const express = require('express');
const fs = require('fs');
const {
    downloadPage,
} = require('./js/extract_source_code.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));

//Route Handlers

app.get('/', (req, res) => {
    res.render('index', {
        checkURL: ''
    });
});
app.post('/render', (req, res) => {
    url = req.body.url;
    url.trim();
    if (validURL(url)) {
        downloadPage(url); // Function to download the source code of a page


    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});