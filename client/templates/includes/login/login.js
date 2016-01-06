Template.login.helpers({
  name: function(){
    var userProfile;
    userProfile = Meteor.user().profile;

    if(userProfile) { // logic to handle logged out state
      return userProfile.name;
    }
  },
  srcImage: function(){
    var userProfile;
    userProfile = Meteor.user().profile;
    if(userProfile) { // logic to handle logged out state
      return "https://graph.facebook.com/" + userProfile.facebookId +"/picture?type=small";
    }
  },

  'hostname':function(){
    return location.protocol + '//' + location.host;
  }
});

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'click .cs-logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },

    'click .cs-mypost': function(event){
      Router.go('myPosts', {userId: Meteor.user()._id});
    },

    'click .cs-profiles': function(event){
      Router.go('myProfile', {userId: Meteor.user()._id});
    },

    'click .cs-mypending': function(){
      Router.go('myPending1', {userId: Meteor.user()._id, status: "deactive"});
    }
});
