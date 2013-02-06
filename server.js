#!/usr/bin/env nodejs
var express = require('express'),
    mysql      = require('mysql').createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'geruma'
    }),
    app = express();

app.use(express.bodyParser());

require('yui').YUI().use('array-extras', function(Y) {


    // app.use('/apps', express.static('.'));
    app.get('/', function (req, res) {
        console.log('sending index.html');
        res.sendfile('index.html');
    });

    app.get('/qq', function (req, res) {
       mysql.query('SELECT * from Cuentas order by Grupo, Codigo', function(err, rows) {
           if (err) throw err;
           var thSent = false;
           res.send('<table>' + Y.Array.map(rows, function(row) {
               var cells = [];
               if (!thSent) {
                   thSent = true;
                   Y.Object.each(row, function (value, name) {
                       cells.push('<th>' + name + '</th>');
                   });
                   cells.push('</tr><tr>');
               }
               Y.Object.each(row, function (value, name) {
                   cells.push('<td>' + value + '</td>');
               });
               return '<tr>' + cells.join('\n') + '</tr>';
           }).join('\n') + '</table>');
       });
    });
    app.get('/dayview', function(req, res){
        console.log('asked for dayview, sending index.html');
        res.sendfile('index.html');
    });

    app.get('/pies/:pieId', function (req, res) {
       res.send(bakery[req.params.pieId]);
    });

    app.get('/pies', function (req, res) {
        console.log('Listing all stock in the bakery');
        var a = [];
        for (var i in bakery) {
            a.push(bakery[i]);
        }
        res.send(a);
    });

    app.post('/pies', function (req, res) {
         var body = req.body;
         console.log('Adding ' , body.type);
         console.log(body);
         lastId += 1;
         body.pieId = lastId;
         bakery[lastId] = body;
         res.status(201);
         res.send({pieId:  lastId});
    });


    app['delete']('/pies/:pieId', function (req, res) {
        var pieId = req.params.pieId;
        console.log('deleting', pieId);
        delete bakery[pieId];
        res.send(200);

    });

    app.put('/pies/:pieId', function (req, res) {
         var pieId = req.params.pieId;
         console.log('Modifying ' , pieId);
         console.log(req.body);
         bakery[pieId] = req.body;
         res.send(200);
    });

    app.get('/pieView', function (req, res) {
        console.log('requested /pieView, sending index.html');
        res.sendfile('index.html');
    })
    app.get('/pieTable', function (req, res) {
        console.log('requested /pieTable, sending index.html');
        res.sendfile('index.html');
    })
    app.get('/all', function (req, res) {
        console.log('requested /pieTable, sending index.html');
        res.sendfile('index.html');
    })

    app.get('*', function (req, res) {
        console.log('*', req.path);
        res.sendfile('.' + req.path);
    });


    app.listen(3000);
    console.log('Listening on port 3000');
});
