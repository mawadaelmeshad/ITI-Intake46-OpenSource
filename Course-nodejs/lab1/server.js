const http = require('http');
const fs = require('fs').promises;

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/students') {
      const data = await fs.readFile('students.json', 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
      return;
    }

    if (req.method === 'GET' && req.url === '/stats') {
      const data = await fs.readFile('students.json', 'utf8');
      const students = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ total: students.length }));
      return;
    }

    if (req.method === 'GET' && req.url === '/courses') {
      const data = await fs.readFile('students.json', 'utf8');
      const students = JSON.parse(data);
      const courses = [...new Set(students.map((s) => s.course))];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ courses }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
