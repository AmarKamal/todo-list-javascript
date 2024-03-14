let toDoInput; // place where the user inputs the task content
let errorInfo; // information about the lack of tasks / the necessity of entering text
let addBtn; // ADD button - adds new items to the list
let ulList; // task list, UL element
let newToDo; // newly added li element, representing a new task

let popup; // popup
let popupInfo; // text in the popup, such as adding text
let todoToEdit; // edited Todo
let popupInput; // input field in the popup
let popupAddBtn; // 'accept' button in the popup
let popupCloseBtn; // 'cancel' button in the popup

const main = () => {
    // Calls our functions
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    // Retrieves all elements
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    // Sets up event listeners
    addBtn.addEventListener('click', addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
    // Creates a new to-do
    if (toDoInput.value != '') {
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        // Adds tools (buttons) to our to-do
        createToolAreal();
        // Adds our to-do to the ul list
        ulList.append(newToDo);
        
        // Clears error message and input after adding the to-do
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter task content!';
    }
}

const createToolAreal = () => {
    // Creates elements (buttons) and adds them to the to-do
    const div = document.createElement('div');
    div.classList.add('tools');
    // Adds our tools to the new to-do
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    // Adds elements together
    div.append(buttonDone, buttonEdit, buttonCancel);
}

// Function to check what was clicked (to mark task as done, delete, or edit)
const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        editToDo(e);

    } else if (e.target.matches('.delete')) {
        deleteToDo(e);

    }
}

// Functions responsible for the popup
const editToDo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

// Function to apply changes from input field to the to-do item
const changeTodoText = () => {
    if (popupInput.value != '') {
        todoToEdit.firstChild.textContent = popupInput.value;

        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        popupInfo.textContent = 'You must provide some text!';
    }
}

const deleteToDo = (e) => {
    e.target.closest('li').remove();

    // Displays a message when there are no more tasks
    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'No tasks on the list.'
    }
}

// Executes adding a to-do on Enter key press
const enterKeyCheck = (e) => {
    if (e.key == 'Enter') {
        addNewToDo();
    }
}

// Executes when the page content is loaded
document.addEventListener('DOMContentLoaded', main);
