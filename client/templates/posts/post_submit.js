Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  },

  images: function() {
     return Images.find();
   },

   options:function(){
     return Categories.find();
   }
});


Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val().trim(),
      content: $(e.target).find('[name=content]').val().trim(),
      category:$(e.target).find('[name=category]').val().trim(),

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

    var errors = validatePost(post);
    if (errors.title || errors.content || errors.image1 || errors.image2 || errors.image3 || errors.image4 || errors.image5
        || errors.image6 || errors.image7 || errors.image8 || errors.image9 || errors.image10 || errors.image11 || errors.image12
        || errors.image13 || errors.image14 || errors.image15){
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');

      //Router.go('postPage', {_id: result._id});
      Router.go('pendingPosts', {status: "deactive"});
    });
  },

  /**
  'change .fileInput': function(event, template) {
     FS.Utility.eachFile(event, function(fsFile) {
       Images.insert(fsFile, function(err, fileObj) {
         if (err) {
           console.error(err);
         }
         console.log("Inserted file", fileObj);
       });
     });
  } **/
});
