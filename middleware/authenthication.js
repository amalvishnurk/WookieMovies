const authenticateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      if (token === 'FSMovies2023') {
        next();
      } else {
        res.sendStatus(403); 
      }
    } else {
      res.sendStatus(401); 
    }
  };

  module.exports = authenticateToken;
