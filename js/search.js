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
