var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.render('index');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// Test
