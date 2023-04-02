//TODAS LAS CLASES QUE SE USARÁN EN EL PROYECTO

export class Tarea {    // CLASE TAREA
    constructor (ID, nombre, detail, completed, subtarea, initial_date, limit_date, again, important, ID_user, ID_lista) {
      this.ID = ID;
      this.nombre = nombre;
      this.detail = detail;
      this.completed = completed;
      this.subtarea = subtarea;
      this.initial_date = initial_date;
      this.limit_date = limit_date;
      this.again = again;
      this.important = important;
      this.ID_user = ID_user;
      this.ID_lista = ID_lista;
    }
// Getters
    get get_ID() {return this.ID;}
    get get_nombre() {return this.nombre;}
    get get_detail() {return this.detail;}
    get get_completed() {return this.completed;}
    get get_subtarea() {return this.subtarea;}
    get get_initial_date() {return this.initial_date;}
    get get_limit_date() {return this.limit_date;}
    get get_again() {return this.again;}
    get get_important() {return this.important;}
    get get_ID_user() {return this.ID_user;}
    get get_ID_lista() {return this.ID_lista;}
// Setters
    set set_ID(ID) {this.ID=ID;}
    set set_Nombre(nombre) {this.nombre=nombre;}
    set set_detail(detail) {this.detail=detail;}
    set set_completed(completed) {this.completed=completed;}
    set set_subtarea(subtarea) {this.subtarea=subtarea;}
    set set_initial_date(initial_date) {this.initial_date=initial_date;}
    set set_limit_date(limit_date) {this.limit_date=limit_date;}
    set set_again(again) {this.again=again;}
    set set_important(important) {this.important=important;}
    set set_ID_user(ID_user) {this.ID_user=ID_user;}
    set set_ID_lista(ID_lista) {this.ID_lista=ID_lista;}
// Métodos

}

