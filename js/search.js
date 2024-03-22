let fromDate = document.getElementById("fromdate");
let toDate = document.getElementById("todate");

let okBtn = document.querySelector(".okBtn");

okBtn.addEventListener("click", () => {
  if (
    (fromDate.value.length > 0 && toDate.value.length > 0) ||
    (fromDate.value.length <= 0 && toDate.value.length <= 0)
  ) {
    alert("send to backend");
  } else {
    alert("fill two date fields");
  }
});

document
  .querySelector(".donwload_search")
  .addEventListener("click", function () {
    // Select the chart container element
    const chartContainer = document.querySelector(".searchEmployeeSection");
    let fileName = "Employee Detail";
    // Use html2canvas to capture the content of the chart container
    html2canvas(chartContainer).then((canvas) => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${fileName}.png`; // Set the download filename

      // Append the link to the document and trigger a click event to download the image
      document.body.appendChild(link);
      link.click();

      // Remove the temporary link from the document
      document.body.removeChild(link);
    });
  });
