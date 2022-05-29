const express     = require('express');
const app         = express();
const ejs         = require('ejs');
const path        = require('path');
const bodyParser  = require('body-parser');
const dotenv      = require('dotenv')
const fileUpload  = require('express-fileupload');
const config      = require('./config/facebook'); 
const puppeteer   = require('puppeteer');

dotenv.config();
global.express     = express;
global.path        = path;
global.config      = config;


const OPEND_BROWSER = eval(process.env.OPEND_BROWSER);

(async () => {
    const browser = await puppeteer.launch({headless: OPEND_BROWSER, defaultViewport: null,  args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
    });

    global.page = await browser.newPage();
    // await page.setRequestInterception(true);
    await page.setCookie(...config.COOKIE_FACEBOOK)
    await page.goto(process.env.URL_FACEBOOK)
    await page.screenshot({
        path: 'facebook.png'
    })
    await browser.close()

    // page.on('request', async (request) => {
    //     if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
    //         request.abort();
    //     } else {
    //         request.continue();
    //     }
    // });


})();

app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(fileUpload({
	createParentPath: true
}));

  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/', express.static(__dirname + '/public/'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);
// app.use(flash());

// include router
const web = require('./routes/web');
app.use((req, res, next) => {
    return next();
});

app.use('/', web);
app.get('*', function(req, res){
    return res.render('404');
});

app.listen(app.get('port'), () => {
    console.log(`http:localhost: Server running on port`, app.get('port'));
});
