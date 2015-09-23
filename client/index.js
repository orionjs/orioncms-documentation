Session.set('currentBranch', '');
Session.set('currentSection', defaultSection);

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var branch = FlowRouter.getParam('branch');
    var section = FlowRouter.getParam('section');
    Session.set('currentBranch', branch);
    Session.set('currentSection', section || defaultSection);
  });

  self.autorun(function() {
    var branch = Branches.findOne(getBranchSelector());
    if (branch && !Session.get('currentBranch')) {
      Session.set('currentBranch', branch.branch);
    }
  });

  self.autorun(function() {
    var branch = Branches.findOne(getBranchSelector());
    var section = Session.get('currentSection');
    if (branch && section) {
      self.subscribe('doc', branch.branch, section);
    }
  });
});

Template.index.helpers({
  doc: function() {
    var branch = Branches.findOne(getBranchSelector());
    var section = Session.get('currentSection');
    return branch && section && Docs.findOne({ branch: branch.branch, section: section });
  }
});
