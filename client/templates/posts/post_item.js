Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },

  hostname: function(){
    return location.protocol + '//' + location.host;
  },

  submittedText: function() {
    var temp = moment(this.submitted).format('YYYYMMDD');
    var currentDate = moment(new Date()).format('YYYYMMDD');
    if(temp === currentDate){
      return moment().startOf('hour').fromNow();
    }else{
      return moment(temp, "YYYYMMDD").fromNow();
    }
  },

  contentText: function() {
    if(this.content.length < 255){
      return this.content;
    }else{
      return this.content.substring(0,255) + "...";
    }

  },

  shareOnFacebookLink: function(){
    var url = location.protocol + '//' + location.host + "/posts/" + this._id;
    return 'https://www.facebook.com/sharer/sharer.php?&u=' + url;
  },

  shareOnTwitterLink: function(){
    var url = location.protocol + '//' + location.host + "/posts/" + this._id;
    return 'https://twitter.com/intent/tweet?url=' + url + '&text=' + document.title;
  },

  shareOnGooglePlusLink: function(){
    var url = location.protocol + '//' + location.host + "/posts/" + this._id;
    return 'https://plus.google.com/share?url=' + url;
  },

  classView: function(){
    return Session.get('view');
  },

  penddingView: function(){
    var email = Meteor.user().profile.email;
    //if is lucas :D
    if(email === "xuantruong_0411@yahoo.com" && Session.get("pendingview") !== ""){
      return "penddingView";
    }else{
      return "";
    }
  }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },

  'click .post-category': function(e){
    var strCategory = e.target.innerText;
    Router.go('searchPosts', {category: strCategory, text: ""});
  },

  'click #btn-active': function(e){
      if (confirm("Active this post?")) {
        var currentPostId = this._id;
        var post = Posts.findOne(currentPostId);

        var postProperties = {
          title: post.title,
          content: post.content,
          category:post.category,

          image1: post.image1,
          image2: post.image2,
          image3: post.image3,
          image4: post.image4,
          image5: post.image5,
          image6: post.image6,
          image7: post.image7,
          image8: post.image8,
          image9: post.image9,
          image10: post.image10,
          image11: post.image11,
          image12: post.image12,
          image13: post.image13,
          image14: post.image14,
          image15: post.image15,
          status: ""
        };

        Posts.update(currentPostId, {$set: postProperties}, function(error) {
          if (error) {
            // display the error to the user
            throwError(error.reason);
          } else {
            Router.go('pendingPosts', {status: "deactive"});
          }
        });
    }
  },

  'click .cs-imageitem': function(){
      var currentPostId = this._id;
      var post = Posts.findOne(currentPostId);

      var items = [{src: post.image1}];
      if(post.image2 !== ""){
        items.push({src: post.image2});
      }
      if(post.image3 !== ""){
        items.push({src: post.image3});
      }
      if(post.image4 !== ""){
        items.push({src: post.image4});
      }
      if(post.image5 !== ""){
        items.push({src: post.image5});
      }
      if(post.image6 !== ""){
        items.push({src: post.image6});
      }
      if(post.image7!== ""){
        items.push({src: post.image7});
      }
      if(post.image8 !== ""){
        items.push({src: post.image8});
      }
      if(post.image9 !== ""){
        items.push({src: post.image9});
      }
      if(post.image10 !== ""){
        items.push({src: post.image10});
      }
      if(post.image11 !== ""){
        items.push({src: post.image11});
      }
      if(post.image12 !== ""){
        items.push({src: post.image12});
      }
      if(post.image13 !== ""){
        items.push({src: post.image13});
      }
      if(post.image14 !== ""){
        items.push({src: post.imageq4});
      }
      if(post.image15 !== ""){
        items.push({src: post.imageq5});
      }

      //preview image
      $('.cs-imageitem').magnificPopup({
        items: items,
        gallery: {
          enabled: true
        },
        type: 'image' // this is a default type
      });
    }

});
