const express = require("express");
const multer = require("multer");
const path = require("path");
const { mergePdfs } = require("./merge");

const app = express();
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 3000;

// Serve everything inside public/ as static
app.use(express.static("public"));

// Route for index.html (from templates folder)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// Merge endpoint
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  if (req.files.length < 2) {
    return res.send("⚠️ Please upload at least 2 PDF files");
  }

  const pdf1 = req.files[0].path;
  const pdf2 = req.files[1].path;

  const outputFilename = `${Date.now()}.pdf`;
  const outputPath = path.join(__dirname, "public", outputFilename);

  await mergePdfs(pdf1, pdf2, outputPath);

  res.redirect(`/${outputFilename}`);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
