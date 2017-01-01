"use strict";

export class Stack {

  static push(req, res) {
    let item = req.body.item;

    if (!req.session.stack) {
      req.session.stack = [item];
    }else {
      req.session.stack.unshift(item)
    }

    return res.send(req.session.stack);
  }

  static pop(req, res) {
    let sess = req.session;

    if (sess.stack && sess.stack.length) {
      return res.send({
        "item": sess.stack.shift(),
        "stack": sess.stack
      });
    }
    return res.send([]);
  }

  static view(req, res) {
    let sess = req.session;

    if (sess.stack) {
      return res.send(sess.stack);
    }
    return res.send([]);
  }

  static home(req, res) {
    let sess = req.session;

    if (sess.stack && sess.stack.length) {
      return res.render('index', {title: 'Home', stack: sess.stack})
    }
    return res.render('index', {title: 'Home'})
  }
}