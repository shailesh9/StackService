"use strict";

import express from "express";
import {Stack} from "./stack";

let router = express.Router(),
  pushRoute = router.route("/push"),
  popRoute = router.route("/pop"),
  viewRoute = router.route("/view"),
  defaultRoute = router.route("/");

pushRoute
  .post(Stack.push.bind(Stack));

popRoute
  .post(Stack.pop.bind(Stack));

viewRoute
  .get(Stack.view.bind(Stack));

defaultRoute
  .get(Stack.home.bind(Stack));

export {router};