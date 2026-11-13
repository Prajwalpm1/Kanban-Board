let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let tasks = document.querySelectorAll(".task");
let columns = [todo, progress, done];

let dragElement = null;

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = task;
  });
});

function addDragEventOnColumn(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
  });

  columns.forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    count.innerText = tasks.length;
  })
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

// modal related logic

let modal = document.querySelector(".modal");
let modalBg = document.querySelector(".modal .bg");
let toggleModalBtn = document.querySelector("#toggle-modal");
let addTaskbtn = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskbtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDecs = document.querySelector("#task-decs-input").value;
  console.log(taskTitle,taskDecs);
  

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDecs}</p>
    <button>Delete</button>
    
    `

    
    todo.appendChild(div)

//     columns.forEach(col => {
//     const tasks = col.querySelectorAll(".task");
//     const count = col.querySelector(".right");

//     count.innerText = tasks.length;
    
    
//   })
    
    div.addEventListener("drag", (e) => {
      
        dragElement = div;
      });
    
    modal.classList.remove('active')
});
