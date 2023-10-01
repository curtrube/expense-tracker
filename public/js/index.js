const url = "http://127.0.0.1:3000/categories";

function getCategories() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => createTable(data));
}

function createTable(data) {
  const root = document.getElementById("root");
  const table = document.createElement("table");
  table.classList.add("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.innerHTML = "Name";
  tr.appendChild(th);
  thead.appendChild(tr);
  table.appendChild(thead);
  data.forEach((element) => {
    const row = document.createElement("tr");
    const rowData = document.createElement("td");
    rowData.setAttribute("id", element.category_id);
    rowData.innerHTML = element.name;
    row.appendChild(rowData);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  root.appendChild(table);
}

const addCategory = document.getElementById("addCategoryForm");
addCategory.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputCategory = document.getElementById("inputCategory");
  console.log(inputCategory.value);
  postCategory(url, inputCategory.value);
  // const data = Object.fromEntries(new FormData(e.target).entries());
});

function postCategory(url, data) {
  // check for null or undefined before posting
  // should also do additional data validation/scrubbing
  const item = { name: data };
  console.log(`item: ${item}`);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  // return response.json();
}
