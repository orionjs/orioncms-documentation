Meteor.publish('branch', function(branch = defaultBranch) {
  check(branch, String);
  return Branches.find({ branch: branch });
});

Meteor.publish('doc', function(branch = defaultBranch, section = defaultSection) {
  check(branch, String);
  check(section, String);
  return Docs.find({ branch: branch, section: section });
});
