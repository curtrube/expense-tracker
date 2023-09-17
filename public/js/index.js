function getCategories() {
  fetch("http://127.0.0.1:3000/categories")
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

getCategories();

const addCategory = document.getElementById("addCategoryForm");
addCategory.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputCategory = document.getElementById("inputCategory");
  console.log(inputCategory.value);
  // const data = Object.fromEntries(new FormData(e.target).entries());
});
