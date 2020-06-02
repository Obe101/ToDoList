var ToDoList = (function () {
    function ToDoList() {
    }
    return ToDoList;
}());
window.onload = function () {
    var addbtn = getInputById("addBtn");
    addbtn.onclick = addTask;
    loadSavedTasks();
};
function addTask() {
    clearErrors();
    if (isValid()) {
        var task = getToDoTask();
        displayToDoList(task);
        saveToDo(task);
        clearBoxes();
    }
}
function isValid() {
    var valid = true;
    var title = getInputById("title").value;
    if (title == "") {
        valid = false;
        addErrorMsg("You must include a title.");
    }
    var currDate = new Date();
    var dateString = getInputById("date").value;
    var dueDate = new Date(dateString);
    console.log(dueDate);
    console.log(dateString);
    if (compareDate(dueDate, currDate) <= 0) {
        valid = false;
        addErrorMsg("You must choose a future due date.");
    }
    var importances = document.getElementById("importance").value;
    if (importances == "0") {
        valid = false;
        addErrorMsg("Please select how soon task must be completed.");
    }
    return valid;
}
function getToDoTask() {
    var task = new ToDoList();
    var taskTitle = getInputById("title").value;
    task.title = taskTitle;
    var taskImportance = document.getElementById("importance").value;
    task.importance = taskImportance;
    var taskDueDate = getInputById("date").value;
    task.dueDate = new Date(taskDueDate);
    var completed = getInputById("complete");
    task.isCompleted = completed.checked;
    var taskNotes = getInputById("notes").value;
    task.notes = taskNotes;
    return task;
}
function displayToDoList(task) {
    var titleHeader = document.createElement("h3");
    titleHeader.innerText = task.title;
    var taskDate = document.createElement("p");
    var dueDate = new Date(task.dueDate.toString());
    taskDate.innerText = dueDate.toDateString();
    var taskNotes = document.createElement("p");
    taskNotes.innerText = task.notes;
    var taskDiv = document.createElement("div");
    taskDiv.onclick = markAsComplete;
    taskDiv.classList.add("todo");
    var element = document.getElementById("importance");
    if (task.isCompleted) {
        taskDiv.classList.add("completed");
    }
    else {
        if (element.selectedIndex == 1) {
            taskDiv.classList.add("wait");
        }
        else if (element.selectedIndex == 2) {
            taskDiv.classList.add("soon");
        }
        else if (element.selectedIndex == 3) {
            taskDiv.classList.add("asap");
        }
    }
    taskDiv.appendChild(titleHeader);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(taskNotes);
    if (task.isCompleted) {
        var completedToDos = document.getElementById("completed-items");
        completedToDos.appendChild(taskDiv);
    }
    else {
        var incompletedToDos = document.getElementById("incompleted-items");
        incompletedToDos.appendChild(taskDiv);
    }
}
function getInputById(id) {
    return document.getElementById(id);
}
function compareDate(date1, date2) {
    var d1 = date1;
    var d2 = date2;
    var same = d1.getTime() === d2.getTime();
    if (same)
        return 0;
    if (d1 > d2)
        return 1;
    if (d1 < d2)
        return -1;
}
function markAsComplete() {
    var taskDiv = this;
    taskDiv.classList.add("completed");
    var completedItems = document.getElementById("completed-items");
    completedItems.appendChild(taskDiv);
}
function addErrorMsg(errMsg) {
    var errSummary = document.getElementById("validation-summary");
    var errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function saveToDo(task) {
    var currTasks = getToDoTasks();
    if (currTasks == null) {
        currTasks = new Array();
    }
    currTasks.push(task);
    var currTasksString = JSON.stringify(currTasks);
    localStorage.setItem(todokey, currTasksString);
}
var todokey = "todo";
function getToDoTasks() {
    var taskString = localStorage.getItem(todokey);
    var task = JSON.parse(taskString);
    return task;
}
function loadSavedTasks() {
    var taskArray = getToDoTasks();
    for (var i = 0; i < taskArray.length; i++) {
        var currTasks = taskArray[i];
        displayToDoList(currTasks);
    }
}
function clearErrors() {
    var errSummary = document.getElementById("validation-summary");
    errSummary.innerText = "";
}
function clearBoxes() {
    var title = getInputById("title");
    title.value = "";
    var select = document.getElementById("importance");
    select.selectedIndex = 0;
    var dueDate = getInputById("Date");
    dueDate.value = new Date().toDateString();
    var completed = getInputById("complete");
    completed.checked = false;
    var notes = document.getElementById("notes");
    notes.value = "";
}
