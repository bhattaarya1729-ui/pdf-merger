const input     = document.getElementById('exampleFormControlFile1');
const dropZone  = document.getElementById('drop-zone');
const fileList  = document.getElementById('file-list');
const mergeBtn  = document.getElementById('mergeBtn');
const countStat = document.getElementById('count-stat');
const sizeStat  = document.getElementById('size-stat');

let files = [];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function render() {
  fileList.innerHTML = '';
  let total = 0;
  files.forEach((f, i) => {
    total += f.size;
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <div class="file-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
      <div class="file-info">
        <div class="file-name">${f.name}</div>
        <div class="file-size">${formatSize(f.size)}</div>
      </div>
      <button class="file-remove" data-i="${i}" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    fileList.appendChild(item);
  });

  countStat.textContent = files.length;
  sizeStat.textContent  = formatSize(total);
  mergeBtn.disabled     = files.length < 2;
}

function addFiles(newFiles) {
  files = [...files, ...Array.from(newFiles)];
  render();
}

input.addEventListener('change', e => addFiles(e.target.files));

fileList.addEventListener('click', e => {
  const btn = e.target.closest('.file-remove');
  if (!btn) return;
  files.splice(+btn.dataset.i, 1);
  render();
});

dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  addFiles(e.dataTransfer.files);
});

mergeBtn.addEventListener('click', async () => {
  const formData = new FormData();
  files.forEach(f => formData.append('pdf', f));

  const res = await fetch('/merge', { method: 'POST', body: formData });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'merged.pdf';
  a.click();
});