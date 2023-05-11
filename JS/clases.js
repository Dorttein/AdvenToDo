//TODAS LAS CLASES QUE SE USARÁN EN EL PROYECTO

export class Tarea {    // CLASE TAREA
    constructor (ID, nombre, detail, reward, completed, subtarea, initial_date, limit_date, again, important, ID_user, ID_lista) {
      this.ID = ID;
      this.nombre = nombre;
      this.detail = detail;
      this.reward = reward;
      this.completed = completed;
      this.subtarea = subtarea; /* ESTO ES UN ARRAY */
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
    get get_reward() {return this.reward;}
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
    set set_reward(reward) {this.reward=reward;}
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

export class Lista{
    constructor (ID, name, lista_tareas) {
        this.ID = ID;
        this.name = name;
        this.lista_tareas = lista_tareas; /* ESTO ES UN ARRAY */
    }
// Getters
    get get_ID() {return this.ID;}
    get get_name() {return this.name;}
    get get_lista_tareas() {return this.lista_tareas;}
// Setters
    set set_ID(ID) {this.ID=ID;}
    set set_name(name) {this.name=name;}
    set set_lista_tareas(lista_tareas) {this.lista_tareas=lista_tareas;}
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

export class Objeto{
	constructor (ID, type, ATK, DEF, HP, recoil, heal, locked, equiped) {
        this.ID = ID;
        this.type = type;
        this.ATK = ATK;
        this.DEF = DEF;
        this.HP = HP;
        this.recoil = recoil;
        this.heal = heal;
        this.locked = locked;
        this.equiped = equiped;
	}
// Getters
    get get_ID() {return this.ID;}
    get get_type() {return this.type;}
    get get_ATK() {return this.ATK;}
    get get_DEF() {return this.DEF;}
    get get_HP() {return this.HP;}
    get get_recoil() {return this.recoil;}
    get get_heal() {return this.heal;}
    get get_locked() {return this.locked;}
    get get_equiped() {return this.equiped;}
// Setters
    set set_ID(ID) {this.ID=ID;}
    set set_type(type) {this.type=type;}
    set set_ATK(ATK) {this.ATK=ATK;}
    set set_DEF(DEF) {this.DEF=DEF;}
    set set_HP(HP) {this.HP=HP;}
    set set_recoil(recoil) {this.recoil=recoil;}
    set set_heal(heal) {this.heal=heal;}
    set set_locked(locked) {this.locked=locked;}
    set set_equiped(equiped) {this.equiped=equiped;}
}


