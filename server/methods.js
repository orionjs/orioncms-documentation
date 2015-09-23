Meteor.methods({
  getDefaultBranch: function() {
    var branch = Branches.findOne({ isDefault: true });
    return branch.branch;
  }
});
