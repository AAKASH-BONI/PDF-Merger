const express = require("express");
const multer = require("multer");
const path = require("path");
const { mergePdfs } = require("./merge");

const app = express();
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 3000;

// Serve all files inside public/ (including merged PDFs)
app.use(express.static("public"));

// Serve index.html from templates folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// Handle merge request
app.post("/merge", upload.array("pdfs"), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("⚠️ Please upload at least 2 PDF files");
    }

    // Generate a unique filename for output
    const outputFilename = `${Date.now()}.pdf`;
    const outputPath = path.join(__dirname, "public", outputFilename);

    // Collect file paths of all uploaded PDFs
    const filePaths = req.files.map(file => file.path);

    // Merge PDFs
    await mergePdfs(filePaths, outputPath);

    // Redirect to the merged PDF
    res.redirect(`/${outputFilename}`);
  } catch (err) {
    console.error("❌ Error merging PDFs:", err);
    res.status(500).send("Internal Server Error: " + err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
