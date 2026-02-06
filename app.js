const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

let todos = [];

function render() {
  list.innerHTML = "";
  todos.forEach((t, idx) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = t.text;

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "8px";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = t.done ? "Undo" : "Done";
    toggleBtn.onclick = () => {
      todos[idx].done = !todos[idx].done;
      render();
    };

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      todos.splice(idx, 1);
      render();
    };

    actions.append(toggleBtn, delBtn);
    li.append(text, actions);
    list.appendChild(li);
  });

  count.textContent = `${todos.length} item${todos.length === 1 ? "" : "s"}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({ text, done: false });
  input.value = "";
  render();
});

clearBtn.onclick = () => {
  todos = [];
  render();
};

render();
