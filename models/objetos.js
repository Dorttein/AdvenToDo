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

export class Usuario{
    constructor (ID, login, passwd, HP_Pers, HP_Enem, acciones, ID_enem) {
        this.ID = ID;
        this.login = login;
        this.passwd = passwd;
        this.HP_Pers = HP_Pers;
        this.HP_Enem = HP_Enem;
        this.acciones = acciones;
        this.ID_enem = ID_enem;
    }
// Getters
    get get_ID() {return this.ID;}
    get get_login() {return this.login;}
    get get_passwd() {return this.passwd;}
    get get_HP_Pers() {return this.HP_Pers;}
    get get_HP_Enem() {return this.HP_Enem;}
    get get_acciones() {return this.acciones;}
    get get_ID_enem() {return this.ID_enem;}
// Setters
    set set_ID(ID) {this.ID=ID;}
    set set_login(login) {this.login=login;}
    set set_passwd(passwd) {this.passwd=passwd;}
    set set_HP_Pers(HP_Pers) {this.HP_Pers=HP_Pers;}
    set set_HP_Enem(HP_Enem) {this.HP_Enem=HP_Enem;}
    set set_acciones(acciones) {this.acciones=acciones;}
    set set_ID_enem(ID_enem) {this.ID_enem=ID_enem;}
}

export class Enemigo{
    constructor (ID, type, loot, damage) {
        this.ID = ID;
        this.type = type;
        this.loot = loot;
        this.damage = damage;
    }
// Getters
    get get_ID() {return this.ID;}
    get get_type() {return this.type;}
    get get_loot() {return this.loot;}
    get get_damage() {return this.damage;}
// Setters
    set set_ID(ID) {this.ID=ID;}
    set set_type(type) {this.type=type;}
    set set_loot(loot) {this.loot=loot;}
    set set_damage(damage) {this.damage=damage;}

}


