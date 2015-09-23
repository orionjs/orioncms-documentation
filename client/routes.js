FlowRouter.route('/:branch?/:section?', {
  action: function(params, queryParams) {
    BlazeLayout.render('index');
  }
});
