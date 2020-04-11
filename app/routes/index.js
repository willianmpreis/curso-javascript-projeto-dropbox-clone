var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req, res) => {
  let path = './' + req.query.path;
  if (!fs.existsSync(path)) {
    return res.status(404).json({
      error: "File not found"
    });
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err
      });
    }
    res.status(200).end(data);        
  })
});

router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({ //Recuperar o formulário
    uploadDir: './upload', //Diretorio
    keepExtensions: true //Manter a extensão
  });

  form.parse(req, (err, fields, files) => {
    
    let path = './' + fields.path;
    
    if (!fs.existsSync(path)) {
      return res.status(404).json({
        error: "File not found"
      });
    }
    fs.unlink(path, error => {
      if (error) {
        res.status(400),json({error});
        return;
      }
      res.json({
        fields
      });
    });
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
