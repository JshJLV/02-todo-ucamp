import {Todo, TodoList} from './clases.js'

// referencias html

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.input-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// funciones

// insertar la tarea al html
const crearTodoHtml = (todo) => {
    const htmlTodo =  
    `
    <li class=" ${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked': ''}>
            <label>${todo.tarea}</label>
            <button class="edit">Editar</button>
            <button class="destroy">Borrar</button>
        </div>
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
};

// eventos

// crear y agregar tarea a la lista
txtInput.addEventListener('keyup', (event) => {    
    if( event.keyCode === 13 && txtInput.value.length > 0){
        
        const nuevoTodo = new Todo(txtInput.value);     
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
})

// evento de marcar completado y borrar un elemento
divTodoList.addEventListener('click', (event)=>{
    const nombreElemento = event.target.localName;
    const botonElegido = event.target.className;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){ // Marcar elemento como completado
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if( botonElegido.includes('destroy') ){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    // else if( botonElegido.includes('edit')){
    //     console.log('entrando a editar')
    // }
})

// evento de borrar todos los completados
btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }   
    }
})

// evento de filtros
ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if(!filtro) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                };
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                };
                break; 
        }
    }
})

const todoList = new TodoList();
todoList.todos.forEach( crearTodoHtml );