export class Attributes {
    public hp:any;
    public speed:any;
    public damage:any;

    constructor(_hp:any, _speed:any, _damage:any) {
        this.hp = _hp;
        this.speed = _speed;
        this.damage = _damage;
    }

    getHp() {
        return this.hp;
    }

    getSpeed(){
        return this.speed;
    }

    getDamage(){
        return this.damage;
    }
}