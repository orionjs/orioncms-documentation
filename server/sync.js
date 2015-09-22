Meteor.methods({
  refreshDocsFullBranch: function(branch) {
    check(branch, String);

    var url = 'https://raw.githubusercontent.com/orionjs/orion/' + branch + '/docs/index.json';
    var response = HTTP.get(url);
    if (response.statusCode !== 200) {
      throw new Meteor.Error('error', 'Error with github fetch');
    }
    var sections = JSON.parse(response.content).sections;

    var doc = {
      branch: branch,
      sections: sections,
      updatedAt: new Date()
    };

    Branches.upsert({ branch: branch }, { $set: doc });

    var _sections = _.pluck(_.union.apply(this, _.pluck(sections, 'childs')), 'section');
    _.each(_sections, function(section) {
      console.log(`Refreshing ${section}...`);
      Meteor.call('refreshDocs', branch, section);
    });
  },
  refreshDocs: function(branch, section) {
    check(branch, String);
    check(section, String);
    var url = 'https://raw.githubusercontent.com/orionjs/orion/' + branch + '/docs/' + section + '.md';
    var response = HTTP.get(url);
    if (response.statusCode !== 200) {
      throw new Meteor.Error('error', 'Error with github fetch');
    }
    var content = response.content;
    var doc = {
      branch: branch,
      section: section,
      content: content,
      updatedAt: new Date()
    };
    Docs.upsert({ branch: branch, section: section }, { $set: doc });
  }
});
