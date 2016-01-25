/**
 * Created by daniele on 18/01/16.
 */

//libraries and external files
var express = require('express');
var bodyParser = require('body-parser');
var classifier = require("./color_classifier").classifier;
var kmeans = require('node-kmeans');
var lwip = require('lwip');
var request = require('request');
var fs = require('fs');
var clustering = require('density-clustering');
var optics = new clustering.DBSCAN();

//load initial dataset of colors
classifier.getdb('dataset.js');

var maxSize=200;
//*******************************************
// function for downloading an image from url
//*******************************************
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


//*******************************************
// function to find average of averages :)
//*******************************************
function average(x) {

    // Flatten multi-dimensional array
    while (x[0] instanceof Array) {
        x = x.reduce( function(a, b) { return a.concat(b); } );
    }

    // Calculate average
    return x.reduce( function(a, b) { return a + b; } )/x.length;
}


//*************************************************
// function for clustering and color classification
//*************************************************

var processImg = function (imgurl, nclust, orig, callback) {

    var totres = [];
    var fname = imgurl.split("/").pop();
    var vectors = new Array();


    download(imgurl, fname, function(){

    //open image, sync fashion
    lwip.open(fname, function (err, image) {

        var batch = image.batch();


        if(!orig) {
            var m = Math.max(image.width(), image.height());
            if(m>maxSize) {
                var ratio = maxSize / m;
                batch.resize(image.width()*ratio, image.height()*ratio);
            }
        }

        if (err) {
            console.log(err);
            callback(null);
            return null;
        }

        //total number of pixels
        var tot = image.width() * image.height();

        //prepare vector for kmeans
        for (var i = 0; i < image.width(); i++) {
            for (var j = 0; j < image.height(); j++) {
                var px = image.getPixel(i, j);
                vectors.push([px.r, px.g, px.b]);
            }
        }

        //perform kmeans, sync fashion
        kmeans.clusterize(vectors, {k: nclust}, function (err,res) {

            if (err) {
                console.log(err);
                callback(null);
                return null;
            }

            for (i in res) {
                //classify clusters centroids
                var obj = {}
                var lbl = classifier.classify(res[i].centroid, false);

                //save centroid info
                obj.label = lbl;
                obj.perc = res[i].cluster.length / tot * 100;
                obj.rgb = res[i].centroid.map(function (x) {
                    return parseInt(x);
                });
                totres.push(obj)
            }

            //return json with info on centroids
            fs.unlink(fname);
            callback(totres);
        })
    });
    });
};

/*
var processImgOptics = function (imgurl, dense, callback) {

    var totres = [];
    var fname = imgurl.split("/").pop();
    var vectors = new Array();


    download(imgurl, fname, function(){

        //open image, sync fashion
        lwip.open(fname, function (err, image) {

            if (err) {
                console.log(err);
                callback(null);
                return null;
            }

            //total number of pixels
            var tot = image.width() * image.height();

            //prepare vector for kmeans
            for (var i = 0; i < image.width(); i++) {
                for (var j = 0; j < image.height(); j++) {
                    var px = image.getPixel(i, j);
                    vectors.push([px.r, px.g, px.b]);
                }
            }

            //perform kmeans, sync fashion
            var clusters = optics.run(vectors, dense, 2);

                for (i in clusters) {
                    console.log(clusters[i]);
                    //classify clusters centroids
                    var cent = average(clusters[i])
                    console.log(cent);

                    var obj = {}
                    var lbl = classifier.classify(cent, false);

                    //save centroid info
                    obj.label = lbl;
                    obj.perc = clusters[i].length / tot * 100;
                    obj.rgb = cent.map(function (x) {
                        return parseInt(x);
                    });
                    totres.push(obj)
                }

                //return json with info on centroids
                fs.unlink(fname);
                callback(totres);
        });
    });
};

*/

//init app
var app = express();

//decode POST body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set port
var port = 8080;
//var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// routes
var router = express.Router();

// test route (accessed at GET http://localhost:8080/api)
router.get('/single', function(req, res) {

    var img = req.param('img');
    var k = req.param('k');
    var orig = false;

    if('orig' in req.query && req.query.orig) {
        try {
            orig = parseInt(req.query.orig)
        }
        catch(err){
            console.log(err);
        }
    }


     processImg(img, k,orig,function(r){
            if(r) {
                var obj = {};
                obj.url = img;
                obj.clusters = r;
                res.json(obj);
            }
         else res.send("error!")
        });
});

/*
router.get('/optics', function(req, res) {

    var img = req.param('img');
    var k = req.param('k');

    processImgOptics(img,function(r){
        if(r) {
            var obj = {};
            obj.url = img;
            obj.clusters = r;
            res.json(obj);
        }
        else res.send("error!")
    });
});
*/
//route with list of images
router.post('/single',function(req,res){

    var img = JSON.parse(req.body.img);
    var k = JSON.parse(req.body.k);
    var orig = false;

    if('orig' in req.body && req.body.orig) {
        try {
            orig = parseInt(req.body.orig)
        }
        catch(err){
            console.log(err);
        }
    }

    processImg(img,k,orig,function(r){
        if(r) {
            var obj = {};
            obj.url = img;
            obj.clusters = r;
            res.json(obj);
        }
        else res.send("error!")
    })
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use('/', router);


// start the server
app.listen(port);
console.log("listening on localhost:"+port);

