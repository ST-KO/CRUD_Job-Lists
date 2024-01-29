const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const company = document.getElementById("company");
const jobType = document.getElementById("jobType");
const workMode = document.getElementById("modeInput");
const dateInput = document.getElementById("dateInput");
const textArea = document.getElementById("textarea");
const tasks = document.getElementById('tasks');
const msg = document.getElementById("msg");
const add = document.getElementById("add");
const title = document.getElementById("exampleModalLabel");
const xBtn = document.querySelector(".btn-close");
const addBtn = document.getElementById("add");

let isUpadting = false;
let selectedTask;


xBtn.addEventListener("click", () => {
    title.innerHTML = "Add New Job";
    addBtn.innerHTML = "Add";
    resetForm();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();

    title.innerHTML = "Add New Job";
    addBtn.innerHTML = "Add";
    resetForm();
});

const formValidation = () => {
    if(!textInput.value){
        msg.innerHTML = "Task cannot be blank!";
    }else{
        msg.innerHTML = "";
       
        closeForm(); 
       if(isUpadting)
       {
        updatedData();
       }else{
        acceptData();
       }
        
        
    }
};

// Accept and Store data
let data = []; // Don't use 'const', use 'let', since 'const' does not let you update or change 
              //and it will prevent saved data to be restored again from local storage when page is refreshed or reloaded

const acceptData = () => {
    
    data.push({
        'text': textInput.value,
        'company': company.value,
        'type': jobType.value,
        'mode': workMode.value,
        'date': dateInput.value,
        'description': textArea.value
    }); // temporarily store input as objects in an array called data
   
    localStorage.setItem("data", JSON.stringify(data)); // Save data array in the local storage
    createTasks();
   
};


// This function display data on screen
const createTasks = () => {
    
    tasks.innerHTML = ""; // To clear the old inputs when page reload 

    // 'x' will get all the objs in the data array one by one and 'y' will count and set the index for each one
    data.map((x, y) => {
        return (tasks.innerHTML += 
            `<div id=${y}>
                
                <span class="fw-bold">Title: ${x.text}</span>
                
                <span class="fw-bold">Company: ${x.company}</span>
                <span class="fw-bold">Job Type: ${x.type}</span>
                <span class="fw-bold">Work Mode: ${x.mode}</span>
                <span class="small text-secondary">Ads Date: ${x.date}</span>
                <pre class="description" style="display: none;">${x.description}</pre>

                <span class="options">
                    <i onclick="expandTask(this)" class="fa-solid fa-up-right-and-down-left-from-center"></i>
                    <i onclick="updateTask(this)" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#form"></i>
                    <i onclick="deleteTask(this);createTasks()" class="fa-solid fa-trash"></i>
                </span>
            </div>`);
    });

    resetForm();
};

// For expand button
const expandTask = (e) =>{

    const parentContainer = e.parentElement.parentElement;
    let selectedChild = parentContainer.querySelector(".description");

    if(selectedChild.style.display === "none"){
        selectedChild.style.display = "block";
    }else{
        selectedChild.style.display = "none";
    }

};

// For delete button
const deleteTask = (e) => {
    
    e.parentElement.parentElement.remove(); // Delete the whole thing (2 parents counting from 'i' element which is <span> and <div>)

    data.splice(e.parentElement.parentElement.id, 1); // Remove from data array 
    localStorage.setItem("data", JSON.stringify(data)); // And save the new data array in the local storage
};

// For update button
const updateTask = (e) => {
    
    selectedTask = e.parentElement.parentElement; 

    title.innerHTML = "Update The Post";
    addBtn.innerHTML = "Update";

    textInput.value = selectedTask.children[0].innerHTML.replace('Title: ', '');
    company.value = selectedTask.children[1].innerHTML.replace('Company: ', '');
    jobType.value = selectedTask.children[2].innerHTML.replace('Job Type: ', '');
    workMode.value = selectedTask.children[3].innerHTML.replace('Work Mode: ', '');
    dateInput.value = selectedTask.children[4].innerHTML.replace('Ads Date: ', '');
    textArea.value = selectedTask.children[5].innerHTML;
    
    console.log(selectedTask);
    isUpadting = true;
  
    //seletedTask.remove();
    //deleteTask(e);
};

const updatedData = () => {
    
    data[selectedTask.id] = {
        'text': textInput.value,
        'company': company.value,
        'type': jobType.value,
        'mode': workMode.value,
        'date': dateInput.value,
        'description': textArea.value
    };
   
    localStorage.setItem("data", JSON.stringify(data));
    
    isUpadting = false;
    createTasks();
}; 


// Reset the form to origianl blank statese
const resetForm = () => {
    textInput.value = "";
    company.value = "";
    jobType.value = "";
    workMode.value = "";
    dateInput.value = "";
    textArea.value = "";
    
};

//  Close the form
const closeForm = () => {
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
        add.setAttribute("data-bs-dismiss", "");
    })();        
};

// Get the stored data when the page is reloaded
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();

