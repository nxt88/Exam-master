Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following three fields:
    return (_.without(fieldNames,
                                'category', 'title', 'content',
                                 'image1', 'image2', 'image3', 'image4', 'image5', 'image6',
                                'image7', 'image8', 'image9', 'image10', 'image11', 'image12', 'image13',
                                'image14', 'image15', 'status'
                      ).length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.content|| errors.image1;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title){
    errors.title = "Please fill in a title";
  }

  if (!post.content){
    errors.content =  "Please fill in a content";
  }

  if (!post.image1){
    errors.image1 =  "Please fill in a image";
  }

  //validate format link
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

 if(post.image1 && !regexp.test(post.image1)) {
   errors.image1 =  "Link to image not valid";
 }/** else if(post.image1){
   //check type file
   var type = post.image1.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image1 =  "Type of image: png|jpg|gif|jpeg";
   }
 } **/

 if(post.image2 && !regexp.test(post.image2)) {
   errors.image2 =  "Link to image not valid";
 }/** else if(post.image2){
   //check type file
   var type = post.image2.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image2 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image3 && !regexp.test(post.image3)) {
   errors.image3 =  "Link to image not valid";
 }/** else if(post.image3){
   //check type file
   var type = post.image3.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image3 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image4 && !regexp.test(post.image4)) {
   errors.image4 =  "Link to image not valid";
 }/** else if(post.image4){
   //check type file
   var type = post.image4.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image4 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image5 && !regexp.test(post.image5)) {
   errors.image5 =  "Link to image not valid";
 }/** else if(post.image5){
   //check type file
   var type = post.image5.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image5 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image6 && !regexp.test(post.image6)) {
   errors.image6 =  "Link to image not valid";
 }/** else if(post.image6){
   //check type file
   var type = post.image6.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image6 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image7 && !regexp.test(post.image7)) {
   errors.image7 =  "Link to image not valid";
 }/** else if(post.image7){
   //check type file
   var type = post.image7.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image7 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image8 && !regexp.test(post.image8)) {
   errors.image8 =  "Link to image not valid";
 }/** else if(post.image8){
   //check type file
   var type = post.image8.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image8 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image9 && !regexp.test(post.image9)) {
   errors.image9 =  "Link to image not valid";
 }/** else if(post.image9){
   //check type file
   var type = post.image9.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image9 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image10 && !regexp.test(post.image10)) {
   errors.image10 =  "Link to image not valid";
 }/** else if(post.image10){
   //check type file
   var type = post.image10.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image10 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image11 && !regexp.test(post.image11)) {
   errors.image11 =  "Link to image not valid";
 }/** else if(post.image11){
   //check type file
   var type = post.image11.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image11 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image12 && !regexp.test(post.image12)) {
   errors.image12 =  "Link to image not valid";
 }/** else if(post.image12){
   //check type file
   var type = post.image12.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image12 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image13 && !regexp.test(post.image13)) {
   errors.image13 =  "Link to image not valid";
 }/** else if(post.image13){
   //check type file
   var type = post.image13.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image13 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image14 && !regexp.test(post.image14)) {
   errors.image14 =  "Link to image not valid";
 }/** else if(post.image14){
   //check type file
   var type = post.image14.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image14 =  "Type of image: png|jpg|gif|jpeg";
   }
 }**/

 if(post.image15 && !regexp.test(post.image15)) {
   errors.image15 =  "Link to image not valid";
 }/** else if(post.image15){
   //check type file
   var type = post.image15.split('.').pop();
   if(type !== "png" && type !== "jpg" && type !== "gif" && type !== "jpeg" ){
     errors.image15 =  "Type of image: png|jpg|gif|jpeg";
   }
 } **/

  return errors;
}


Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      content: String,
      category: String,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      image5: String,
      image6: String,
      image7: String,
      image8: String,
      image9: String,
      image10: String,
      image11: String,
      image12: String,
      image13: String,
      image14: String,
      image15: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.content || errors.image1 || errors.image2 || errors.image3 || errors.image4 || errors.image5
      || errors.image6 || errors.image7 || errors.image8 || errors.image9 || errors.image10 || errors.image11 || errors.image12
      || errors.image13 || errors.image14 || errors.image15){
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    }
    /**
    var postWithSameLink = Posts.findOne({url: postAttributes.url});

    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    **/

    var user = Meteor.user();
    var userProfile = Meteor.user().profile;

    var post = _.extend(postAttributes, {
      userId: user._id,
      author: userProfile.name,
      facebookId: userProfile.facebookId,
      authorImg:"https://graph.facebook.com/" + userProfile.facebookId +"/picture?type=small",
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0,
      status: 'deactive'
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },

  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },

});
