export class Todo {
    constructor( tarea ){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
    }
};

// clase para funciones agregar, eliminar, etc.

export class TodoList {
    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    // editartodo(id){
    //     for(const todo of this.todos){
    //         if(todo.id == id){
    //             todo
    //         }
    //     }
    // }

    eliminarTodo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();

        // this.todos = this.todos.filter(todo => todo.completado != true);
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = localStorage.getItem('todo') ? 
        JSON.parse(localStorage.getItem('todo'))
        : [];
    }
};