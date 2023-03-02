const path = require('path');

module.exports = (req, res, next) => {
  const userAgent = req.get('User-Agent');
  if (req.method === 'GET' && userAgent && userAgent.includes('Mozilla')) {
    res.status(404).sendFile('404.html', { root: path.join(__dirname, '..', 'public') });
  } else {
    next();
  }
}