// Універсальна функція для отримання елемента за селектором
const getS = (selector) => document.querySelector(selector);

// --- ФУНКЦІОНАЛ РЕДАГУВАННЯ --- //
getS(".btn-edit").onclick = function () {
  // Показуємо блок редагування
  getS(".edit-block").classList.add("show");
  // Ховаємо блок стилів
  getS(".style-block").classList.remove("show");
  // Копіюємо поточний вміст у текстову область
  getS(".edit-area").value = getS(".top-block").innerHTML;
};

getS(".btn-save").onclick = function () {
  // Зберігаємо текст із текстової області до головного блоку
  getS(".top-block").innerHTML = getS(".edit-area").value;
  // Ховаємо блок редагування
  getS(".edit-block").classList.remove("show");
};

// --- ФУНКЦІОНАЛ СТИЛІВ --- //
getS(".btn-style").addEventListener("click", () => {
  // Показуємо блок стилів
  getS(".style-block").classList.add("show");
  // Ховаємо блок редагування
  getS(".edit-block").classList.remove("show");
});

// Зміна розміру шрифту
function fontSize(event) {
  getS(".top-block").style.fontSize = event.target.value;
}

// Зміна шрифту
let fF = document.getElementById("fontFamily");
fF.onchange = function () {
  getS(".top-block").style.fontFamily = this.value;
};

// --- НАЛАШТУВАННЯ КОЛЬОРІВ --- //
let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "gray",
  "black",
  "white",
  "deeppink",
];

function updateColors(action) {
  const colorBoxes = getS(".colors").children;
  for (let i = 0; i < colorBoxes.length; i++) {
    const colorBox = colorBoxes[i];
    colorBox.style.backgroundColor = colors[i];
    colorBox.onclick = function () {
      if (action === "text") {
        getS(".top-block").style.color = this.style.backgroundColor;
      } else if (action === "background") {
        getS(".top-block").style.backgroundColor = this.style.backgroundColor;
      }
      getS(".colors").classList.add("hide");
    };
  }
}

getS(".btn-text-color").onclick = function () {
  getS(".colors").classList.remove("hide");
  updateColors("text");
};

getS(".btn-bg-color").onclick = function () {
  getS(".colors").classList.remove("hide");
  updateColors("background");
};

// --- ЖИРНИЙ ТА КУРСИВ --- //
function fontWeight(event) {
  if (event.target.checked) {
    getS(".top-block").classList.add("bold");
  } else {
    getS(".top-block").classList.remove("bold");
  }
}

function fontStyle(event) {
  if (event.target.checked) {
    getS(".top-block").style.fontStyle = "italic";
  } else {
    getS(".top-block").style.fontStyle = "normal";
  }
}

// --- СТВОРЕННЯ СПИСКУ --- //
getS(".btn-create-list").onclick = function () {
  const listForm = document.forms["form-list"];
  const countLi = parseInt(listForm.count.value) || 0;
  const typeLi = listForm.type.value;

  let listHTML = `<ul style="list-style-type:${typeLi}">`;
  for (let i = 0; i < countLi; i++) {
    listHTML += `<li>Item ${i + 1}</li>`;
  }
  listHTML += `</ul>`;

  getS(".edit-area").value += listHTML;
  getS(".first").classList.add("show");
  getS(".second").classList.remove("show");
};

// --- СТВОРЕННЯ ТАБЛИЦІ --- //
getS(".btn-create-table").onclick = function () {
  const tableForm = document.forms["form-table"];

  const countTr = parseInt(tableForm["count-tr"].value) || 0;
  const countTd = parseInt(tableForm["count-td"].value) || 0;

  // Автоматичне додавання "px"
  const tdWidth = tableForm["width"].value
    ? `${tableForm["width"].value}px`
    : "100px";
  const tdHeight = tableForm["height"].value
    ? `${tableForm["height"].value}px`
    : "30px";
  const borderWidth = tableForm["border-width"].value
    ? `${tableForm["border-width"].value}px`
    : "1px";

  // Виправлення для кольору
  const borderColor = tableForm["border-color"].value;
  console.log("Border Color: ", borderColor); // Додатковий лог для перевірки

  let tableHTML = `<table style="border-collapse: collapse;">`;
  for (let i = 0; i < countTr; i++) {
    tableHTML += `<tr>`;
    for (let j = 0; j < countTd; j++) {
      tableHTML += `
        <td style="
          width: ${tdWidth};
          height: ${tdHeight};
          border: ${borderWidth} solid ${borderColor};
        ">TD</td>`;
    }
    tableHTML += `</tr>`;
  }
  tableHTML += `</table>`;

  getS(".edit-area").value += tableHTML; // Додаємо таблицю в textarea
  getS(".first").classList.add("show");
  getS(".second").classList.remove("show");
};

// --- ПЕРЕМИКАННЯ БЛОКІВ --- //
document.addEventListener("DOMContentLoaded", function () {
  getS(".btn-add").onclick = function () {
    getS(".first").classList.remove("show");
    getS(".second").classList.add("show");
  };
});

// --- ПЕРЕМИКАННЯ МІЖ БЛОКАМИ --- //
document.addEventListener("DOMContentLoaded", function () {
  const chooseTable = getS("#choose-table");
  const chooseList = getS("#choose-list");
  const createTableBlock = getS(".create-table");
  const createListBlock = getS(".create-list");

  function toggleCreateBlock() {
    if (chooseTable.checked) {
      createTableBlock.classList.remove("hide");
      createListBlock.classList.add("hide");
    } else if (chooseList.checked) {
      createListBlock.classList.remove("hide");
      createTableBlock.classList.add("hide");
    }
  }

  chooseTable.addEventListener("change", toggleCreateBlock);
  chooseList.addEventListener("change", toggleCreateBlock);
  toggleCreateBlock();
});
