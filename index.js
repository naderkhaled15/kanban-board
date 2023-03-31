/*

*/
let addTasks = document.querySelectorAll(".add");
const POP_SCREEN = document.querySelector(".popUp");
const ADD_BTN = document.querySelector(".save-btn");
const NOT_STARTED = 1;
const IN_PROGRESS = 2;
const COMPLETED = 3;
let popInput = document.querySelector(".pop-inpt");
let inpt;
let boxs = document.querySelectorAll(".column");
let dragged = null;
let columns = [
  { id: NOT_STARTED, tasks: [] },
  { id: IN_PROGRESS, tasks: [] },
  { id: COMPLETED, tasks: [] },
];

function chooseColumn(x, val) {
  boxs[x].innerHTML += `    
  <div class="task-element">
  <div class="todos" draggable="true">
  <div class="content">
  <input type="text" name="text" class="todo" value="${val}" readonly>
  </div>
  <div class="action">
  <button class="close"><ion-icon name="close-outline"></ion-icon></button>
  <button class="edit"><ion-icon name="create-outline"></ion-icon></button>
  <button class="check"><ion-icon name="checkmark-circle-outline"></ion-icon></button>
  
  </div>
  </div>
  </div>`;
}

addTasks.forEach((add) => {
  add.addEventListener("click", pushTask);
});

// push tasks inside columns
function pushTask() {
  inpt = prompt("enter your value");
  if (!inpt) {
    alert(`you must add taks (no tasks added)`);
    return;
  } else {
    let randomId = Math.floor(Math.random() * 1000000);
    switch (this.id) {
      case "not-started":
        tasksArray = columns.find((item) => item.id == NOT_STARTED);
        tasksArray.tasks.push({ id: randomId, task: inpt });
        chooseColumn(0, inpt);
        console.log(tasksArray.tasks);
        break;
      case "in-progress":
        tasksArray = columns.find((item) => item.id == IN_PROGRESS);
        tasksArray.tasks.push({ id: randomId, task: inpt });
        chooseColumn(1, inpt);
        console.log(tasksArray.tasks);
        break;
      case "completed":
        tasksArray = columns.find((item) => item.id == COMPLETED);
        tasksArray.tasks.push({ id: randomId, task: inpt });
        chooseColumn(2, inpt);
        console.log(tasksArray.tasks);
        break;
    }
  }
  dragItem();
  deleteItem();
  editItem();
}
//drag and drop
function dragItem() {
  let firstPosition = "";
  let lastPosition = "";
  let tasks = document.querySelectorAll(".todos");

  tasks.forEach((task) => {
    task.addEventListener("dragstart", function () {
      task.style.opacity = "0.5";
      dragged = task;
    });

    task.addEventListener("dragend", function () {
      task.style.opacity = "1";
      dragged = null;
    });
  });

  boxs.forEach((box) => {
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
      box.style.background = "#00edc1";
    });

    box.addEventListener("dragleave", function () {
      box.style.background = "#1ba98f";
    });

    box.addEventListener("drop", function () {
      box.append(dragged);
      box.style.background = "#1ba98f";
    });
  });
}

// deleting items
function deleteItem() {
  let removeBtn = document.querySelectorAll(".close");
  removeBtn.forEach((dlt) =>
    dlt.addEventListener("click", function () {
      dlt.parentElement.parentElement.remove();
    })
  );
}

// editing items
function editItem() {
  let editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((edit) =>
    edit.addEventListener("click", function () {
      let inpt =
        edit.parentElement.parentElement.firstElementChild.firstElementChild;
      inpt.removeAttribute("readonly");
      inpt.value = "";
      inpt.focus();
    })
  );
}
