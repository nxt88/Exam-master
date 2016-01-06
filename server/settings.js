/** Setting Account **/
/** Get more info fb **/
Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    //if (options.profile) {
        user.profile = options.profile;
        user.profile.memberSince = new Date();

        // Copy data from Facebook to user object
        user.profile.facebookId = user.services.facebook.id;
        user.profile.firstName = user.services.facebook.first_name;
        user.profile.email = user.services.facebook.email;
        user.profile.link = user.services.facebook.link;
    //}
    return user;
});

// Setting FB app
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    //appId: '1724162551139133', //local
    //secret: '48efd8e4f3d23d635806404e8eb62eb3' //local

    //appId: '425249817686199', //nxt88
    //secret: 'c251229a34a2b41a047a88b9a580a904' //nxt88

    //appId: '167037056988662', //aptech
    //secret: '3c093078674e836498036752030c7052' //aptech

    appId: '433793500153707', //dethiaptech
    secret: 'd88a10c40b15eda0282c48b271a498e2' //dethiaptech
});

/**
Meteor.publish("pictures", function() {
    return Images.find();
  });

Images.allow({
    insert: function(userId, doc) {
      return true;
    },
    download: function(userId, fileObj) {
      return true;
    },
    update: function(userId, doc, fields, modifier) {
      return true;
    },
    remove: function(userId, doc) {
      return true;
    }
  });

**/
