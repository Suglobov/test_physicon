# Задание
Тестовое задание на вакансию «Разработчик javascript/frontend»
Необходимо выполнить нижеследующее задание, допустимо использование любых
библиотек или фреймворков.
Имеется следующий метод API:  
POST http://krapipl.imumk.ru:8082/api/mobilev1/update
https://cors-anywhere.herokuapp.com/  
в теле запроса передается объект json  
{'data':''}  
Возвращается результат вида:  
<pre>
{
 "items": [
     {
        "courseId": "105",
        "extId": "Physicon_IMUMK_Course_285524",
        "courseHash": "191153621289246190966820186118178188200176110202548",
        "title": "Задачник по биологии, демо-версия",
        "grade": "8;9;10;11",
        "genre": "Задачник",
        "subject": "Биология",
        "itunes_id": "ru.physicon.imumk.Physicon_IMUMK_Course_285524",
        "progress": 0,
        "description": "Задачник по биологии, демо-версия",
        "status": "demo",
        "price": 100,
        "shopUrl": null,
        "google_id": "ru.fizikon.physicon_imumk_course_285524",
        "winstore_id": null,
        "isNew": false,
        "priceBonus": 5000
     }, …
 ],
 "result": "Ok",
 "errorMessage": null
}
</pre>
Необходимо собрать аналог витрины https://imumk.ru/showcase,
т.е. страницу с плашками и фильтрами по предмету, классу, жанру, поиском по названию.
Верстка «резиновая», внешний вид плашек полностью идентичен приведенному на странице.
На кнопке «Попробовать» вместо надписи «Попробовать» вывести цену в рублях из поля price.
Дополнительно разместить на странице переключатель «рубли/бонусы», выводить
соответственно цену в рублях или бонусах.
Витрина должна получать данные асинхронно, фильтрацию осуществлять на клиенте.
Недостающие данные получить методом наблюдения или из html-кода страницы.
Код выложить на гитхаб, страницу опубликовать на GitHub Pages.



// courseHash: "318195250115271701719214121150250168217123912252217"
// courseId: "80"
// description: "280 интерактивных заданий, ↵4 тематические контрольные работы"
// extId: "Physicon_IMUMK_Course_267727"
// genre: "Рабочая тетрадь"
// google_id: "ru.fizikon.physicon_imumk_course_267727"
// grade: "7"
// isNew: false
// itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267727"
// lang: "ru"
// price: 400
// priceBonus: 5000
// progress: 0
// requireUpdate: false
// shopUrl: "https://www.imumk.ru/offer/103"
// size: 0
// status: "free"
// subject: "Алгебра"
// title: "Рабочая тетрадь. Алгебра, 7 класс"
// winstore_id: ""