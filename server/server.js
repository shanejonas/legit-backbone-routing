var fs = require('fs');
var sys = require('sys');
var express = require('express');
var markup = fs.readFileSync(__dirname + '/../www/public/index.html');
var jsdom = require('jsdom');
var requirejs = require('../tools/r');

requirejs.config({
  nodeRequire: require,
  appDir: "../www",
  baseUrl: __dirname + "/../www/js/lib",
  paths: {
    app: "../app"
  }
});

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/../www'));
  app.use(app.router);
});

document = jsdom.jsdom(markup);
window = document.createWindow();
navigator = window.navigator;

app.get('*', function(req, res, next){
  console.log('requesting:' + req.url);
  window.location.path = req.url;

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
