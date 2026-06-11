import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

const userSelect = document.getElementById("user-select");
const results = document.getElementById("results");

function populateDropdown() {
  getUserIDs().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

userSelect.addEventListener("change", (event) => {
  const userId = event.target.value;
  if (userId) {
    console.log("Selected user:", userId);
  } else {
    results.innerHTML = "";
  }
});

populateDropdown();
