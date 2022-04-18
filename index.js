const { query } = require('express');
var express = require('express')
var mysql = require('mysql')
var app = express();

app.get('/', function(req, res) {
    // Paquete necesario para conectar a bases de datos MySQL.
    var mysql = require('mysql');

    // Consulta SQL.
    var sql = 'SELECT * FROM eshop.category LIMIT 10';

    // Parámetros de conexión a la base de datos.
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "diegomez",
    database : 'eshop'
    });

    // Funcion que nos permite comprobar la conexión a la base de datos.
    // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    // });
    
    let query_result = ""
    // Funcion que nos devolverá resultados de la base de datos.
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, (err, result) => {
            if (err) throw err;
            // Bucle que recore los resultados y pinta en consola.
            for(i=0; i<result.length; i++){
                console.log("Result: " + result[i].name);
                query_result += '<li class="list-group-item list-group-item-info">' + result[i].name + "</li>"
            }
            // Prepare payload
            let before_body = 
            ` 
            <!DOCTYPE html>
            <html>
            <head>
            <title>Page Title</title>
            </head>
            ` 
            let body = '<h1>Las categorias son:</h1><ul class="list-group">' + query_result + '</ul>'
            body += 
            `
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

            <!-- Optional theme -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

            <!-- Latest compiled and minified JavaScript -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            `
            let after_body = 
            `
            </html>
            `
            let html_respose = before_body + body + after_body

            res.send(html_respose)
        });
    })
})

app.listen(3000, function(){
    console.log('App listenting on port 3000');
})