const express = require("express");
const multer = require("multer");
const path = require("path");
const { mergePdfs } = require("./merge");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  if (req.files.length < 2) {
    return res.send("Please upload at least 2 PDF files");
  }

  const pdf1 = req.files[0].path;
  const pdf2 = req.files[1].path;

  // create unique filename for each merged PDF
  const outputFilename = `${Date.now()}.pdf`;
  const outputPath = path.join(__dirname, "public", outputFilename);

  await mergePdfs(pdf1, pdf2, outputPath);

  res.redirect(`/static/${outputFilename}`);
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
