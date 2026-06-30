let input = document.getElementById("int");
let addBtn = document.getElementById("addBtn");
let result = document.getElementById("inbox");
let taskCounter = document.getElementById("taskCounter");
let emptyMessage = document.getElementById("emptyMessage");

// Todo ko store karne ke liye array banaya
let arr = JSON.parse(localStorage.getItem("arr")) || [];

// ek function creat kiya 
function createTodo(task) {
let li = document.createElement("li");
    li.classList.add("todo-item");

     // li ke andar task text dalo
    li.textContent = task; 


     // Delete button creat kiya
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "Edit";


    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    


    // task ko delete karne ka function
    deleteBtn.addEventListener("click", function(){
        li.remove();
        arr = arr.filter(function(item){
            return item !== task;
        });
        
    // tas delete hote hi update score
    updateTaskCounter();
    updateEmptyMessage();

        localStorage.setItem("arr", JSON.stringify(arr));
    });


    // task edit karne ka logic
    editBtn.addEventListener("click", function(){
        input.value = task;
        li.remove();
        arr = arr.filter(function(item){
            return item !== task;
        });
        localStorage.setItem("arr", JSON.stringify(arr));
    });
        
    

    li.addEventListener("click", function(){
            //Complete/Uncomplete
            li.classList.toggle("completed")
        });

        // li ko ul ke under add kiya
        inbox.appendChild(li);
    
} 

// tatal task count update karne ke liye function
function updateTaskCounter(){
    taskCounter.textContent = "Total Tasks : " + arr.length;
}

function updateEmptyMessage(){
    if(arr.length === 0){
        emptyMessage.style.display = "block";
    }
    else {
        emptyMessage.style.display = "none";
    }
    
}


arr.forEach(function(task) {
    createTodo(task);
});

// page load hote hi update score call kiya
updateTaskCounter();
updateEmptyMessage();

 addBtn.addEventListener("click", function(){

    // input ki value lekar extra space hata diya
    let task = input.value.trim();

    // Agar input khali hai to alert dikhao
    if(task === "") {
        alert("Please enter a task");

        //  Agar khali hai to aage ka code yahi rok do
        return;   
    }

    // array me data store kiya
     arr.push(task);

     // naya task push hote update function ko call kiya
     updateTaskCounter();
     updateEmptyMessage();

     // localstorage me save kiya string banakar
    localStorage.setItem("arr", JSON.stringify(arr));

    createTodo(task);

    input.value = "";
});
input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addBtn.click();
    }
});