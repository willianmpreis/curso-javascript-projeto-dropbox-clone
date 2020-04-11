var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({ //Recuperar o formulário
    uploadDir: './upload', //Diretorio
    keepExtensions: true //Manter a extensão
  });

  form.parse(req, (err, fields, files) => {
    
    let path = './' + fields.path;
    
    if (fs.existsSync(path)) {
      fs.unlink(path, error => {
        if (error) {
          res.status(400),json({error});
          return;
        }

        res.json({
          fields
        });
      });
    }
  });
});

router.post('/upload', (req, res) => {
  
  let form = new formidable.IncomingForm({ //Recuperar o formulário
    uploadDir: './upload', //Diretorio
    keepExtensions: true //Manter a extensão
  });

  form.parse(req, (err, fields, files) => {
    res.json({
      files
    });
  });
});

module.exports = router;
