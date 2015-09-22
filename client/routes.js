FlowRouter.route('/:branch?/:section?', {
  action: function(params, queryParams) {
    if (!params.branch) {
      FlowRouter.setParams({ branch: defaultBranch });
    }
    if (!params.section) {
      FlowRouter.setParams({ section: defaultSection });
    }
    BlazeLayout.render('index');
  }
});
