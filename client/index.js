Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var branch = FlowRouter.getParam('branch');
    var section = FlowRouter.getParam('section');
    self.subscribe('doc', branch, section);
  });
});

Template.index.helpers({
  doc: function() {
    var branch = FlowRouter.getParam('branch') || defaultBranch;
    var section = FlowRouter.getParam('section') || defaultSection;
    return Docs.findOne({ branch: branch, section: section });
  }
});
