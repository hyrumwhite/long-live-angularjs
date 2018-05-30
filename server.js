'use strict';

var express = require('express');

var app = express();

app.use(express.static('./public'));
app.listen(3344);
console.log('server started on 3344');
