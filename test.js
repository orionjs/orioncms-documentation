var fs = require('fs');

var file = fs.readFileSync('./documentation.json', 'utf8');

describe('documentation.json', function(){
  it('should have valid json structure', function(){
    JSON.parse(file);
  })

  describe('pages', function() {
    var pages;
    try {
      pages = JSON.parse(file).pages;
    } catch (e) {
      return;
    }

    it('should be an array', function() {
      if (!Array.isArray(pages)) {
        throw Error('pages is not an array');
      }
    })

    if (!Array.isArray(pages)) {
      return;
    }

    pages.forEach(function (page) {
      describe(page.file, function() {
        it('should exist', function() {
          var fileContents = fs.readFileSync('./docs/' + page.file, 'utf8');
        })

        var fileContents;

        try {
          fileContents = fs.readFileSync('./docs/' + page.file, 'utf8');
        } catch (e) {
          return;
        }

        if (!fileContents) {
          return;
        }

        it('should not be empty', function() {
          if (!fileContents) {
            throw Error('file "' + page.file + '" is empty');
          }
        });

        it('should not generate errors with highlightjs', function() {
          var re = /\n```.*```/g; 
          if (re.test(fileContents)) {
            throw Error('code without language should not start in a new line');
          }
        });
      })
    });
  })
  describe('links', function() {
    var links, pages;
    try {
      var json = JSON.parse(file);
      links = json.links;
      pages = json.pages;
    } catch (e) {
      return;
    }

    it('should be an array', function() {
      if (!Array.isArray(links)) {
        throw Error('links is not an array');
      }
    })

    if (!Array.isArray(links) || !Array.isArray(pages)) {
      return;
    }

    var validateLink = function(link) {
      if (link.slug) {
        describe(link.slug, function() {
          it('should be listed in pages', function() {
            var found = false;
            pages.forEach(function (page) {
              if (page.slug == link.slug) {
                found = true;
              }
            });
            if (!found) {
              throw Error('not listed in pages');
            }
          })
        })
      } else if (link.childs) {
        describe(link.title + ' category', function() {
          it('should be an array', function() {
            if (!Array.isArray(link.childs)) {
              throw Error('is not an array');
            }
          })
          link.childs.forEach(function (link) {
            validateLink(link);
          });
        })
      }
    }

    links.forEach(function (link) {
      validateLink(link);
    });

  })
  
})