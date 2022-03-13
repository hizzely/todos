class MyTodo extends HTMLElement {
  constructor() {
    super()
    this.dom = this.attachShadow({ mode: 'closed' })
    this.STORAGE_KEY = 'mytodos'
    this.todos = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []

    const taskInput = document.createElement('input')
    taskInput.name = 'task'
    taskInput.placeholder = 'Wanna do something?'
    taskInput.required = true
    this.dom.appendChild(taskInput)

    const addBtn = document.createElement('button')
    addBtn.type = 'submit'
    addBtn.textContent = 'Add'
    this.dom.appendChild(addBtn)

    const label = document.createElement('p')
    label.textContent = 'My List:'
    this.dom.appendChild(label)

    const ul = document.createElement('ul')
    ul.id = 'todos'
    this.dom.appendChild(ul)

    this.renderTodos()
  }

  renderTodos() {
    if (!this.todos) return
  
    const todosEl = this.dom.querySelector('#todos')
    todosEl.innerHTML = ''
  
    this.todos.forEach((todo, idx) => {
      const list = document.createElement('li')
      list.id = idx
      list.textContent = todo.task
      list.style.cursor = 'pointer'
      list.style.textDecoration = todo.completed ? 'line-through' : 'none'
      list.addEventListener('click', (e) => this.onTodoClicked(idx))
      todosEl.appendChild(list)
    })
  }

  onTodoClicked(idx) {
    if (this.todos[idx].completed)
      this.todos.splice(idx, 1)
    else
      this.todos[idx].completed = true
  
    this.onTodosModified()
  }

  onTodosModified() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos))
    this.renderTodos()
  }

  handleAddTodo() {
    const taskInput = this.dom.querySelector('input[name="task"]')
    const task = taskInput.value

    if (! task) alert('Task required')

    this.todos = [...this.todos, {
      task: task,
      completed: false
    }]

    this.onTodosModified()

    taskInput.value = null
  }

  connectedCallback() {
    this.dom
      .querySelector('button[type="submit"]')
      .addEventListener('click', () => this.handleAddTodo())
  }

  disconnectedCallback() {
    this.dom
      .querySelector('button[type="submit"]')
      .removeEventListener('click', () => this.handleAddTodo())
  }
}

customElements.define('my-todo', MyTodo)
 