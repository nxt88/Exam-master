Template.userProfile.helpers({
  name: function(){
    var userProfile = Meteor.user().profile;
    if(userProfile) {
      return userProfile.name;
    }
  },

  email: function(){
    var userProfile = Meteor.user().profile;
    if(userProfile) {
      return userProfile.email;
    }
  },

  srcImage: function(){
    var userProfile = Meteor.user().profile;
    if(userProfile) {
      return "https://graph.facebook.com/" + userProfile.facebookId +"/picture?type=large";
    }
  },

  'hostname':function(){
    return location.protocol + '//' + location.host;
  }
});
