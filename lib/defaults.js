defaultSection = 'introduction';

getBranchSelector = function() {
  var branch = Session.get('currentBranch');
  if (branch) {
    return { branch: branch };
  } else {
    return { isDefault: true };
  }
};
