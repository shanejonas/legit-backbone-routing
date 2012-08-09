var fs = require('fs');
var sys = require('sys');
var express = require('express');

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/../www'));
  app.use(app.router);
});

window = document = navigator = null;

app.get('*', function(req, res, next){

  var requirejs = require('../tools/r');

  requirejs.config({
    nodeRequuire: require,
    appDir: "../www",
    baseUrl: __dirname + "/../www/js/lib",
    paths: {
      app: "../app"
    }
  });
  var jsdom = require('jsdom');

  var markup = fs.readFileSync(__dirname + '/../www/public/index.html');

  if(!window){
    document = jsdom.jsdom(markup);
    window = document.createWindow();
    navigator = window.navigator;
    window.location.path = req.url;
  }

  requirejs(['app/main'], function(main){
    var server_url = req.url.substr(1);
    var matched = Backbone.history.loadUrl(server_url);
    if (matched) {
      var html = document.innerHTML
      res.end(html);
    } else {
      next()
    };
  })
});

app.listen(3000);
