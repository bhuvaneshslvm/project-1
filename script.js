const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => addTask(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    addTask(text);
    saveTasks();
    taskInput.value = "";
  }
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
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

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
