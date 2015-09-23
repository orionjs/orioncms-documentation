Meteor.publish('defaultBranch', function() {
  return Branches.find({ isDefault: true }, { limit: 1, fields: { branch: 1, isDefault: 1 } });
});

Meteor.publish('branch', function(branch) {
  check(branch, Match.Optional(String));
  return Branches.find({ branch: branch }, { limit: 1 });
});

Meteor.publish('doc', function(branch, section = defaultSection) {
  check(branch, String);
  check(section, String);
  return Docs.find({ branch: branch, section: section });
});
