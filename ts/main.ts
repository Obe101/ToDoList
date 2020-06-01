class ToDoList{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
    notes:string;
    importance:string;
}
window.onload = function () {
    let addbtn = <HTMLElement>getInputById("addBtn");
    addbtn.onclick = addTask;
}

function addTask() {
    clearErrors();
    if (isValid()) {
        let task = getToDoTask();
        displayToDoList(task);
    }
}
function isValid():boolean{

    let valid = true;

    let title = getInputById("title").value
    if (title == "") {
        valid = false;
        addErrorMsg("You must include a title.");
        
    }
    let currDate = new Date();
    let dateString =  getInputById("date").value;
    let dueDate = new Date(dateString);
    if (compareDate(dueDate, currDate) <= 0 ){
        valid = false;
        addErrorMsg("You must choose a future due date.");
        
    }
    let importances = (<HTMLOptionElement>document.getElementById("importance")).value;
    if (importances == "0") {
        valid = false;
        addErrorMsg("Please select how soon task must be completed.")
    }
    
    return valid;
}

function getToDoTask():ToDoList {
    let task = new ToDoList();

    let taskTitle = getInputById("title").value;
     task.title = taskTitle;

    let taskImportance = (<HTMLOptionElement>document.getElementById("importance")).value;
    task.importance = taskImportance;

    let taskDueDate = getInputById("date").value;
    task.dueDate = new Date(taskDueDate);

    let completed = getInputById("complete");
    task.isCompleted = completed.checked;

    let taskNotes = getInputById("notes").value;
    task.notes = taskNotes; 

    return task;
}

function displayToDoList(task:ToDoList):void {

    let titleHeader = document.createElement("h3");
    titleHeader.innerText = task.title;

    let taskDate = document.createElement("p");
    taskDate.innerText = task.dueDate.toDateString();

    let taskNotes = document.createElement("p");
    taskNotes.innerText = task.notes;

    let taskDiv = document.createElement("div");
    taskDiv.onclick = markAsComplete;
    taskDiv.classList.add("todo");
    if (task.isCompleted) {
        taskDiv.classList.add("completed");
        
    }

    taskDiv.appendChild(titleHeader);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(taskNotes);
    
    if (task.isCompleted ) {
        let completedToDos = document.getElementById("completed-items");
        completedToDos.appendChild(taskDiv);
    } else {
        let incompletedToDos = document.getElementById("incompleted-items");
        incompletedToDos.appendChild(taskDiv)    
    }
}

function getInputById(id:string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function compareDate(date1: Date, date2: Date): number
{
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  let d1 = date1; let d2 = date2;

  // Check if the dates are equal
  let same = d1.getTime() === d2.getTime();
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;
 
  // Check if the first is less than second
  if (d1 < d2) return -1;
}

function markAsComplete() {
    let taskDiv = <HTMLElement>this;
    taskDiv.classList.add("completed");

    let completedItems = document.getElementById("completed-items");
    completedItems.appendChild(taskDiv);

}
function addErrorMsg(errMsg:string) {
    let errSummary = document.getElementById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}



function clearErrors() {
    let errSummary = document.getElementById("validation-summary");
     errSummary.innerText = "";
}