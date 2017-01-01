"use strict";

import express from "express";
import bodyParser from "body-parser";
import {router} from "./endpoints/index";
import path from "path";
import session from "express-session";
import uuid from "node-uuid";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express(),
  secret = uuid.v1();

app.set('views', path.resolve('views'));
app.set('view engine', 'jade');
app.set("port", (process.env.PORT || config.http.port));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: secret
}));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


// Starts the app
app.listen(app.get('port'), function () {
  console.log("Server has started and is listening on port: " + app.get('port'));
});