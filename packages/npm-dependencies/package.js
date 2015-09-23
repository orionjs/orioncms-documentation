Package.describe({
  name: 'npm-dependencies',
  version: '1.0.0',
});

Npm.depends({
  'body-parser': '1.13.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('export.js', 'server');

  api.export('bodyParser');
});
