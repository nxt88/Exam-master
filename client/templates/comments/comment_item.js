Template.commentItem.helpers({
  submittedText: function() {
    var temp = moment(this.submitted).format('YYYYMMDD');
    var currentDate = moment(new Date()).format('YYYYMMDD');
    if(temp === currentDate){
      return moment().startOf('hour').fromNow();
    }else{
      return moment(temp, "YYYYMMDD").fromNow();
    }
  }
});
