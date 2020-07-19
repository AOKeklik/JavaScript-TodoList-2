// SELLECTORS
    const todoInput  = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const filterOption = document.querySelector('.filter-todo');
    const todoList   = document.querySelector('.todo-list');
   

// EVENT LISTENERS
    document.addEventListener('DOMContentLoaded',getTodos);
    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteCheck);
    filterOption.addEventListener('click', filterTodo);

// ARAYUZE EKLEME
    function addTodo(event)
    {
        const div = document.createElement('div');
              div.classList.add('todo');

        const  li = document.createElement('li');
               li.classList.add('todo-item');
               li.innerText = todoInput.value;

                div.appendChild(li);

        const completebutton = document.createElement('button');
              completebutton.classList.add('complete-btn');
              completebutton.innerHTML = `<i class="fas fa-check"></i>`;

                div.appendChild(completebutton); 

        const trashbutton = document.createElement('button');
              trashbutton.classList.add('trash-btn');
              trashbutton.innerHTML = `<i class="fas fa-trash"></i>`;
  
                div.appendChild(trashbutton);
                todoList.appendChild(div);
                saveLocalTodos(todoInput.value);

                todoInput.value = '';

        event.preventDefault();        
    }
// ARAYUZDEN SILME
    function deleteCheck(e)
    {
        const item = e.target;

        if(item.classList[0] === 'trash-btn'){
            const todo = item.parentElement;
            todo.classList.add('fall');
            removeLocalTodos(todo);
            todo.addEventListener('transitionend', function(){
                todo.remove();
            });
        }
        if(item.classList[0] === 'complete-btn'){
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    }
// FILTRELEME
    function filterTodo(e)
    {
         const todos = todoList.childNodes;

         todos.forEach(function(todo){
            switch(e.target.value){
                case 'all':
                    todo.style.display = 'flex';
                break;
                case 'completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                break;
                case 'uncompleted':
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                break;
            }
         });     
    }
// STORAGE YE KAYIT ETME
    function saveLocalTodos(todo)
    {
        let todos;

        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
    }
// KAYITLARI ARAYUZE CAGIRMA
    function getTodos()
    {
        let todos;

        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.forEach(function(todo){
            const div = document.createElement('div');
              div.classList.add('todo');

            const  li = document.createElement('li');
                li.classList.add('todo-item');
                li.innerText = todo;

                    div.appendChild(li);

            const completebutton = document.createElement('button');
                completebutton.classList.add('complete-btn');
                completebutton.innerHTML = `<i class="fas fa-check"></i>`;

                    div.appendChild(completebutton); 

            const trashbutton = document.createElement('button');
                trashbutton.classList.add('trash-btn');
                trashbutton.innerHTML = `<i class="fas fa-trash"></i>`;
    
                    div.appendChild(trashbutton);
                    todoList.appendChild(div);
        });
    }
// KAYITLARI STORAGE DEN SILME
    function removeLocalTodos(todo)
    {
         let todos;
         if(localStorage.getItem('todos') === null){
            todos = [];
         }else{
             todos = JSON.parse(localStorage.getItem('todos'));
         }
         const todoIndex = todo.children[0].innerText;
         todos.splice(todos.indexOf(todoIndex),1);
         localStorage.setItem('todos', JSON.stringify(todos))
    }
