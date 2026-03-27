const PDFMerger = require('pdf-merger-js');

const merger = new PDFMerger();

(async () => {
  try {
    console.log("Starting merge...");

    await merger.add('first.pdf');
    await merger.add('second.pdf');

    await merger.setMetadata({
      producer: "pdf-merger-js script",
      author: "Aarya",
      creator: "Aarya",
      title: "Merged PDF"
    });

    await merger.save('merged.pdf');

    console.log("✅ PDF merged successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();