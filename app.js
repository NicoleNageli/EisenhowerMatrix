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
    <td class="${daysUntil <= 2 ? 'highlight-red' : ''}">${daysUntil}</td>
    <td><input type="checkbox" onclick="deleteTask(this)"></td>
    `;

    //push instead of append bc more than 1+ new value to be added
    tasks.push({taskName, urgency, importance, difficulty,dueDate,daysUntil});
    console.log("Task Added: ", taskName, urgency, importance, difficulty,dueDate,daysUntil);
    
    //add ondblclick to each created row and call editTask()
    newRow.addEventListener("dblclick", function(event){ 
        editTask(event);
    });

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
    //alert("double clicked");
    //open inputs again but keep what's already there
    const currentRow = event.target.closest("tr");//get row that was double-clicked
    if (!currentRow) return;
    const currentCells = currentRow.querySelectorAll("td"); //get all cells in that row
    //store current row values
    const ctaskName = currentCells[0].textContent; //only stores the text
    const curgency = currentCells[1].textContent;
    const cimportance = currentCells[2].textContent;
    const cdifficulty = currentCells[3].textContent;
    const cdueDate = currentCells[4].textContent;
    //replace row with input fields
    currentCells[0].innerHTML = `<input type ="text" id="taskName" value ="${ctaskName}"/>`; //${} template literals let u put variable inside the string
    //dropdowns, set current selection to what's currently in the cell, make select with all options
    //${curgency === "Urgent"? "selected" : ""} keeps current selected value
    currentCells[1].innerHTML = `
    <select id="urgencyDropdown">
        <option value="Urgent" ${curgency === "Urgent"? "selected" : ""}>Urgent</option>
        <option value="Not Urgent" ${curgency === "Not Urgent"? "selected" : ""}>Not Urgent</option>
    </select>
    `;
    currentCells[2].innerHTML = `
    <select id="importanceDropdown">
    <option value="Important" ${cimportance === "Important" ? "selected" : ""}>Important</option>
    <option value="Not Important" ${cimportance === "Not Important" ? "selected" : ""}>Not Important</option>
    </select>
    `;
    currentCells[3].innerHTML = `
    <select id="difficultyDropdown">
    <option value="Easy" ${cdifficulty === "Easy" ? "selected" : ""}>Easy</option>
    <option value="Medium" ${cdifficulty === "Medium" ? "selected" : ""}>Medium</option>
    <option value="Hard" ${cdifficulty === "Hard" ? "selected" : ""}>Hard</option>
    <option value="Very Hard" ${cdifficulty === "Very Hard" ? "selected" : ""}>Very Hard</option>
    </select>
    `;
    currentCells[4].innerHTML = `<input type ="date" id="dueDate" value ="${cdueDate}"/>`;
    
    //when user clicks off of row or presses enter, update task in row and array
    //event listener for table, onblur event
    //function() waits for event to happen then run update
    currentRow.addEventListener("blur", function(){updateTask(currentRow)}, true);
    currentRow.addEventListener("keydown", function(event){if(event.key === "Enter"){updateTask(currentRow);}});
}

//update row and array
function updateTask(row)
{
    const taskName = row.querySelector("#taskName").value;
    const urgency = row.querySelector("#urgencyDropdown").value;
    const importance = row.querySelector("#importanceDropdown").value;
    const difficulty = row.querySelector("#difficultyDropdown").value;
    const dueDate = row.querySelector("#dueDate").value;
    const daysUntil = daysUntilDue(dueDate);

    // Find the "Days Until" cell
    const daysCell = row.querySelector("td:nth-child(6)");

    // If days until 2 or less, make the cell red & add to Q1
    row.innerHTML = `
        <td>${taskName}</td>
        <td>${urgency}</td>
        <td>${importance}</td>
        <td>${difficulty}</td>
        <td>${dueDate}</td>
        <td class="${daysUntil <= 2 ? 'highlight-red' : ''}">${daysUntil}</td>
        <td><input type="checkbox" onclick="deleteTask(this)"></td>
    `;
}


//deletes task
function deleteTask(event)
{
    var row = event.closest("tr");
    row.remove();
}