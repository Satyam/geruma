#!/usr/bin/env nodejs
"use strict";
var express = require('express'),
mysql      = require('mysql').createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'geruma'
}),
app = express(),
path = require('path');

app.use(express.bodyParser());
require('yui').YUI().use('array-extras','parallel', function(Y) {
    var yeach = Y.Array.each;

    var pases = function (id, callback) {
        mysql.query('Select * From Pases Where IdAsiento=?', id, function (err, rows) {
            if (err) throw err;
            var datos = {};
            yeach(rows, function (row) {
                datos[row.IdPase] = {
                    cuenta: row.Cuenta,
                    importe: row.Debe === null ? row.Haber : -row.Debe
                };
            });
            callback(datos);
        });

    };

    var anexos = function (id, callback) {
        mysql.query(
            'Select * From Anexos  Where IdAsiento=?', id,
            function (err, rows) {
                var data = {};
                if (err) throw err;
                yeach(rows, function(anexo) {
                    var d = {};
                    switch(anexo.Tipo) {
                        case 1:
                            d.iva = {
                                baseImponible:anexo.Importe,
                                porcentaje: parseFloat(anexo.Texto) || 0
                            };
                            break;
                        case 2:
                            d.numCheque = anexo.Texto;
                            break;
                        case 3:
                            d.conciliacion = anexo.Numero;
                            break;
                        case 4:
                            d.fecha = anexo.Fecha;
                            break;
                        case 5:
                            d.clientes = anexo.Numero;
                            break;
                        case 6:
                            d.conciliado = anexo.Numero;
                            break;
                        case 7:
                            d.efvoCierre = anexo.Importe;
                            break;
                        case 8:
                            d.cierraApertura = anexo.Numero;
                            break;
                        case 9:
                            d.cerradaEn = anexo.Numero;
                            break;
                        case 10:
                            d.diferencia = anexo.Importe;
                            break;
                        case 11:
                            d.diferenciaAsiento = {
                                importe: anexo.Importe,
                                asiento: anexo.Numero
                            };
                            break;
                        case 12:
                            d.diferenciaCierre = {
                                importe: anexo.Importe,
                                fecha: anexo.Fecha
                            };
                            break;
                        case 13:
                            d.diferenciaApertura = anexo.Numero;
                            break;
                        case 14:
                            d.pendienteConciliar = true;
                            break;
                        case 15:
                            d.pendienteCerrar = true;
                            break;
                        case 16:
                            d.debitoBancarioPendienteConciliar = true;
                            break;
                        case 17:
                            d.transferencia = true;
                            break;
                        case 18:
                            d.cargosYComisiones = true;
                            break;
                        case 19:
                            d.domiciliacion = true;
                            break;
                        case 20:
                            d.provedor = anexo.Texto;
                            break;
                        case 21:
                            d.tarjeta = true;
                            break;
                        case 22:
                            d.efvoApertura = anexo.Importe;
                            break;
                        case 23:
                            d.ajusteAsiento = {
                                asiento: anexo.Numero,
                                causa: anexo.Texto
                            };
                            break;
                        case 24:
                            d.dividendoComoNomina = true;
                            break;
                        case 25:
                            d.verAsiento = anexo.Numero;
                            break;

                    }
                    data[anexo.IdAnexo] = d;
                });
                callback(data);
        });
    };

    var asiento = function (id, callback) {
        var sync = new Y.Parallel(),
            dataAsiento, dataPases, dataAnexos;

       mysql.query('Select IdAsiento, Fecha, AutoAsiento, Asientos.Descr, ' +
            ' TiposAutoAsiento.Descr as aa, IdUsr, ' +
            ' Nombre From Asientos inner join Users using(IdUsr) right join ' +
            ' TiposAutoAsiento on Asientos.AutoAsiento = TiposAutoAsiento.Codigo ' +
            'where IdAsiento = ?', id, sync.add(function (err, rows) {
            if (err) throw err;
            dataAsiento = rows[0];
        }));
        pases(id, sync.add(function (data) {
            dataPases = data;
        }));
        anexos(id, sync.add(function (data) {
            dataAnexos = data;
        }));

        sync.done(function () {
            dataAsiento.pases = dataPases;
            dataAsiento.anexos = dataAnexos;
            callback(dataAsiento);

        });

    };

    // app.use('/apps', express.static('.'));
    app.get('/', function (req, res) {
        console.log('sending index.html');
        res.sendfile('index.html');
    });


    app.get('/dayview', function(req, res){
        console.log('asked for dayview, sending index.html');
        res.sendfile('index.html');
    });
    app.get('/asiento/*', function(req, res){
        console.log('asked for asiento, sending index.html');
        res.sendfile('index.html');
    });

    app.get('/data/apertura/:fecha', function (req, res) {
        var fecha = req.params.fecha;
        console.log('lee apertura for:', fecha);
        mysql.query('Select Asientos.IdAsiento, Nombre, Asientos.IdUsr from Asientos ' +
            ' inner join Users on Asientos.IdUsr = Users.IdUsr' +
            ' where AutoAsiento = 4 and Asientos.Fecha = ?' +
            ' group by Asientos.IdAsiento', fecha, function(err, rows) {
            if (err) throw err;
            if (!rows.length) {
                res.send(404);
            }
            var reply  = rows[0];
            anexos(reply.IdAsiento,  function (data) {
                Y.Object.each(data, function (value) {
                    reply.efvoApertura = reply.efvoApertura || value.efvoApertura;
                    reply.cerradaEn = reply.cerradaEn || value.cerradaEn;
                })
               res.send(reply);
            });
        });
    });

    app.get('/data/asiento/:id', function (req, res) {
        var id = parseInt(req.params.id,10);
        console.log('lectura asiento', id);

        asiento(id, function(data) {
            res.send(data);
        });
    });

    // These should always go last:
    app.get('/jivaprototype/*' , function (req, res) {
        console.log('/jivaprototype:', path.resolve('..' + req.path));
        res.sendfile(path.resolve('..' + req.path));
    });
    app.get('/myGallery/*' , function (req, res) {
        console.log('/myGallery:', path.resolve('..' + req.path));
        res.sendfile(path.resolve('..' + req.path));
    });
    app.get('*', function (req, res) {
        console.log('*', req.path);
        res.sendfile('.' + req.path);
    });


    app.listen(3000);
    console.log('Listening on port 3000');
});
