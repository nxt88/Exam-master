Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id}, {  sort: {submitted: -1}});
  },
  submittedText: function() {
    return moment(this.submitted).format('DD/MM/YYYY HH:mm A');
  }
});
