const checkbox = document.getElementById("complete-toggle");
const statusText = document.getElementById("status");
const statusControl = document.getElementById("status-control");
const card = document.querySelector(".todo-card");

const editBtn = document.getElementById("edit-btn");
const form = document.getElementById("edit-form");
const view = document.getElementById("view-mode");

const title = document.getElementById("title");
const desc = document.getElementById("description");
const priority = document.getElementById("priority");

const editTitle = document.getElementById("edit-title");
const editDesc = document.getElementById("edit-desc");
const editPriority = document.getElementById("edit-priority");
const editDate = document.getElementById("edit-date");

const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

const dueDateEl = document.getElementById("due-date");
const timeRemaining = document.getElementById("time-remaining");
const overdueEl = document.getElementById("overdue");

const indicator = document.querySelector(".priority-indicator");

let dueDate = new Date("2026-03-01T18:00");

// -------- TIME LOGIC --------
function updateTime() {
  if (statusText.textContent === "Done") {
    timeRemaining.textContent = "Completed";
    return;
  }

  const now = new Date();
  const diff = dueDate - now;

  if (diff <= 0) {
    overdueEl.textContent = "Overdue";
    overdueEl.classList.add("overdue");

    const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    timeRemaining.textContent = `Overdue by ${hours} hour(s)`;
    return;
  }

  overdueEl.textContent = "";
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) timeRemaining.textContent = `Due in ${days} days`;
  else if (hours > 0) timeRemaining.textContent = `Due in ${hours} hours`;
  else timeRemaining.textContent = `Due in ${minutes} minutes`;
}

setInterval(updateTime, 60000);
updateTime();

// -------- STATUS SYNC --------
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    statusText.textContent = "Done";
    statusControl.value = "Done";
    card.classList.add("completed");
  } else {
    statusText.textContent = "Pending";
    statusControl.value = "Pending";
    card.classList.remove("completed");
  }
});

statusControl.addEventListener("change", () => {
  statusText.textContent = statusControl.value;

  if (statusControl.value === "Done") {
    checkbox.checked = true;
    card.classList.add("completed");
  } else {
    checkbox.checked = false;
    card.classList.remove("completed");
  }
});

// -------- EDIT MODE --------
editBtn.onclick = () => {
  form.classList.remove("hidden");
  view.classList.add("hidden");

  editTitle.value = title.textContent;
  editDesc.value = desc.textContent;
  editPriority.value = priority.textContent;
};

cancelBtn.onclick = () => {
  form.classList.add("hidden");
  view.classList.remove("hidden");
};

saveBtn.onclick = () => {
  title.textContent = editTitle.value;
  desc.textContent = editDesc.value;
  priority.textContent = editPriority.value;

  updatePriorityUI();

  form.classList.add("hidden");
  view.classList.remove("hidden");
};

// -------- PRIORITY UI --------
function updatePriorityUI() {
  indicator.className = "priority-indicator";

  const value = priority.textContent.toLowerCase();

  indicator.classList.add(value);
}

updatePriorityUI();

// -------- EXPAND / COLLAPSE --------
const expandBtn = document.getElementById("expand-btn");

expandBtn.onclick = () => {
  const expanded = expandBtn.getAttribute("aria-expanded") === "true";

  expandBtn.setAttribute("aria-expanded", !expanded);
  expandBtn.textContent = expanded ? "Expand" : "Collapse";

  desc.style.maxHeight = expanded ? "50px" : "none";
};

// -------- DUE DATE --------
dueDateEl.textContent = dueDate.toDateString();