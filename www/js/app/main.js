define(function (require) {

  var Backbone = require('backbone');
  var $ = require('jquery');

  var Router = Backbone.Router.extend({

    initialize: function(){
      console.log('Hello world');
    },

    routes: {
      '': 'hello',
      'world': 'world',
    },

    hello: function(){
      var message = $("<a href='/world'>go to world</a>");
      message.on('click',function(e){
        e.preventDefault();
        Backbone.history.navigate('/world', true)
      });
      $('body').html(message);
    },

    world: function(){
      var message = $("<a href='/'>go to hello</a>");
      $('title').text('SUP BRO')
      message.on('click',function(e){
        e.preventDefault();
        Backbone.history.navigate('/', true)
      });
      $('body').html(message);
    }
  });

  var router = new Router;
  try {
    Backbone.history.start({pushState: true, root: '/'});
  } catch(e) {
    console.log(e)
  }
  return router;
});

