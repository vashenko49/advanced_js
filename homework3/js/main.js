window.addEventListener('load', function () {

    let table = createTable(30,30, 'table', 'tr','td');
    //генерируем таблтцу
    document.body.prepend(table);
    document.body.addEventListener('click', function(event){
        let target =  event.target;
        if(table.contains(target)){
            if(target.classList.contains('td')){
                target.classList.add('td-change');
            }
        }else {
            table.classList.toggle('table');
            table.classList.toggle('table-inverse');
        }

    });
});


/**
 * создание елемента
 * @param element тег
 * @param classCSS класс css
 * @return {Node} готовый елемент
 */
function createElement(element, classCSS) {
    let result = document.createElement(element);
    if(classCSS){
        result.classList.add(classCSS);
    }
    return result;
}

/**
 * генерация таблицы
 * @param width количество столбцов
 * @param height количество строк
 * @param classToTable класс css для таблицы
 * @param classToTd класс css для строки
 * @param classToTr класс css для колонки
 * @return {Node} готовая таблица
 */
function createTable(width, height, classToTable, classToTr, classToTd) {
    let table = createElement('table',classToTable);

    for(let i =0;i<height;i++){
        let tr = createElement('tr',classToTr);
        for(let j=0;j<width;j++){
            tr.append(createElement('td',classToTd))
        }
        table.append(tr);
    }
    return  table;
}
