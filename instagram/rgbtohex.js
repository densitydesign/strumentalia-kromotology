var fs = require("fs");
var d3 = require("d3");
var turf = require("turf");
var json2csv = require('json2csv');

var obj = JSON.parse(fs.readFileSync("test.json", 'utf8'));
var nils = JSON.parse(fs.readFileSync("nils.json", 'utf8'));

var tocheck = "clustrgb";

obj.forEach(function(a,i){

    for(var k in a) {

        if (k.substring(0, tocheck.length) === tocheck) {
            a[k] = d3.rgb(a[k][0],a[k][1],a[k][2]).toString()
        }
    }

    var p = turf.point([a.lat,a.lon])
    var found = false;

    nils.features.forEach(function(nil,l){

        if(turf.inside(p,nil)){
            found = true;
            a.nil = nil.properties.ID_NIL
        }
    })
    if(!found) a.nil=null;
})

json2csv({data: obj, fields: ['id', 'lat', 'lon','nil', 'link','clustlabel_0','clustlabel_1','clustlabel_2','clustlabel_3','clustlabel_4','clustperc_0','clustperc_1','clustperc_2','clustperc_3','clustperc_4','clustrgb_0','clustrgb_1','clustrgb_2','clustrgb_3','clustrgb_4']}, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile('test.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
});



fs.writeFile("test2.json", JSON.stringify(obj, null, 4), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("JSON saved");
    }
});

