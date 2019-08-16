const sizes = [
    {
        name:'SIZE_SMALL',
        price:50,
        calories:20
    },{
        name:'SIZE_LARGE',
        price:100,
        calories:40
    }
];
const  stuffs = [
    {
        name:'STUFFING_CHEESE',
        price:10,
        calories:20
    },{
        name:'STUFFING_POTATO',
        price:15,
        calories:10
    },{
        name:'STUFFING_SALAD',
        price:20,
        calories:5
    }
];
const toppings = [
    {
        name:'TOPPING_MAYO',
        price:20,
        calories:5
    },{
        name:'TOPPING_SPICE',
        price:15,
        calories:0
    }
];

class Hamburger{
    constructor(size, stuffing) {
        this.size = size;
    }

    static SIZE_SMALL = "SIZE_SMALL";
    static SIZE_LARGE = "SIZE_LARGE";
    static STUFFING_CHEESE = 'STUFFING_CHEESE';
    static STUFFING_SALAD = "STUFFING_SALAD";
    static STUFFING_POTATO = "STUFFING_POTATO";
    static TOPPING_MAYO = "TOPPING_MAYO";
    static TOPPING_SPICE = "TOPPING_SPICE";

    get size(){
        return this._size;
    }
    set size(val){
        if(val){
            if(sizes.some((elem)=>val===elem)){
                this._size=val;
            }else {
                throw new HamburgerException(`invalide`)
            }
        }else {
            throw HamburgerException(`no size given`)
        }
    }


    static HamburgerException (message){
        this.message = message;
        this.name ="Исключение, определенное пользователем";
    }

    static checkData (array,field,nameVariable){
        array.some((element)=>{
            if(element.name===field){
                Object.defineProperty(this,nameVariable,{
                    value:element,
                    configurable:true,
                    writable:false
                });
                return true;
            }
            else {
                throw new Hamburger.HamburgerException(`invalid ${nameVariable} '${field}'`);
            }
        });
    };

}

debugger;
let hamburger = new Hamburger(Hamburger.SIZE_SMALL,Hamburger.STUFFING_CHEESE);