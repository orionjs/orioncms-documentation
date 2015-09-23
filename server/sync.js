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

  var filesChanged = _.union.apply(this, _.pluck(data.commits, 'modified'));
  var shouldReload = false;

  _.each(filesChanged, function(fileName) {
    if (/^docs/.test(fileName)) {
      shouldReload = true;
    }
  });

  if (shouldReload) {
    Meteor.setTimeout(function() {
      Meteor.call('refreshAll');
    }, 10000);
  }

  res.end('ok');
  return;
});

Meteor.methods({
  refreshAll: function() {
    console.log(`Refreshing all...`);
    var url = 'https://raw.githubusercontent.com/orionjs/orion/master/docs.json';

    var response = HTTP.get(url);
    if (response.statusCode !== 200) {
      throw new Meteor.Error('error', 'Error with github fetch');
    }

    var branches = JSON.parse(response.content).branches;
    Branches.remove({});
    Docs.remove({});

    _.each(branches, function(branch) {
      Meteor.call('refreshDocsFullBranch', branch.id, branch.alias, !!branch.isDefault);
    });
  },
  refreshDocsFullBranch: function(branch, alias, isDefault) {
    check(branch, String);
    check(alias, String);
    check(isDefault, Boolean);

    console.log(`Refreshing branch ${branch} as ${alias}...`);
    var url = `https://raw.githubusercontent.com/orionjs/orion/${branch}/docs/index.json`;
    var response = HTTP.get(url);
    if (response.statusCode !== 200) {
      throw new Meteor.Error('error', 'Error with github fetch');
    }
    var sections = JSON.parse(response.content).sections;

    var doc = {
      branch: alias,
      branchCode: branch,
      sections: sections,
      updatedAt: new Date(),
      isDefault: isDefault
    };

    Branches.upsert({ branch: alias }, { $set: doc });

    var _sections = _.pluck(_.union.apply(this, _.pluck(sections, 'childs')), 'section');
    _.each(_sections, function(section) {
      Meteor.call('refreshDocs', branch, alias, section);
    });
  },
  refreshDocs: function(branch, alias, section) {
    check(branch, String);
    check(alias, String);
    check(section, String);

    console.log(`Refreshing ${branch} as ${alias}: ${section}...`);
    var url = `https://raw.githubusercontent.com/orionjs/orion/${branch}/docs/${section}.md`;
    var response = HTTP.get(url);
    if (response.statusCode !== 200) {
      throw new Meteor.Error('error', 'Error with github fetch');
    }
    var content = response.content;
    var doc = {
      branch: alias,
      section: section,
      content: content,
      updatedAt: new Date()
    };
    Docs.upsert({ branch: alias, section: section }, { $set: doc });
  }
});
