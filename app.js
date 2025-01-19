//store tasks in array
let tasks = [];
//check if all inputs filled in properly before adding task
function checkInputs()
{
    //get info from table input
    const taskName = document.getElementById("taskName").value;
    const urgency = document.getElementById("urgencyDropdown").value;
    const importance = document.getElementById("importanceDropdown").value;
    const difficulty = document.getElementById("difficultyDropdown").value;
    const dueDate = document.getElementById("dueDate").value;

    //once all inputs in a row filled, call addTask
    //&& is for multiple conditions
    //have to check each field separately
    if(urgency !== 'selectOption' && importance !== 'selectOption' && difficulty !== 'selectOption' && taskName && dueDate )
    {
        addTask(taskName, urgency, importance, difficulty, dueDate);
    }
    else
    {
        alert("Please fill in all fields to add a task.")
    }

}

//add new task to array and table
function addTask(taskName, urgency, importance, difficulty,dueDate,daysUntil)
{
    
    //calculate days until due using due date
    var daysUntil = daysUntilDue(dueDate);
    //update input row with days until due
    document.getElementById("daysUntilCell").textContent = daysUntil;

    //add new empty row on top table body
    var tableBody = document.querySelector(".taskTable tbody");
    var newRow = tableBody.insertRow(2);
    // Insert the new cells (td elements) for each task attribute
    newRow.innerHTML = `
    <td>${taskName}</td>
    <td>${urgency}</td>
    <td>${importance}</td>
    <td>${difficulty}</td>
    <td>${dueDate}</td>
    <td>${daysUntil}</td>
    <td><input type="checkbox" onclick="deleteTask(this)"></td>
    `;

    //push instead of append bc more than 1+ new value to be added
    tasks.push({taskName, urgency, importance, difficulty,dueDate,daysUntil});
    console.log("Task Added: ", taskName, urgency, importance, difficulty,dueDate,daysUntil);
    
    //add ondblclick to each created row and call editTask()
    addEventListener("dblclick")

    //clear input fields after adding task
    document.getElementById("taskName").value = "";
    document.getElementById("urgencyDropdown").value = "selectOption";
    document.getElementById("importanceDropdown").value = "selectOption";
    document.getElementById("difficultyDropdown").value = "selectOption";
    document.getElementById("dueDate").value = "";
    
}

//function takes in todays date and task due date, calculates days til due
function daysUntilDue(dueDate)
{
    const today = Date.now(); //Date in milliseconds
    const due = new Date(dueDate); //convert dueDate to Date object
    //difference in milliseconds
    const differenceMill = due - today;
    //convert milliseconds to days, rounds up to whole number
    const daysUntil = Math.ceil(differenceMill/(1000 * 60 * 60 * 24));
    return daysUntil;
}
function editTask(event)
{
    alert("double clicked");
}

//deletes task
function deleteTask(event)
{
    var row = event.closest("tr");
    row.remove();
}