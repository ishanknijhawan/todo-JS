//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//event listeners
document.addEventListener("DOMComtentLoaded", getTodo());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterFunction);

//functions
function addTodo(event) {
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("todo-div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveToLocalStorage(todoInput.value);
    //checkmark icon
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //delete icon
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todo to todoList
    todoList.appendChild(todoDiv);
    //empty todoInput
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        console.log(todo.childNodes[0].innerText);
        deleteFromLocalStorage(todo.childNodes[0].innerText);
        todo.classList.add("deleted");
        //transitionend is a special keyword, just like animationend :)
        todo.addEventListener("transitionend", function () {
            item.parentElement.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterFunction(e) {
    let type = e.target.value;
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (type) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    for (i = 0; i < todos.length; i++) {
        const todoDiv = document.createElement("todo-div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todos[i];
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //checkmark icon
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        //delete icon
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append todo to todoList
        todoList.appendChild(todoDiv);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todos2 = [];
    for (i = 0; i < todos.length; i++) {
        if (todos[i] != todo) {
            todos2.push(todos[i]);
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos2));
}
