const express = require('express');
const path = require('path');
const app = express();
const PORT = 4200;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the Angular app
app.use(express.static('dist/angular-tour-of-heroes'));

// Handle .pkpass files specifically with correct MIME type
app.get('/BoardingPass.pkpass', (req, res) => {
  res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
  res.setHeader('Content-Disposition', 'attachment; filename="BoardingPass.pkpass"');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public', 'BoardingPass.pkpass'));
});

// Serve index.html for all other routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-tour-of-heroes', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 .pkpass files will be served with correct MIME type`);
});
