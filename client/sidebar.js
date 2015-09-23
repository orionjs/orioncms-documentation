Template.sidebar.onCreated(function() {
  var self = this;
  self.subscribe('defaultBranch');
  self.autorun(function() {
    var branch = Session.get('currentBranch');
    if (branch) {
      self.subscribe('branch', branch);
    }
  });
});

Template.sidebar.helpers({
  branch: function() {
    return Branches.findOne(getBranchSelector());
  },
  branchName: function() {
    var branch = Branches.findOne(getBranchSelector());
    return (branch && branch.branch) || FlowRouter.getParam('branch');
  }
});

Template.sidebar.events({
  'click a[data-section]': function(event, template) {
    var branch = Branches.findOne(getBranchSelector());
    var section = $(event.currentTarget).attr('data-section');
    FlowRouter.setParams({ section: section, branch: branch.branch });
    event.preventDefault();
  }
});
