Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
            Meteor.subscribe('notifications')
          ];
  }
});

UserProfileController = RouteController.extend({
  template: 'userProfile',
  user: function() {
    return Meteor.user;
  }
});


PostsListController = RouteController.extend({
  template: 'postsList', //default template display to   {{> yield}} in layout.html
  increment: 10,//default numberItem
  category: function() {
    return this.params.category || "";
  },
  userId: function(){
    return this.params.userId || "";
  },
  status: function(){
    return this.params.status || "";
  },
  searchOptions: function() {
    if(this.userId() !== "" && this.status() ===""){
      //my post
      Session.set("pendingview", "");
      return {userId: this.userId() };
    }
    else if(this.userId() === "" && this.status() !== ""){
      //pending post
      Session.set("pendingview", "true");
      return {status: this.status() };
    }
    else if(this.userId() !== "" && this.status() !== ""){
      //my pending post
      Session.set("pendingview", "");
      return {userId: this.userId(), status: this.status() };
    }
    else{
      Session.set("pendingview", "");
      //all post
      // not set contain text???
       if(this.category() !== ""){
          if(this.category() !== "ALL"){
            //return {category: this.category(), status: ""};
            return {category: this.category()};
          }else{
            return {status: ""};
          }
      } else {
          return {status: ""};
      }
    }
  },
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    if(this.category() !== ""){
      return {sort: this.sort, limit: 1000};//fix
   }else{
     return {sort: this.sort, limit: this.postsLimit()};
   }
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find(this.searchOptions(), this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      //posts: self.posts(),
      //existItem: self.posts().count() > 0 ? true: false,
      posts: this.category() !== "" ? self.posts() : Posts.find(),
      existItem: self.posts().count() > 0 ? true: false,
      ready: self.postsSub.ready,
      nextPath: function() {
        if(self.category() !== "" || self.userId() !== "" || self.status() !==""){
          if (self.posts().count() === self.postsLimit()){
            return self.nextPath();
          }
        }else{
          if (Posts.find().count() === self.postsLimit()){
            return self.nextPath();
          }
        }
      }
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment});
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment});
  }
});

TopPostsController = PostsListController.extend({
  sort: {commentsCount: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.topPosts.path({postsLimit: this.postsLimit() + this.increment});
  }
});

SearchPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    //return Router.routes.searchPosts.path({category: this.category(), text: this.text(), postsLimit: this.postsLimit() + this.increment});
    //return Router.routes.searchPosts.path({category: this.category(), postsLimit: this.postsLimit() + this.increment});
    return "";
  }
});

MyPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.myPosts.path({userId: Meteor.userId , postsLimit: this.postsLimit() + this.increment});
  }
});

PendingPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.pendingPosts.path({status: this.status(), postsLimit: this.postsLimit() + this.increment});
  }
});

MyPedingPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.myPending1.path({userId:this.userId(), status: this.status(),postsLimit: this.postsLimit() + this.increment});
  }
});

MyProfileController = UserProfileController.extend({
  nextPath: function() {
    return Router.routes.myProfile.path();
  }
});


Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

Router.route('/top/:postsLimit?', {name: 'topPosts'});

//Router.route('/search/:category?/:postsLimit?', {name: 'searchPosts'});

Router.route('/search/:category', {name: 'searchPosts'});

Router.route('/mypost/:userId?/:postsLimit?', {name: 'myPosts'});

Router.route('/pending/:status?/:postsLimit?', {name: 'pendingPosts'});

Router.route('/mypending/:userId?/:status?/:postsLimit?', {name: 'myPending1', controller: MyPedingPostsController});

Router.route('/profile/:userId?', {name: 'myProfile'});


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() {
    Session.set('postId',this.params._id);
    return Posts.findOne(this.params._id);
   }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
