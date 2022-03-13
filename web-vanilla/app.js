const STORAGE_KEY = 'mytodos'
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

function renderTodos() {
  if (!todos) return

  const todosEl = document.querySelector('#todos')
  todosEl.innerHTML = ''

  todos.forEach((todo, idx) => {
    const list = document.createElement('li')
    list.id = idx
    list.textContent = todo.task
    list.style.cursor = 'pointer'
    list.style.textDecoration = todo.completed ? 'line-through' : 'none'
    list.addEventListener('click', onTodoClicked)
    todosEl.appendChild(list)
  })
}

function onTodoClicked(event) {
  const idx = event.target.id

  if (todos[idx].completed)
    todos.splice(idx, 1)
  else
    todos[idx].completed = true

  onTodosModified()
}

function onTodosModified() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  renderTodos()
}

function onFormSubmit(event) {
  event.preventDefault()

  todos = [...todos, {
    task: event.target[0].value,
    completed: false
  }]

  onTodosModified()

  event.target.reset()
}

// On page loaded but still loading other resources
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', onFormSubmit)
  renderTodos()
})
