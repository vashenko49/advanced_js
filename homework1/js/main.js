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
/**
 *
 * @param size размер
 * @param stuffing начинка
 * @constructor
 */
function Hamburger(size, stuffing) {
    this._topping =[];
    try{
        if (size && stuffing){
            Hamburger.checkData.call(this,sizes,size,'_size');
            Hamburger.checkData.call(this,stuffs,stuffing,'_stuffing');
        }else {
            throw new HamburgerException(`no ${!size?"size":"stuffing"} given`)
        }

    }
    catch (e) {
        console.error(e.message);
    }


}
/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = "SIZE_SMALL";
Hamburger.SIZE_LARGE = "SIZE_LARGE";
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = "STUFFING_SALAD";
Hamburger.STUFFING_POTATO = "STUFFING_POTATO";
Hamburger.TOPPING_MAYO = "TOPPING_MAYO";
Hamburger.TOPPING_SPICE = "TOPPING_SPICE";


/**
 * @param array {Array} массив где искать
 * @param field {String} что искать
 * @param nameVariable {String} куда записывать если нашли
 */
Hamburger.checkData=function(array,field,nameVariable){
    try {
        if(!array.some((element)=>{
            if(element.name===field){
                Object.defineProperty(this,nameVariable,{
                    value:element,
                    configurable:true,
                    writable:false
                });
                return true;
            }
        })){
            throw new HamburgerException(`invalid ${nameVariable} '${field}'`);
        }
    }catch (e) {
        console.error(e.message);
    }
};

/**
 * @param field поле, по которому нужно искать
 * @return {Number}
 */
Hamburger.countAmount = function(field){
    return this._size[field] + this._stuffing[field] + (this._topping[0] ? (this._topping.length===1?this._topping[0][field]:(this._topping.reduce((sum, element)=>{return sum[field] + element[field]}))): 0);
};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param _topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (_topping) {

    try {

        //проверка на наличие переданого значения
        if(_topping){
            //проверка с колекцией данных, существует ли такой объект
            if (!toppings.some((element)=>{
                if(element.name===_topping){
                    //проверка на дубликат
                    if(!this._topping.some((element)=>{return element.name === _topping;})){
                        this._topping.push(element);
                    }
                    else {
                        throw new HamburgerException(`duplicate topping '${_topping}'`);
                    }
                    return true;
                }
                else {
                    return false;
                }
            })) {
                throw new HamburgerException(`invalid ${_topping}`);
            }
        }else {
            throw new HamburgerException('no given topping');
        }
    }catch (e) {
        console.error(e.message);
    }
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param _topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (_topping) {
    try {
        //проверка на переданные данные
        if(_topping){
            //проверка на существование таких данных в текущих топпингах
            if(!this._topping.some((element)=>{
                if(element.name===_topping) {
                    this._topping = this._topping.filter((element)=>{return element.name!==_topping});
                    return true
                }
            })){
                throw new HamburgerException(`${_topping} is not defined`);
            }
        }else {
                throw new HamburgerException('no given topping');
        }
    }catch (e) {
        console.error(e.message);
    }
};

/**
 * Получить список добавок.
 *
 * @return {[]} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    return this._topping.map((element)=>{
        return element.name;
    });
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this._size.name;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this._stuffing.name;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return  Hamburger.countAmount.call(this,"price")
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return  Hamburger.countAmount.call(this,"calories")
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (message){
    this.message = message;
    this.name ="Исключение, определенное пользователем";
}


console.log('маленький гамбургер с начинкой из сыра');
let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
console.log('добавка из майонеза');
hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log('спросим сколько там калорий');
console.log("Calories: %f", hamburger.calculateCalories());
console.log('сколько стоит');
console.log("Price: %f", hamburger.calculatePrice());
console.log('я тут передумал и решил добавить еще приправу');
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log('А сколько теперь стоит?');
console.log("Price with sauce: %f", hamburger.calculatePrice());
console.log('Проверить, большой ли гамбургер?');
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
console.log('Убрать добавку');
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
//
//
//
//
// // не передали обязательные параметры
// let h2 = new Hamburger(); // => HamburgerException: no size given
//
// передаем некорректные значения, добавку вместо размера
// let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'
//
// // добавляем много добавок
// let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// // HamburgerException: duplicate topping 'TOPPING_MAYO'
