
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/deloitte');
var Schema = mongoose.Schema;

var Movies = mongoose.model('Movies', new Schema({
  title: String,
  year: Number,
  rating: Number,
  genre: String,
  poster: String
}));

var Users = mongoose.model('Users', new Schema({
  name: String,
  lastname: String,
  email: String
}));

var UsersRels = mongoose.model('UsersRels', new Schema({
  idReg: String,
  type: String,
  idUser: String
}));

var app = express();

app.configure(function () {

  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'www')));
});

app.configure('development', function () {

  app.use(express.errorHandler());
});


//
app.get('/', function (req, res) {

  fs.readFile('index.html', 'utf8', function (err, text) {
    res.send(text);
  });
});


///
// MOVIES
//
// select
app.get('/movies', function (req, res) {

  var cond = {};
  if (!!req.query.title) {

    cond['title'] = {$regex: '.*(' + req.query.title + ').*', $options: 'i'};
  }

  // Buscamos el total de registros
  Movies.count(cond, function (err, count) {

    if (!err) {

      var query = Movies.find(cond),
        page = 1,
        size = 1;

      if (!isNaN(req.query.size) && req.query.size > 0) {
        size = req.query.size;
      }
      if (!isNaN(req.query.page) && req.query.page > 0) {
        page = req.query.page;
      }

      // Buscamos los registros acotados
      query
        .skip((page - 1) * size)
        .limit(size)
        .sort('title')
        .exec(function (err, docs) {

          if (!err) {

            // Devolvemos
            res.send({
              total: count,
              rows: docs
            });
          }
          else {

            console.log(err);
            res.status(403).send('{"success":false}');
          }
        });
    }
    else {

      console.log(err);
      res.status(403).send('{"success":false}');
    }
  });
});
// insert
app.post('/movies', function (req, res) {

  var doc = new Movies(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// update
app.put('/movies/:id', function (req, res) {

  Movies.findById(req.params.id, function (err, doc) {

    if (!err) {

      for (var i in req.body) {

        if (i !== '_id') {
          doc[i] = req.body[i];
        }
      }

      doc.save(function (err, doc) {

        if (!err) {

          res.send(doc);
        }
        else {

          res.status(403).send('{"success":false}');
        }
      });
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// edit
app.get('/movies/:id', function (req, res) {

  Movies.findById(req.params.id, function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// remove
app.delete('/movies/:id', function (req, res) {

  Movies.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


///
// USERS
//
// select
app.get('/users', function (req, res) {

  var cond = {};
  if (!!req.query.name) {

    cond['name'] = {$regex: '.*(' + req.query.name + ').*', $options: 'i'};
  }

  // Buscamos el total de registros
  Users.count(cond, function (err, count) {

    if (!err) {

      var query = Users.find(cond),
        page = 1,
        size = 1;

      if (!isNaN(req.query.size) && req.query.size > 0) {
        size = req.query.size;
      }
      if (!isNaN(req.query.page) && req.query.page > 0) {
        page = req.query.page;
      }

      // Buscamos los registros acotados
      query
        .skip((page - 1) * size)
        .limit(size)
        .sort('name lastName')
        .exec(function (err, docs) {

          if (!err) {

            // Devolvemos
            res.send({
              total: count,
              rows: docs
            });
          }
          else {

            console.log(err);
            res.status(403).send('{"success":false}');
          }
        });
    }
    else {

      console.log(err);
      res.status(403).send('{"success":false}');
    }
  });
});
// insert
app.post('/users', function (req, res) {

  var doc = new Users(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// update
app.put('/users/:id', function (req, res) {

  Users.findById(req.params.id, function (err, doc) {

    if (!err) {

      for (var i in req.body) {

        if (i !== '_id') {
          doc[i] = req.body[i];
        }
      }

      doc.save(function (err, doc) {

        if (!err) {

          res.send(doc);
        }
        else {

          res.status(403).send('{"success":false}');
        }
      });
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// edit
app.get('/users/:id', function (req, res) {

  Users.findById(req.params.id, function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// remove
app.delete('/users/:id', function (req, res) {

  Users.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


///
// UsersRels
//
// select
app.get('/usersRels', function (req, res) {

  var cond = {};
  if (!!req.query.idReg) {

    cond['idReg'] = req.query.idReg;
  }
  if (!!req.query.typeReg) {

    cond['typeReg'] = req.query.typeReg;
  }
  if (!!req.query.idUser) {

    cond['idUser'] = req.query.idUser;
  }

  // Buscamos el total de registros
  UsersRels.count(cond, function (err, count) {

    if (!err) {

      var query = UsersRels.find(cond),
        page = 1,
        size = 1;

      if (!isNaN(req.query.size) && req.query.size > 0) {
        size = req.query.size;
      }
      if (!isNaN(req.query.page) && req.query.page > 0) {
        page = req.query.page;
      }

      // Buscamos los registros acotados
      query
        .skip((page - 1) * size)
        .limit(size)
        .exec(function (err, docs) {

          if (!err) {

            var total = docs.length,
              counter = total;
              i = 0,
              arrDocs = [];

            // Si no hay relaciones
            if (total === 0) {

              res.send({
                total: count,
                rows: docs
              });

              return true;
            }

            for (i; i < total; i++) {

              (function (i) {

                var objDoc = JSON.stringify(docs[i]);
                objDoc = JSON.parse(objDoc);

                // Buscamos los datos del usuario
                Users.findById(objDoc.idUser, function (err, doc) {

                  if (!err) {

                    objDoc['nameUser'] = doc.name + ' ' + doc.lastname;
                    console.log(objDoc);
                  }
                  else {

                    console.log(err);
                  }

                  // Buscamos los datos del registro
                  Movies.findById(objDoc.idReg, function (err, doc) {

                    if (!err) {

                      objDoc['titleReg'] = doc.title;
                    }
                    else {

                      console.log(err);
                    }

                    arrDocs.push(objDoc);

                    counter--;
                    if (counter === 0) {

                      // Devolvemos
                      res.send({
                        total: count,
                        rows: arrDocs
                      });
                    }
                  });
                });

              })(i);
            }
          }
          else {

            console.log(err);
            res.status(403).send('{"success":false}');
          }
        });
    }
    else {

      console.log(err);
      res.status(403).send('{"success":false}');
    }
  });
});
// insert
app.post('/usersRels', function (req, res) {

  var doc = new UsersRels(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// remove
app.delete('/usersRels/:id', function (req, res) {

  UsersRels.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


http.createServer(app).listen(app.get('port'), function () {

  console.log("Express server listening on port " + app.get('port'));
});
