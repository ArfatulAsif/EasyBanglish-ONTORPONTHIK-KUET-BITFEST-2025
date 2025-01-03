import { saveAs } from "file-saver";
export const generatePDF = async (content) => {
  try {
    const element = content;

    // Create a temporary div to hold the styled HTML
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.width = element.offsetWidth + "px";
    tempDiv.style.height = element.offsetHeight + "px";
    tempDiv.innerHTML = element.innerHTML;

    document.body.appendChild(tempDiv);

    // Use the browser's print functionality
    const printWindow = window.open(
      "",
      "",
      "width=" + tempDiv.offsetWidth + ",height=" + tempDiv.offsetHeight
    );
    printWindow.document.write(
      "<html><head><title>PDF</title></head><body>" +
        tempDiv.innerHTML +
        "</body></html>"
    );
    printWindow.document.close();
    printWindow.focus();
    await printWindow.print();

    // Create a Blob from the printed content
    const blob = await new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(
        "<html><head><title>PDF</title></head><body>" +
          tempDiv.innerHTML +
          "</body></html>"
      );
      iframe.contentDocument.close();
      iframe.onload = () => {
        const blob = new Blob(
          [iframe.contentDocument.documentElement.outerHTML],
          { type: "application/pdf" }
        );
        document.body.removeChild(iframe);
        resolve(blob);
      };
    });

    // Save the Blob as a PDF file
    saveAs(blob, "download.pdf");

    // Remove the temporary div
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
