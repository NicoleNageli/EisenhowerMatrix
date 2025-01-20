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
    sortTasks();
    //console.log("Task Added: ", taskName, urgency, importance, difficulty,dueDate,daysUntil);
    
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
    document.getElementById("daysUntilCell").value = ""; //idk why this isnt clearing
    
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

function handleMatrixCheckbox(checkbox, taskName) {
    console.log(`Checkbox for task: ${taskName} clicked. Checked: ${checkbox.checked}`);

    // Find the task in the to-do list by matching task name
    const taskRows = Array.from(document.querySelectorAll(".taskTable tbody tr"));
    const taskItem = taskRows.find(row => {
        const taskNameCell = row.querySelector("td");
        if (taskNameCell) {
            console.log(`Comparing: "${taskNameCell.textContent.trim()}" with "${taskName.trim()}"`);
            return taskNameCell.textContent.trim() === taskName.trim();
        }
        return false;
    });

    if (taskItem) {
        const taskCells = taskItem.querySelectorAll("td");
        if (checkbox.checked) {
            taskCells.forEach(cell => {cell.style.textDecoration = "line-through";
                cell.style.color = "gray";});
        } else { //reset row
            taskCells.forEach(cell => {cell.style.textDecoration = "none";
                cell.style.color = "black";});
        }
    } else {
        console.error(`Task "${taskName}" not found in the to-do list.`);
    }
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
    var taskName = row.querySelector("td:nth-child(1)").textContent; // Get task name
    row.remove();
    //need to remove from array and matrix too
    tasks = tasks.filter(task => task.taskName !== taskName);
    removeTaskFromMatrix(taskName);
    sortTasks();
}

function removeTaskFromMatrix(taskName) {
    // Loop through each quadrant and remove the task if found
    ['q1', 'q2', 'q3', 'q4'].forEach(quadrantId => {
        const quadrant = document.getElementById(quadrantId);
        const taskList = quadrant.querySelector('.task-list');
        
        // Find the task item by task name
        const taskItem = Array.from(taskList.children).find(item => item.textContent.includes(taskName));
        if (taskItem) {
            taskItem.remove();
        }
    });
}


//sort tasks into quadrants
function sortTasks() {
    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = [];

    tasks.forEach(task => {
        const { urgency, importance, dueDate, difficulty } = task;
        const daysUntil = task.daysUntil;

        // Q1: Important and urgent / due in 2 days or less
        if ((importance === 'Important' && urgency === 'Urgent') || daysUntil <= 2) {
            q1.push(task);
        }
        // Q2: Important but not urgent
        else if (importance === 'Important' && urgency === 'Not Urgent') {
            q2.push(task);
        }
        // Q3: Not important but urgent
        else if (importance === 'Not Important' && urgency === 'Urgent') {
            q3.push(task);
        }
        // Q4: Not important and not urgent
        else {
            q4.push(task);
        }
    });

    // Sort tasks within each quadrant based on difficulty
    q1.sort((a, b) => b.difficulty - a.difficulty); // Highest difficulty first
    q2.sort((a, b) => b.difficulty - a.difficulty);
    q3.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date in ascending order

    appendTasksToQuadrant(q1, 'q1');
    appendTasksToQuadrant(q2, 'q2');
    appendTasksToQuadrant(q3, 'q3');
    appendTasksToQuadrant(q4, 'q4');
}

// Function to append tasks to their respective quadrant
function appendTasksToQuadrant(tasks, quadrantId) {
    const quadrant = document.getElementById(quadrantId);
    const taskList = quadrant.querySelector('.task-list');
    if(!taskList) return;
    taskList.innerHTML = ''; // Clear previous content

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
        <input type="checkbox" onclick="handleMatrixCheckbox(this, '${task.taskName}')">
        <span>${task.taskName}</span>
        <span>Difficulty: ${task.difficulty}</span>
        `;

        taskList.appendChild(taskItem);
    });
}
