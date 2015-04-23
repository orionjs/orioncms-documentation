var fs = require('fs');

var file = fs.readFileSync('./documentation.json', 'utf8');

describe('documentation.json', function(){
  it('should have valid json structure', function(){
    JSON.parse(file);
  })
  it('all pages exists', function() {
    var json = JSON.parse(file);
    var pages = json.pages;

    if (!Array.isArray(pages)) {
      throw Error('pages is not an array');
    }

    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      var fileContents = fs.readFileSync('./docs/' + page.file, 'utf8');
      if (!fileContents) {
        throw Error('file "' + page.file + '" is empty');
      }
    }
  })
})