let all_serac_card = document.querySelectorAll(".serac_card");
let searchBar = document.querySelector(".empSearch");

searchBar.addEventListener("input", () => {
  let value = searchBar.value;

  all_serac_card.forEach((card) => {
    let id = card.getAttribute("data-id");
    console.log(id);
    if (value == id) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
