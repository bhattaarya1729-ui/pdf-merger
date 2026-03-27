const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/merge', upload.array('pdf', 10), async function(req, res, next) {
  try {
    // Dynamic import fixes the CommonJS/ESModule conflict
    const { default: PDFMerger } = await import('pdf-merger-js');
    
    const merger = new PDFMerger();

    for (const file of req.files) {
      await merger.add(path.join(__dirname, file.path));
    }

    const outputPath = path.join(__dirname, 'uploads', 'merged.pdf');
    await merger.save(outputPath);

    res.download(outputPath, 'merged.pdf');

  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});