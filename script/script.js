// gettin input text in the dom
const inputTask = document.querySelector('.task-input input')

// getting localstorage todolist
let todos = JSON.parse(localStorage.getItem('todo-list'))

// getting ul in the dom 
let tasksBox = document.querySelector('.task-box');

// edit
let editId;
let isEdetedTask = false;

// filter
const filters = document.querySelectorAll('.filtrs span');



filters.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('span.active').classList.remove('active')
        btn.classList.add('active')
        showTodo(btn.id);
    })
})


// showing data tasks in interface
function showTodo(filter){
    let li = ''

    if(todos){
        todos.forEach((todo,id)=>{
            let completed = todo.status == "completed" ? "checked" : ""
            if(filter == todo.status || filter == "all"){
                li += `
                    <li class="task">
                        <label for="${id}" >
                            <input onclick="updateStatue(this)" type="checkbox" id="${id}" ${completed}>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="setting">
                            <i onclick={showMenu(this)} class="fa-solid fa-ellipsis"></i>
                            <ul class="task-menu">
                                <li onclick="handlEditeTask(${id},'${todo.name}')"><i class="fa-solid fa-pen-to-square"></i>modifier</li>
                                <li onclick='handlDeletTask(${id})'><i class="fa-solid fa-trash-can"></i>supprimer</li>
                            </ul>
                        </div>
                    </li>
                `

            }
            
        })
    }

    tasksBox.innerHTML = li || `<span class="aucun"> aucun tâche ici</span>`

}

showTodo("all");


// update status completed or pending

function updateStatue(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        todos[selectedTask.id].status = "completed"
        taskName.classList.add('checked')
    }else{
        todos[selectedTask.id].status = "pending"
        taskName.classList.remove('checked')
    }
    localStorage.setItem('todo-list',JSON.stringify(todos))
}



// EDIT TASK FUNCTION
function handlEditeTask(editedId,editedName){
    editId = editedId;
    isEdetedTask = true;
    inputTask.value = editedName;
}


// DELET TASK FUNCTION
function handlDeletTask(deletedId){
   todos.splice(deletedId,1);
   localStorage.setItem('todo-list',JSON.stringify(todos))
    Toastify({
        text: "Votre tâche est supprimée avec succès",
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left",
        style: {
        background: "linear-gradient(to right, #e84118, #ff6b81)",
        }
    }).showToast();

   showTodo();
}


// show menu 
function showMenu(selectedMenu){
    let listMenu  = selectedMenu.parentElement.lastElementChild;
    listMenu.classList.add("show")
    document.addEventListener('click',e=>{
        if(e.target.tagName != 'I' || e.target != selectedMenu){
            listMenu.classList.remove("show")
        }
    })
}


// CLEAR TASKS
document.getElementById("clear-btn").onclick = function(){
    todos.splice(0,todos.length)
    localStorage.setItem('todo-list',JSON.stringify(todos))
    showTodo();
   
}



// cretae task function
inputTask.addEventListener("keyup",e=>{
    let userTask = inputTask.value.trim();
    if(e.key == "Enter" && userTask){

        // edit operation consition
        if(!isEdetedTask){
            if(!todos){
                todos = []
            }

            let taskInfo = {name:userTask , status:"pending"}
            todos.push(taskInfo)
            // alert toast 
            Toastify({
                text: "Votre tâche est ajoutée avec succès",
                close: true,
                gravity: "bottom", 
                position: "left",
                style: {
                background: "linear-gradient(to right, #20bf6b, #00d2d3)",
                }
            }).showToast();


        }else{
            isEdetedTask = false
            todos[editId].name = userTask

            Toastify({
                text: "Votre tâche est modifiée avec succès",
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left",
                style: {
                  background: "linear-gradient(to right, #fffa65, #ff9f1a)",
                }
            }).showToast();
        }
        
        
        localStorage.setItem("todo-list",JSON.stringify(todos))
        inputTask.value = ''

        
    }

    showTodo();


    
})


// DARK MODE SECTION



let btnDark = document.querySelector('.btn_dark')
btnDark.addEventListener('click',()=>{
   document.querySelector('.wrapper').classList.toggle('dark-color');
    
})



