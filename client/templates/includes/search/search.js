 Meteor.subscribe("categories");

Template.search.helpers({
  'hostname':function(){
    return location.protocol + '//' + location.host;
  },

  options:function(){
    return Categories.find();
  },

  classFlatView: function(){
    if(Session.get('view') === '' || Session.get('view') === undefined){
      return 'cs-view-active';
    }else {
      return 'cs-view-deactive';
    }
  },

  classGridView:function(){
    if(Session.get('view') !== '' && Session.get('view') !== undefined){
      return 'cs-view-active';
    }else{
      return 'cs-view-deactive';
    }
  }

});

Template.search.events({

  'click .cs-icon-search': function(e) {
      var strCategory = $("#category").val();
      //var text = $("#txtText").val().trim();
      Router.go('searchPosts', {category: strCategory});
  },

  'click .cs-image-view': function(e){
      $(".post").removeClass("cs-post-gridview");
      $(".cs-image-view").css('opacity', '1');
      $(".cs-image-grid-view").css('opacity', '0.3');
      Session.set('view',"");
  },

  'click .cs-image-grid-view':function(e){
      $(".post").addClass("cs-post-gridview");
      $(".cs-image-view").css('opacity', '0.3');
      $(".cs-image-grid-view").css('opacity', '1');
      Session.set('view',"cs-post-gridview");
  }

});
