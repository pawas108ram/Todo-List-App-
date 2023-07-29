const submitbutton=document.querySelector('.submit-button');

const todocontainer=document.querySelector('.todo-container');
const textfield=document.querySelector(".input-text");
const filtertodo=document.querySelector('.filter-todo');
document.addEventListener("DOMContentLoaded",getTodos);




submitbutton.addEventListener('click',function(e){
    e.preventDefault();
    if(textfield.value!=""){
    const todoitem=document.createElement("div");
    todoitem.classList.add("todo-item");
    const spanname=document.createElement("span");
    spanname.classList.add("todo-name");
    spanname.textContent=textfield.value;
   saveTodos(spanname.textContent);
    
    todoitem.append(spanname);
    const todocontroller=document.createElement("div");
    todocontroller.classList.add("todo-control");
    const deletebuttonclone=document.createElement("button");
    const donebuttonclone=document.createElement("button");
    deletebuttonclone.classList.add("delete-button");
    deletebuttonclone.innerHTML=`<i class="fa-solid fa-circle-xmark"></i>`;
    deletebuttonclone.addEventListener('click',deleteitem);
    donebuttonclone.classList.add("done-button");
    donebuttonclone.innerHTML=`<i class="fa-solid fa-circle-check"></i>`;
    donebuttonclone.addEventListener("click",doneitem);
    todocontroller.append(deletebuttonclone);
    todocontroller.append(donebuttonclone);
    todoitem.append(todocontroller);
    todocontainer.prepend(todoitem);
    textfield.value="";
   
    }
    });
const deleteitem=function(e){
    e.stopPropagation();
    const todoitem=e.target.closest(".todo-item");
    todoitem.classList.add("fall");
    removeLocalTodos(todoitem);
    
    todoitem.addEventListener('transitionend',function(e){
        todoitem.remove();
    })
}
const doneitem=function(e){

    const parent=e.target.parentElement.parentElement;
    
    const spanname=parent.childNodes;
    

    spanname[0].classList.toggle('checked');
    parent.classList.toggle('completed');
    


    
}

const filter=function(e){
    const todocontainer=document.querySelector(".todo-container");
    const todoitems=todocontainer.children;
    console.log(todoitems);
    for(item of todoitems){
        switch(e.target.value){
            case "all":
                item.style.display='flex';
                break;
            case "completed":
                if(item.classList.contains('completed')){
                   
                    item.style.display="flex";
                }
                else{
                    item.style.display="none";
                }
                break;
            case "uncompleted":
                if(item.classList.contains('completed')){
                    item.style.display="none";
                }
                else{
                    item.style.display="flex";
                }
                break;

        }
    }


}
filtertodo.addEventListener("click",filter);

function saveTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));

    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));

    }
    todos.forEach((todo)=>{
        const todoitem=document.createElement("div");
    todoitem.classList.add("todo-item");
    const spanname=document.createElement("span");
    spanname.classList.add("todo-name");
    spanname.textContent=todo;
   
    
    todoitem.append(spanname);
    const todocontroller=document.createElement("div");
    todocontroller.classList.add("todo-control");
    const deletebuttonclone=document.createElement("button");
    const donebuttonclone=document.createElement("button");
    deletebuttonclone.classList.add("delete-button");
    deletebuttonclone.innerHTML=`<i class="fa-solid fa-circle-xmark"></i>`;
    deletebuttonclone.addEventListener('click',deleteitem);
    donebuttonclone.classList.add("done-button");
    donebuttonclone.innerHTML=`<i class="fa-solid fa-circle-check"></i>`;
    donebuttonclone.addEventListener("click",doneitem);
    todocontroller.append(deletebuttonclone);
    todocontroller.append(donebuttonclone);
    todoitem.append(todocontroller);
    todocontainer.prepend(todoitem);
    })
    
    
   
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));

    }
    const todovalue=todo.children[0].textContent;
    todos.splice(todos.indexOf(todovalue),1);
    localStorage.setItem('todos',JSON.stringify(todos));


}








