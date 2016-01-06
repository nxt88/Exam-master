Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

/** config like fb **/
window.fbAsyncInit = function() {
    FB.init({
      appId      : '425249817686199',
      status     : true,
      xfbml      : true
    });
  };
