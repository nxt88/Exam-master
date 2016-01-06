Template.header.helpers({
  'hostname':function(){
    return location.protocol + '//' + location.host;
  }
});


Template.right_button.events({
    'click #btnScrollTop': function(event) {
        window.scrollTo(0, 0);
    },

    'click #btnReload': function(event){
      window.location.reload();
    }
});
