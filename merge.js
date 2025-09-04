// const PDFMerger = require('pdf-merger-js');

// var merger = new PDFMerger();

// const mergePdfs = async (p1, p2) => {
//   await merger.add('file1.pdf');  //merge all pages. parameter is the path to file and filename.
//   await merger.add('file3.pdf'); // merge only page 2

//   await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  
//   // Export the merged PDF as a nodejs Buffer
//   // const mergedPdfBuffer = await merger.saveAsBuffer();
//   // fs.writeSync('merged.pdf', mergedPdfBuffer);
// }

// module.exports = { mergePdfs }



// const PDFMerger = require('pdf-merger-js').default;

// const mergePdfs = async (p1, p2) => {
//   const merger = new PDFMerger();   // create new merger inside the function

//   await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
//   await merger.add(p2);
//   let d = new Date().getTime()
//   await merger.save(`public/${d}.pdf`);  // save merged PDF
//   return d
// };

// module.exports = { mergePdfs };


const PDFMerger = require('pdf-merger-js').default;
const path = require('path');

const mergePdfs = async (p1, p2, outputPath) => {
  const merger = new PDFMerger();
  await merger.add(p1);
  await merger.add(p2);

  await merger.save(outputPath);  // save to given path
  return outputPath;              // return file path
};

module.exports = { mergePdfs };
