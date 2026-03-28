# 📄 PDF Merger

A clean, modern web app to merge multiple PDF files into one — built with Node.js, Express, and pdf-merger-js.

🔗 **Live Demo:** https://pdf-merger-production-fc81.up.railway.app/

---

## ✨ Features

- 📂 Drag & drop or browse to upload PDF files
- 🗂️ Supports multiple files at once
- 👁️ Live file list with name, size, and remove option
- 📊 Real-time stats (file count & total size)
- ⬇️ Downloads the merged PDF instantly
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js, Express |
| File Uploads | Multer |
| PDF Merging | pdf-merger-js |
| Deployment | Railway |

---

## 📁 Project Structure

```
pdf-merger/
├── server.js           # Express server & merge logic
├── package.json
├── public/
│   ├── style.css       # All styling
│   └── script.js       # Frontend logic
└── templates/
    └── index.html      # Main HTML page
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bhattaarya1729-ui/pdf-merger.git
cd pdf-merger
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and visit:
```
http://localhost:3000
```

---

## 🔧 How It Works

1. User uploads 2 or more PDF files via the UI
2. Files are sent to the `/merge` POST endpoint via `FormData`
3. Multer saves the files to the `uploads/` folder with their original names
4. `pdf-merger-js` merges all files into a single `merged.pdf`
5. The merged file is sent back to the browser as a download

---

## 📦 Dependencies

```json
{
  "express": "^5.2.1",
  "multer": "^2.1.1",
  "pdf-merger-js": "latest"
}
```

---

## 🌐 Deployment

This app is deployed on **Railway** which fully supports Node.js file system operations. The port is dynamically assigned via:

```javascript
const port = process.env.PORT || 3000;
```

---

## 🙋‍♂️ Author

**Aarya Bhatt**
- GitHub: [@bhattaarya1729-ui](https://github.com/bhattaarya1729-ui)
- LinkedIn: [in/aaryabhatt11](https://linkedin.com/in/aaryabhatt11)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
