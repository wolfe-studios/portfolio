(function(){
  "use strict";

  /* globals $ */

  var Site = {
    init: function() {
      setTimeout(function(){
        $('h1').text('Hellooooo');
      }, 2000);
    }
  };

  $(function() {
    Site.init();
  });

  module.exports = Site;

})();
