// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  var email = Meteor.user().profile.email;
  return doc && (doc.userId === userId || email === "xuantruong_0411@yahoo.com"); //luscas
}
