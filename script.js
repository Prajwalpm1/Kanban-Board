let taskData = {}

let todo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let tasks = document.querySelectorAll(".task");
let modal = document.querySelector(".modal");
let columns = [todo, progress, done];
let dragElement = null;

// ADDED: touch (phone) dragging, so tasks can be moved with a finger
function addTouchEvents(task) {
  let moved = false;

  task.addEventListener("touchstart", () => {
    dragElement = task;
    moved = false;
  });

  task.addEventListener("touchmove", (e) => {
    e.preventDefault(); 
    moved = true;
    task.style.opacity = "0.5";

    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const col = el ? el.closest(".task-column") : null;

    columns.forEach(c => c.classList.remove("hover-over"));
    if (col) col.classList.add("hover-over");
  }, { passive: false });

  task.addEventListener("touchend", (e) => {
    task.style.opacity = "";
    columns.forEach(c => c.classList.remove("hover-over"));

    if (!moved) return; 
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const col = el ? el.closest(".task-column") : null;

    if (col) {
      col.appendChild(task);
      updateTaskCount();
    }
  });
}

function addTask(title, description, column) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <button>Delete</button>
  `;

  column.appendChild(div);

  div.addEventListener("drag", (e) => {
    dragElement = div;
  });

  addTouchEvents(div); 

  const deleteBtn = div.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    div.remove();
    updateTaskCount();
    modal.classList.remove("active");
  });

  return div;
  
}

function updateTaskCount() {
  columns.forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    taskData[col.id] = Array.from(tasks).map(t => {
      return {
        title: t.querySelector("h2").innerText,
        description: t.querySelector("p").innerText
      }

    })

    localStorage.setItem("tasks",JSON.stringify(taskData))

    count.innerText = tasks.length;
    
    
  })
}

if(localStorage.getItem('tasks')){
   const data = JSON.parse(localStorage.getItem('tasks'));

   for(const col in data){
    const column = document.querySelector(`#${col}`)
    data[col].forEach(task =>{
      addTask(task.title, task.description, column)
    })

       updateTaskCount();

   }
}

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = task;
  });
  addTouchEvents(task); 
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

    updateTaskCount();
   
  });

}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

// modal related logic

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

  
  if (taskTitle.trim() === "" || taskDecs.trim() === "") {
    alert("Title and description are both required");
    return;
  }
  
  addTask(taskTitle, taskDecs, todo);

  updateTaskCount();

  

  modal.classList.remove('active')

 
  document.querySelector("#task-title-input").value = "";
  document.querySelector("#task-decs-input").value = "";

});