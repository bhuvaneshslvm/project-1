const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const allFilter = document.getElementById("allFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");

allFilter.addEventListener("click", () => filterTasks("all"));
activeFilter.addEventListener("click", () => filterTasks("active"));
completedFilter.addEventListener("click", () => filterTasks("completed"));

function filterTasks(filter) {
  document.querySelectorAll("#taskList li").forEach(li => {
    switch (filter) {
      case "all":
        li.style.display = "flex";
        break;
      case "active":
        if (li.classList.contains("completed")) {
          li.style.display = "none";
        } else {
          li.style.display = "flex";
        }
        break;
      case "completed":
        if (li.classList.contains("completed")) {
          li.style.display = "flex";
        } else {
          li.style.display = "none";
        }
        break;
    }
  });
}

const priorityInput = document.getElementById("priorityInput");

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  if (text !== "") {
    addTask(text, false, dueDate, priority);
    saveTasks();
    taskInput.value = "";
    dueDateInput.value = "";
  }
});

function addTask(text, completed = false, dueDate = null, priority = "low") {
  const li = document.createElement("li");
  li.classList.add(priority);
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.background = "none";
  delBtn.style.border = "none";
  delBtn.style.cursor = "pointer";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.style.background = "none";
  editBtn.style.border = "none";
  editBtn.style.cursor = "pointer";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const textSpan = li.querySelector("span");
    const newText = prompt("Edit task:", textSpan.textContent);
    if (newText !== null) {
      textSpan.textContent = newText;
      saveTasks();
    }
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  const dueDateSpan = document.createElement("span");
  dueDateSpan.textContent = dueDate ? ` (Due: ${dueDate})` : "";
  dueDateSpan.classList.add("due-date");

  li.appendChild(textSpan);
  li.appendChild(dueDateSpan);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
      dueDate: li.querySelector(".due-date").textContent.replace(" (Due: ", "").replace(")", ""),
      priority: li.classList.contains("high") ? "high" : li.classList.contains("medium") ? "medium" : "low"
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => addTask(task.text, task.completed, task.dueDate, task.priority));
};
