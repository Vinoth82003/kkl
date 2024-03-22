let all_serac_card = document.querySelectorAll(".serac_card");
let searchBar = document.querySelector(".empSearch");

searchBar.addEventListener("input", () => {
  let value = searchBar.value.trim(); // Trim whitespace from the input value

  all_serac_card.forEach((card) => {
    let id = card.getAttribute("data-id");
    let nameAttribute = card.getAttribute("data-name");

    if (isNaN(value)) {
      // Check if value is not a number
      if (nameAttribute.includes(value)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    } else {
      if (value === id) {
        // Use strict equality comparison to compare numbers
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });
});
