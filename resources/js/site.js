(function(){
  "use strict";

  /* globals $ */

  var Site = {
    init: function() {
      setTimeout(function(){
        $('h1').text('yah');
      }, 2000);
    }
  };

  $(function() {
    Site.init();
  });

  module.exports = Site;

})();
