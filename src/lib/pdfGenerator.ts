import { ResumeData } from './resumeData';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (
  resumeData: ResumeData, 
  elementId: string,
  filename: string = "resume.pdf"
): Promise<string> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Create a canvas from the HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Dimensions for A4 in jsPDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the image dimensions in PDF (preserving aspect ratio)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = pdfWidth;
    const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

    // Scale the image so it uses the full width of the page
    const scaleFactor = pdfHeight / imgHeight; // Use full height if content overflows

    // Adjust the image width and height based on the scale factor
    const scaledImgWidth = imgWidth * scaleFactor;
    const scaledImgHeight = imgHeight * scaleFactor;

    // If the image width is still larger than the PDF width, scale to fit the width as well
    if (scaledImgWidth > pdfWidth) {
      const widthScaleFactor = pdfWidth / scaledImgWidth;
      const finalScaleFactor = Math.min(scaleFactor, widthScaleFactor);
      const finalImgWidth = scaledImgWidth * finalScaleFactor;
      const finalImgHeight = scaledImgHeight * finalScaleFactor;

      // Add the image to the PDF, starting at the top-left corner
      pdf.addImage(imgData, "JPEG", 0, 0, finalImgWidth, finalImgHeight);
    } else {
      // Add the image to the PDF, starting at the top-left corner
      pdf.addImage(imgData, "JPEG", 0, 0, scaledImgWidth, scaledImgHeight);
    }

    // Save the PDF file
    pdf.save(filename);

    // Return data URL for preview
    return pdf.output("datauristring");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

export const previewPDF = async (
  resumeData: ResumeData, 
  elementId: string
): Promise<string> => {
  try {
    const dataUrl = await generatePDF(resumeData, elementId, "preview.pdf");
    return dataUrl;
  } catch (error) {
    console.error("Error generating PDF preview:", error);
    throw error;
  }
};
