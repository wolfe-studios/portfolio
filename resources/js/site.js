(function(){
  "use strict";

  /* globals $ */

  var Site = {
    init: function() {
      console.log('Site javascript module working');
    }
  };

  $(function() {
    Site.init();
  });

  module.exports = Site;

})();
