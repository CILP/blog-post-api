module.exports = function(req, res, next) {
  const xAccesToken = req.headers['x-access-token'];
  if (xAccesToken === 'secret') {
      next();
  } else {
      res.sendStatus(403);
  }
};