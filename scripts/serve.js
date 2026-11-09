const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3080;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (!path.extname(reqPath)) {
    // If route doesn't have an extension, try .html
    if (fs.existsSync(path.join(ROOT, reqPath + '.html'))) {
      reqPath = reqPath + '.html';
    }
  }

  const filePath = path.join(ROOT, reqPath);
  if (!filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p><a href="/">Return to LUMA Home</a></p>');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      const compress = /\bgzip\b/.test(req.headers['accept-encoding'] || '') && ['.html', '.css', '.js', '.json', '.svg', '.ttf'].includes(ext);
      const response = compress ? zlib.gzipSync(content) : content;
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Vary': 'Accept-Encoding',
        ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
        'Content-Length': response.length
      });
      res.end(response);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`LUMA development server running at http://127.0.0.1:${PORT}/`);
});
