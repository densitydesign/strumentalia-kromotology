var fs = require('fs');


Point = function (x, y, z, label) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.label = label;
}

Point.prototype = {
  dist: function(p) {
    var x = Math.abs(p.x - this.x);
    var y = Math.abs(p.y - this.y);
    var z = Math.abs(p.z - this.z);

    return Math.sqrt(x * x + y * y + z * z);
  }
};

function get_dataset(url, callback)
{
  var data = [];

    fs.readFile(url, 'utf8', function (err, dt) {
        if (err) throw err;
        var points = JSON.parse(dt);
        for (var i = 0; i < points.length; ++i) {
            data.push(new Point(points[i]["x"], points[i]["y"], points[i]["z"], points[i]["label"]));
        }
        callback(data);
    });

 /*
  $.getJSON(url, function (points) {
   for (var i = 0; i < points.length; ++i) {
     data.push(new Point(points[i]["x"], points[i]["y"], points[i]["z"], points[i]["label"]));
   }
   callback(data);
  });
  */
}

function rgb_from_hex(triplet) {
  triplet = triplet.replace("#", "");

  if (triplet.length == 3) // #rgb == #rrggbb
  {
    triplet = triplet[0] + triplet[0]
            + triplet[1] + triplet[1]
            + triplet[2] + triplet[2];
  }

  value = parseInt(triplet, 16);
  var b = Math.floor(value % 256);
  var g = Math.floor((value / 256) % 256);
  var r = Math.floor((value / (256 * 256)) % 256);
  return new Point(r, g, b);
}

function point_from_rgb(triplet) {

    return new Point(triplet[0], triplet[1], triplet[2]);
}

ColorClassifier = function () {
  this.data = [];
    currobj = this;
};

ColorClassifier.prototype = {



    getdb: function(url) {

    var data = [];

        fs.readFile(url, 'utf8', function (err, dt) {
            if (err) throw err;
            var points = JSON.parse(dt);
            for (var i = 0; i < points.length; ++i) {
                data.push(new Point(points[i]["x"], points[i]["y"], points[i]["z"], points[i]["label"]));
            }
            currobj.learn(data);
        })
    },

    learn: function (data) {
      this.data = data;

    },
    classify: function (triplet,isHex) {

      var point;
      if(isHex) {
            point = rgb_from_hex(triplet);
      }
        else {
          point = point_from_rgb(triplet);
      }
        var min = Infinity;
      var min_idx = -1;
      var i, dist;
      for (i = 0; i < this.data.length; ++i)
      {
        dist = point.dist(this.data[i]);
        if (dist < min)
        {
          min = dist;
          min_idx = i;
        }
      }

      this.last_result = min_idx;
      return this.data[min_idx].label;
    },
    get_closest_color_hex: function(triplet)
    {
      var p = this.data[this.last_result];
      var val = p.x * (256 * 256) + p.y * 256 + p.z;
      var str = val.toString(16);
      while (str.length < 6)
        str = "0" + str;
      return "#" + str;
    }
};

module.exports.classifier = new ColorClassifier();
module.exports.getdb = get_dataset;
