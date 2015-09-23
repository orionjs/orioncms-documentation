Picker.middleware(bodyParser.json());
Picker.route('/sync', function(params, req, res, next) {

  if (req.headers['x-github-event'] !== 'push') {
    res.end('no push event');
    return;
  }

  var data = req.body;

  if (!data) {
    res.end('no json');
    return;
  }

  var refParts = data.ref && data.ref.split('/');
  var branch = refParts && refParts.length == 3 && refParts[2];

  if (!branch) {
    res.end('no branch');
    return;
  }

  var filesChanged = _.union.apply(this, _.pluck(data.commits, 'modified'));

  Meteor.defer(function() {
    if (_.contains(filesChanged, 'docs/index.json')) {
      Meteor.call('refreshDocsFullBranch', branch);
    } else {
      _.each(filesChanged, function(fileName) {
        if (/^docs\/[a-z-]*\.md$/.test(fileName)) {
          var match = fileName.match(/^docs\/([a-z-]*)\.md$/);
          var section = match && match[1];
          if (section) {
            Meteor.call('refreshDocs', branch, section);
          }
        }
      });
    }
  });

  res.end('ok');
});

Meteor.methods({
  refreshDocsFullBranch: function(branch) {
    check(branch, String);

    console.log(`Refreshing branch ${branch}...`);
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
      Meteor.call('refreshDocs', branch, section);
    });
  },
  refreshDocs: function(branch, section) {
    check(branch, String);
    check(section, String);

    console.log(`Refreshing ${branch} ${section}...`);
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
