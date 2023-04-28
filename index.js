let btnAddTaskEl = document.querySelector("button");
let taskNameEl = document.querySelector("#content");

let tasks = getTaskFromLocal();
renderTasks(tasks);

btnAddTaskEl.addEventListener("click", function () {
  if (!taskNameEl.value) {
    alert("Please input your task");
    return false;
  }

  let taskId = this.getAttribute("id");
  let tasks = getTaskFromLocal();

  if (taskId == 0 || taskId) {
    tasks[taskId] = { name: taskNameEl.value };
    this.removeAttribute("id");
  } else {
    tasks.push({ name: taskNameEl.value });
  }

  taskNameEl.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
});

//Render
function renderTasks(tasks) {
  let content = "<ul>";

  tasks.forEach((task, index) => {
    content += `<li>
    <div class="task-name">${task.name}</div>
    <a href="#" onclick="editTask(${index})">Edit</a>
    <a href="#" onclick="deleteTask(${index}) ">Delete</a>
  </li>`;
  });

  content += "</ul>";

  document.querySelector("#result").innerHTML = content;
}

//Fix
function editTask(id) {
  let tasks = getTaskFromLocal();
  if (tasks.length > 0) {
    taskNameEl.value = tasks[id].name;
    btnAddTaskEl.setAttribute("id", id);
  }
}

//Delete
function deleteTask(id) {
  if (confirm("You sure ?")) {
    alert("Do it");
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(getTaskFromLocal());
  }
}
function getTaskFromLocal() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
