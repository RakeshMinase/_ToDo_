// window.onload = function(){
    // console.log("RM12");
    let form = document.getElementById("form");
    let input = document.getElementById("input");
    let button = document.getElementById("button");
    let tasks = document.getElementById("tasks");
    // let delete = document.getElementById("");
    let ind = 1;
    let taskItem = "";
    let taskList= [];

    // console.log(form);
    form.addEventListener("submit", addTask);

    tasks.addEventListener("click", doneDelete);

    window.onload = function(){
        console.log("RM12");
        if(localStorage.length > 0){
            // delete JSON.parse(localStorage.taskList)[0];
            // console.log(JSON.parse(localStorage.taskList));
            // console.log(Object.keys(localStorage));
            // let container = 
            // // console.log(localStorage.taskList);
            // // console.log("23456u");
            // console.log(container.length);
    
            displayTasks();
        }
    }

    function addTask(){
        if(input.value === ""){
            alert("Enter some Task");
        }
        else{
            let task = input.value;
            taskItem = {item: task, done: false};
            taskList.push(taskItem);
            addToLocalStorage();
            input.value = "";
        }
    }

    function addToLocalStorage(){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("taskList", JSON.stringify(taskList));
        }
        else{
            alert("Local Storage not supported by the Browser");
        }
    }

    function displayTasks(){
        taskList = JSON.parse(localStorage.getItem("taskList"));
        console.log(taskList);
        tasks.innerHTML = "";
        let ind = 0;
        taskList.forEach(element => {
            let task = element.item;
            let check = element.done;
            let decor = "";
            if(check){
                decor = "line-through"
            }
            let taskRow = `<tr class="row" style="text-align: left; text-decoration: ${decor};">
                                <td id="task_text" class="col-sm-10">${task}</td>
                                <td class="col-sm-1"><i data-index=${ind} id='check-${ind}' class="bi bi-check"></i></td>
                                <td class="col-sm-1"><i data-index=${ind} id='delete-${ind}' class="bi bi-trash"></i></td>
                            </tr>`;  
            tasks.insertAdjacentHTML("beforeend", taskRow);
            ind++;
        });
    }

    function doneDelete(event){
        const element = event.target.id.split("-");
        const chk = element[0];
        taskList = JSON.parse(localStorage.getItem("taskList"));
        if(chk === "check"){
            console.log("Press checked");
            if(taskList[element[1]].done){
                taskList[element[1]].done = false;
            }
            else{
                taskList[element[1]].done = true;
            }
            localStorage.setItem('taskList', JSON.stringify(taskList));
            console.log(taskList[element[1]-1]);

        }
        else if(chk === "delete"){
            taskList.splice(element[1], 1);
            localStorage.setItem('taskList', JSON.stringify(taskList));
            
        }
        displayTasks();
    }