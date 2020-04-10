var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
