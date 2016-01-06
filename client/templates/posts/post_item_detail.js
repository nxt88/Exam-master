Template.postItemDetail.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  hostname:function(){
    return location.protocol + '//' + location.host;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
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

  shareOnFacebookLink: function(){
    return 'https://www.facebook.com/sharer/sharer.php?&u=' + window.location.href;
  },

  shareOnTwitterLink: function(){
    return 'https://twitter.com/intent/tweet?url=' + window.location.href + '&text=' + document.title;
  },

  shareOnGooglePlusLink: function(){
    return 'https://plus.google.com/share?url=' + window.location.href;
  }
});

Template.postItemDetail.events({
  'click .post-category': function(e){
    var strCategory = e.target.innerText;
    Router.go('searchPosts', {category: strCategory, text: ""});
  },

  'click .cs-post-image': function(){
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
      $('.cs-post-image').magnificPopup({
        items: items,
        gallery: {
          enabled: true
        },
        type: 'image' // this is a default type
      });
    }

});
