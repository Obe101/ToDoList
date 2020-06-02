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
    loadSavedTasks();
}

function addTask() {
    clearErrors();
    if (isValid()) {
        let task = getToDoTask();
        displayToDoList(task);
        saveToDo(task);
        clearBoxes();
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

    let dueDate = new Date(task.dueDate.toString())
    taskDate.innerText = dueDate.toDateString();

    let taskNotes = document.createElement("p");
    taskNotes.innerText = task.notes;

    let taskDiv = document.createElement("div");
    taskDiv.onclick = markAsComplete;
    taskDiv.classList.add("todo");

    let element = <HTMLSelectElement>document.getElementById("importance");
    if (task.isCompleted) {
        taskDiv.classList.add("completed");
        
    }else{

         if (element.selectedIndex == 1 ) {
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

//Store todoitem in web storage

function saveToDo(task:ToDoList): void {
   let currTasks = getToDoTasks();
   
   if (currTasks == null) {// no task found
       currTasks = new Array()
    }
    currTasks.push(task);
   let currTasksString = JSON.stringify(currTasks);
   localStorage.setItem(todokey, currTasksString)
}
const todokey = "todo";

//** Get stored todo tasks or return null if none is found**/
function getToDoTasks(): ToDoList[] {
    let taskString = localStorage.getItem(todokey);
    let task:ToDoList[] = JSON.parse(taskString);
    return task;
}

function loadSavedTasks() {
    let taskArray = getToDoTasks();
    for (let i = 0; i < taskArray.length; i++) {
        let currTasks = taskArray[i];
        displayToDoList(currTasks)
    }
}
function clearErrors() {
    let errSummary = document.getElementById("validation-summary");
     errSummary.innerText = "";
}
function clearBoxes() {
 let title = document.getElementById("title");
 title.innerText = "";
 
 let select = <HTMLSelectElement>document.getElementById("importance")
 select.selectedIndex = 0;

 let dueDate = document.getElementById("Date");
 dueDate.innerText = "";

 let completed = getInputById("complete");
 completed.checked = false;

 let notes = document.getElementById("notes");
 notes.innerText = "";
}