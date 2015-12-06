'use strict';
var auth = (req, res, next) => {
  !req.isAuthenticated() ? res.send(401) : next()
}
