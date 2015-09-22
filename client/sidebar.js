Template.sidebar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var branch = FlowRouter.getParam('branch');
    self.subscribe('branch', branch);
  });
});

Template.sidebar.helpers({
  branch: function() {
    var branch = FlowRouter.getParam('branch');
    return Branches.findOne({ branch: branch });
  }
})

Template.sidebar.events({
  'click a[data-section]': function(event, template) {
    var section = $(event.currentTarget).attr('data-section');
    FlowRouter.setParams({ section: section });
    event.preventDefault();
  }
});
