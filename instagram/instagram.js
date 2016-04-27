/**
 * Created by davide on 09/02/16.
 */

var MongoClient = require('mongodb').MongoClient
var igfolder = "/Users/davide/Desktop/urbanscope-ig/output/";
var igdata = "igdata.json";
var classifier = require("./color_classifier").classifier;
var kmeans = require('node-kmeans');
var lwip = require('lwip');
var fs = require('fs');
var clustering = require('density-clustering');
var extend = require('util')._extend
var url = 'mongodb://localhost:27017/urbanscope-ig';

var obj = JSON.parse(fs.readFileSync(igdata, 'utf8'));
var fin = [];
var dbo = ""


classifier.getdb('colors_quant.json');

MongoClient.connect(url, function(err, db) {
    dbo = db
})


var processImg = function (index, nclust, orig, callback) {

    var totres = [];
    var vectors = new Array();
    var fname = igfolder+obj[index].id+".jpg";



    //open image, sync fashion
    lwip.open(fname, function (err, image) {

        if(err) {
            callback(null);
            return null;
        }
        var batch = image.batch();

/*
        if(!orig) {
            var m = Math.max(image.width(), image.height());
            if(m>maxSize) {
                var ratio = maxSize / m;
                batch.resize(image.width()*ratio, image.height()*ratio);
            }
        }
*/

        batch.exec(function(err, image){


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

                for (h in res) {
                    //classify clusters centroids

                    var lbl = classifier.classify(res[h].centroid, false);

                    //save centroid info
                    obj[index]["clustlabel_"+h] = lbl;
                    obj[index]["clustperc_"+h] = res[h].cluster.length / tot * 100;
                    obj[index]["clustrgb_"+h] = res[h].centroid.map(function (x) {
                        return parseInt(x);
                    });

                }
                fin.push(obj[index]);


                    insertDocuments(dbo, obj[index],function() {
                        callback(totres);

                    });
                });

               // console.log(JSON.stringify(obj[i]));

                //return json with info on centroids
                //fs.unlink(fname);

            })
        });
        // check err, use image

    //});
};



function loader (j) {
    if(j<obj.length) {
        var currid = obj[j].id;
        var collection = dbo.collection('instagram');
        console.log(j+"/"+obj.length);
        collection.findOne({"id":{$eq:currid}}, function(err, doc) {

            if(!doc) {

                processImg(j,5,false,function(){
                    j=j+1;
                    loader(j);

                })
            }
            else {
                console.log("present!");
                j=j+1;
                loader(j);
            }
        })


    }
    else{
        fs.writeFile("result.json", JSON.stringify(fin, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + "result.json");
            }
        });
    }
}


setTimeout(function() {
    loader(0);
}, 3000);


var insertDocuments = function(db, o, callback) {
    // Get the documents collection
    var collection = db.collection('instagram');
    // Insert some documents
    collection.insert(o, {forceServerObjectId:true},function(err, result) {

        callback(result);
    });
}
