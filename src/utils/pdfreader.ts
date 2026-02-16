import * as pdfjsLib from "pdfjs-dist";

// Tell pdfjs where the worker file is located
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

/**
 * Extracts all text from a PDF file
 * @param file File uploaded from input[type="file"]
 * @returns string with concatenated PDF text
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(" ");
    text += strings + "\n";
  }

  return text;
}
