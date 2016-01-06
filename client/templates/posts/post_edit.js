
Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },

  options:function(){
    return Categories.find();
  },

  selected: function(){
    var post = Posts.findOne(Session.get('postId'));
    if(this.value === post.category){
      return "selected"
    }
  },

  checkAuthor: function(){
    var email = Meteor.user().profile.email;
    //if is lucas :D
    if(email === "xuantruong_0411@yahoo.com"){
      return "author";
    }else{
      return "";
    }
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;
    var category = $(e.target).find('[name=category]').val().trim();

    var postProperties;
    var email = Meteor.user().profile.email;
    //if is lucas :D
    if(email === "xuantruong_0411@yahoo.com"){
        postProperties = {
           title: $(e.target).find('[name=title]').val().trim(),
           content: $(e.target).find('[name=content]').val().trim(),
           category:category,

           image1: $("#image1").val().trim(),
           image2: $("#image2").val().trim(),
           image3: $("#image3").val().trim(),
           image4: $("#image4").val().trim(),
           image5: $("#image5").val().trim(),
           image6: $("#image6").val().trim(),
           image7: $("#image7").val().trim(),
           image8: $("#image8").val().trim(),
           image9: $("#image9").val().trim(),
           image10: $("#image10").val().trim(),
           image11: $("#image11").val().trim(),
           image12: $("#image12").val().trim(),
           image13: $("#image13").val().trim(),
           image14: $("#image14").val().trim(),
           image15: $("#image15").val().trim(),
           status: $(e.target).find('[name=status]').val().trim()
       }
    }else{
        postProperties = {
         title: $(e.target).find('[name=title]').val().trim(),
         content: $(e.target).find('[name=content]').val().trim(),
         category:category,

         image1: $("#image1").val().trim(),
         image2: $("#image2").val().trim(),
         image3: $("#image3").val().trim(),
         image4: $("#image4").val().trim(),
         image5: $("#image5").val().trim(),
         image6: $("#image6").val().trim(),
         image7: $("#image7").val().trim(),
         image8: $("#image8").val().trim(),
         image9: $("#image9").val().trim(),
         image10: $("#image10").val().trim(),
         image11: $("#image11").val().trim(),
         image12: $("#image12").val().trim(),
         image13: $("#image13").val().trim(),
         image14: $("#image14").val().trim(),
         image15: $("#image15").val().trim()
       };
    }

    var errors = validatePost(postProperties);

    if (errors.title || errors.content || errors.image1 || errors.image2 || errors.image3 || errors.image4 || errors.image5
        || errors.image6 || errors.image7 || errors.image8 || errors.image9 || errors.image10 || errors.image11 || errors.image12
        || errors.image13 || errors.image14 || errors.image15){
      return Session.set('postEditErrors', errors);
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      //Router.go('home');
      Router.go('myPosts', {userId: Meteor.user()._id});
    }
  },

  'click .cancel': function(event){
    window.history.go(-1);
  }

});
