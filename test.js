var fs = require('fs');

var file = fs.readFileSync('./documentation.json', 'utf8');

describe('documentation.json', function(){
  describe('#structure', function(){
    it('should have valid json structure', function(){
      JSON.parse(file);
    })
  })
})