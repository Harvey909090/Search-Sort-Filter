var table = document.getElementById('mydatatable');
var input = document.getElementById('myinput');
var tableData = [{name: 'Broccoli', quantity: 20, price: 2, expiry: '2023-04-01'}, {name: 'Tomatoes', quantity: 40, price: 3, expiry: '2023-04-02'}, {name: 'Avocado', quantity: 12, price: 2, expiry: '2023-04-03'}, {name: 'Blueberries', quantity: 90, price: 8, expiry: '2023-04-04'}, {name: 'Banana', quantity: 60, price: 7, expiry: '2023-04-05'}, {name: 'Cherries', quantity: 90, price: 8, expiry: '2023-04-05'}, {name: 'Sweet Potatoes', quantity: 70, price: 10, expiry: '2023-04-06'}, {name: 'Sweet Red Peppers', quantity: 80, price: 9, expiry: '2023-04-07'}, {name: 'Raspberries', quantity: 9, price: 3, expiry: '2023-04-08'}, {name: 'Oranges', quantity: 7, price: 4, expiry: '2023-04-09'}, {name: 'Cassava', quantity: 18, price: 16, expiry: '2023-04-10'}];
var caretUpClassName = 'fa fa-caret-up';
var caretDownClassName = 'fa fa-caret-down';

const sort_data_by = (field, undo, value) => {

  const key = value ?
    function(x) {
      return value(x[field]);
    } :
    function(x) {
      return x[field];
    };

  undo = !undo ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), undo * ((a > b) - (b > a));
  };
};


function backArrow() {
  let carets = document.getElementsByClassName('caret');
  for (let caret of carets) {
    caret.className = "caret";
  }
}


function switchArrow(event) {
  let element = event.target;
  let caret, field, undo;
  if (element.tagName === 'SPAN') {
    caret = element.getElementsByClassName('caret')[0];
    field = element.id
  }
  else {
    caret = element;
    field = element.parentElement.id
  }

  let iconClassName = caret.className;
  backArrow();
  if (iconClassName.includes(caretUpClassName)) {
    caret.className = `caret ${caretDownClassName}`;
    undo = false;
  } else {
    undo = true;
    caret.className = `caret ${caretUpClassName}`;
  }

  tableData.sort(sort_data_by(field, undo));
  fillTable();
}


function fillTable() {
  table.innerHTML = '';
  for (let data of tableData) {
    let row = table.insertRow(-1);
    let name = row.insertCell(0);
    name.innerHTML = data.name;

    let quantity = row.insertCell(1);
    quantity.innerHTML = data.quantity;

    let price = row.insertCell(2);
    price.innerHTML = data.price;

    let expiry = row.insertCell(3);
    expiry.innerHTML = data.expiry;
  }

  filter_data_Table();
}


function filter_data_Table() {
  let filter = input.value.toUpperCase();
  rows = table.getElementsByTagName("TR");
  let flag = false;

  for (let row of rows) {
    let cells = row.getElementsByTagName("TD");
    for (let cell of cells) {
      if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
        if (filter) {
          cell.style.backgroundColor = 'green';
        } else {
          cell.style.backgroundColor = '';
        }

        flag = true;
      } else {
        cell.style.backgroundColor = '';
      }
    }

    if (flag) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

    flag = false;
  }
}


fillTable();

let tableColumns = document.getElementsByClassName('table-column');

for (let column of tableColumns) {
  column.addEventListener('click', function(event) {
    switchArrow(event);
  });
}

input.addEventListener('keyup', function(event) {
  filter_data_Table();
});