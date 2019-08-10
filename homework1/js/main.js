const sizes = {
    SIZE_SMALL: {
        price:50,
        calories:20
    },
    SIZE_LARGE: {
        price:100,
        calories:40
    }
};
const  stuffs = {
    STUFFING_CHEESE: {
        price:10,
        calories:20
    },
    STUFFING_POTATO: {
    price:15,
    calories:10
    },
    STUFFING_SALAD: {
        price:20,
        calories:5
    }
};
const toppings = {
    TOPPING_MAYO: {
        price:20,
        calories:5
    },
    TOPPING_SPICE: {
        price:15,
        calories:0
    },
};
/**
 *
 * @param size размер
 * @param stuffing начинка
 * @constructor
 */
function Hamburger(size, stuffing) {
    this.topping =[];
    try{
        if (size && stuffing){
            if((size in sizes)&&(stuffing in stuffs)){
                Object.defineProperty(this,'size',{
                    value:size,
                    configurable:true,
                    writable:false
                });
                Object.defineProperty(this,'stuffing',{
                    value:stuffing,
                    configurable:true,
                    writable:false
                });
            }
            else {
                throw new HamburgerException(`invalid '${!(size in sizes)?size:stuffing}'`)
            }
        }else {
            throw new HamburgerException(`no ${!size?Object.keys({size})[0]:Object.keys({stuffing})[0]} given`)
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
 * @param field поле по которому нужно искать
 * @return {Number}
 */
Hamburger.countAmount = function(field){
    let result =sizes[this.size][field] + stuffs[this.stuffing][field];
    if(this.topping.length){
        this.topping.forEach((element)=>{
            result+=toppings[element][field];
        })
    }
    return result;
};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
    try {
        if(topping in toppings){
            if(!this.topping.some((element)=>{return element===topping})){
                this.topping.push(topping);
            }else {
                throw new HamburgerException(`duplicate topping '${topping}'`);
            }
        }
        else {
            throw new HamburgerException(`invalid ${topping}`);
        }
    }catch (e) {
        console.error(e.message);
    }
};

/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
    try {
        if(this.topping.some((element)=>{return element===topping})){
            this.topping = this.topping.filter((element)=>{
                return element!==topping;
            });
        }else {
            throw new HamburgerException(`${topping} is not defined`);
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
    return this.topping;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this.size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
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





// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
//
//
//
//
// // не передали обязательные параметры
//let h2 = new Hamburger(); // => HamburgerException: no size given
//
// // передаем некорректные значения, добавку вместо размера
// let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// // => HamburgerException: invalid size 'TOPPING_SAUCE'
//
// // добавляем много добавок
// let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// // HamburgerException: duplicate topping 'TOPPING_MAYO'
