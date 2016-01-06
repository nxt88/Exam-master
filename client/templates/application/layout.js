Template.layout.onRendered(function() {

  this.find('#main')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },

    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };

  var lastScrollTop = 0;

  $(window).scroll(function() {
    //load more post when scroll end
    var scrollHeight = $(document).height();
  	var scrollPosition = $(window).height() + $(window).scrollTop();
  	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
  	    // when scroll to bottom of the page
        $(".load-more").click();
  	}

    //hide footer when scroll up
    var st = $(this).scrollTop();
     if(st < lastScrollTop) {
       //up
       $("#footer").fadeIn('slow');
     }
     else {
       //down
       $("#footer").fadeOut('slow');

     }

     if(st === 0){
        $("#footer").fadeOut('slow');
     }

     lastScrollTop = st;

  });

});
