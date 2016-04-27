var url = 'mongodb://localhost:27017/urbanscope-ig';
var fs = require("fs");
var igdata = "instagram.json";
var MongoClient = require('mongodb').MongoClient

var obj = JSON.parse(fs.readFileSync(igdata, 'utf8'));
var fin = [];
var dbo = ""


MongoClient.connect(url, function(err, db) {
    dbo = db
})

setTimeout(function(){

    var collection = dbo.collection('instagram');
// Insert some documents
    collection.find().toArray(function(err, docs) {
        var sel = docs.slice(0,12000);

        sel.forEach(function(e,j){
            console.log(j);
            var rightCoords = obj.filter(function(d){return e.id == d.id})[0]
            e.lon = rightCoords.location.coordinates[1]
        })

        fs.writeFile("test.json", JSON.stringify(sel, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved");
            }
        });



    })
},1000)


