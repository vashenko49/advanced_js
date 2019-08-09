/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */

function Hamburger(size, stuffing) {

    try{
        if(size && stuffing){
            let checkSize =Hamburger.__proto__.check.call(Hamburger, size,Hamburger.TYPE_SERVICES.SIZE);
            let checkStuffing =Hamburger.__proto__.check.call(Hamburger, stuffing,Hamburger.TYPE_SERVICES.STUFFING);

            if(checkSize.res){
                Object.defineProperty(this,'size',{
                    value:size,
                    configurable:true,
                    writable:false
                });
            }else {
                throw new HamburgerException(`invalid size ${checkSize.description}`)
            }
            if(checkStuffing.res){
                Object.defineProperty(this,'stuffing',{
                    value:stuffing,
                    configurable:true,
                    writable:false
                });
            }else {
                throw new HamburgerException(`invalid stuffing ${checkStuffing.description}`)
            }
        }
        else{
            throw new HamburgerException('no size or stuffing given')
        }
        this.topping=[];
    }
    catch (e) {
        console.log(e.message);
    }


}
/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {
    price:50,
    calories:20
};
Hamburger.SIZE_LARGE = {
    price:100,
    calories:40
};
Hamburger.STUFFING_CHEESE = {
    price:10,
    calories:20
};
Hamburger.STUFFING_SALAD = {
    price:20,
    calories:5
};
Hamburger.STUFFING_POTATO = {
    price:15,
    calories:10
};
Hamburger.TOPPING_MAYO = {
    price:20,
    calories:5
};
Hamburger.TOPPING_SPICE = {
    price:15,
    calories:0
};
Hamburger.TYPE_SERVICES={
    SIZE:"SIZE",
    STUFFING:"STUFFING",
    TOPPING:"TOPPING"
};
/**
 * Проверка на соответствие нужному типу
 * @param obj передеваемый объект на проверку
 * @param typeName нужный тип
 * @return объект с boolean найденно ли обьект и наименование обьекта который мы искали для вывода в ошибку
 */
Hamburger.__proto__.check =function(obj,typeName) {
    let result={
        res:false,
        description:''
    };

    for(let key in this){
        if(this[key]===obj){
            result.description=key;
        }
        if(this[key]===obj&&key.includes(typeName)){
            result.res=true;
        }
    }
    return result;
};
/**
 * @param topping объект который идет на поиск дубликата
 * @param mode режим работы функции false - просто поиск и true - удалить искаемый обьекта
 * @return {boolean} возратить результат поиска
 */
Hamburger.__proto__.searchDuplicates = function(topping, mode=false){
    for(let i = 0;i<this.topping.length;i++){
        if(this.topping[i]===topping){
            if(mode===true){
                this.topping = this.topping.splice(i+1,i+2);
            }
            return false
        }
    }
    return true
};

Hamburger.__proto__.countAmount = function(field){
    let result =this.size[field] + this.stuffing[field];
    if(this.topping.length){
        this.topping.forEach((element)=>{
            result+=element[field];
        });
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
    try{
        let checkTopping =Hamburger.__proto__.check.call(Hamburger, topping,Hamburger.TYPE_SERVICES.TOPPING);
        let checkDuplicate = Hamburger.__proto__.searchDuplicates.call(this,topping);
        if(checkTopping.res&&checkDuplicate){
            this.topping.push(topping);
        }else {
            throw new HamburgerException(`duplicate topping ${checkTopping.description}`)
        }
    }catch (e) {
        console.log(e.message);
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
        let checkTopping =Hamburger.__proto__.check.call(Hamburger, topping,Hamburger.TYPE_SERVICES.TOPPING);
        let checkDuplicate = Hamburger.__proto__.searchDuplicates.call(this,topping, true);
        if(checkTopping&&checkDuplicate){
            throw new HamburgerException(`is not defined ${checkTopping.description}`)
        }
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Получить список добавок.
 *
 * @return {[]} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
    // let result = "not found topping";
    // if(this.topping.length){
    //     result = [];
    //     this.topping.forEach((element)=>{
    //        result.push(Hamburger.__proto__.check.call(Hamburger, element, Hamburger.TYPE_SERVICES.TOPPING ).description);
    //     });
    //     return result;
    // }
    // return result;

    return this.topping;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    //return Hamburger.__proto__.check.call(Hamburger, this.size,Hamburger.TYPE_SERVICES.SIZE);
    return this.size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    //return Hamburger.__proto__.check.call(Hamburger, this.stuffing,Hamburger.TYPE_SERVICES.STUFFING);
    return this.stuffing;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    return  Hamburger.__proto__.countAmount.call(this,'price');
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    return  Hamburger.__proto__.countAmount.call(this,'calories');
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (message){
    this.message = message;
    this.name = "Исключение, определенное пользователем";
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




// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
h4.addTopping(Hamburger.TOPPING_MAYO);
h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
