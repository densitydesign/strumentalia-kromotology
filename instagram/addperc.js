/**
 * Created by davide on 11/02/16.
 */
    var fs = require("fs");
var json2csv = require('json2csv');


var cols = [
    "Red",
    "Gray/Black",
    "Brown",
    "White",
    "Purple/Violet/Magenta",
    "Yellow",
    "Green",
    "Blue",
    "Cyan",
    "Pink",
    "Orange"
    ];

var tocheck = "clustlabel";

var obj = JSON.parse(fs.readFileSync("test2.json", 'utf8'));



obj.forEach(function(e,j){

    for (var c in cols) {
        e[cols[c]] = 0;
    }

    for(var k in e) {
        if (k.substring(0, tocheck.length) === tocheck) {
            console.log(k)
            var num = k.slice(-1);
            console.log(num);
            var val = e[k]
            console.log(val);
            e[val] += e["clustperc_"+num]
        }
    }
})


json2csv({data: obj, fields: [
    'id',
    'lat',
    'lon',
    'nil',
    'link',
    "Red",
    "Gray/Black",
    "Brown",
    "White",
    "Purple/Violet/Magenta",
    "Yellow",
    "Green",
    "Blue",
    "Cyan",
    "Pink",
    "Orange"
]}, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile('test.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
});


