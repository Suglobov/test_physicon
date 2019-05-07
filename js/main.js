const windowsLoad = new Promise((resolve) =>
    window.addEventListener('load', () => {
        resolve('load')
    }));

const state = {
    itemsContainer: null
};

const writeItem = (itemsArr) => new Promise((resolve, reject) => {
    const itemsContainer = document.querySelector('.itemsContainer');
    const itemsSci = itemsArr.map(el => {
        const wrap = document.createElement('div');
        wrap.classList.add('courses-sci');
        wrap.insertAdjacentHTML('afterBegin', `<div class="sci-figure">
        <img src="https://www.imumk.ru/svc/coursecover/${el.courseId}" alt="${el.genre}">
</div>
<div class="sci-info">
    <p class="sci-title">${el.title}</p>
    <p class="sci-grade">${el.grade}</p>
    <p class="sci-genre">${el.genre}</p>
    <p class="sci-meta"><a href="https://www.imumk.ru/offer/${el.courseId}">Подробнее</a></p>
    <p class="sci-controls">
        <a href="#" onclick="_try(115, 'Демо-версия. Интерактивные модели', 'demo')" class="pure-button pure-button-primary btn-fluid">Попробовать</a>
    </p>
</div>`);
        return wrap;
    });
    console.log(itemsSci);
    itemsSci.forEach(el => itemsContainer.appendChild(el));
});
// 0:
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

Promise.all(
    [
        windowsLoad,
        fetch('http://krapipl.imumk.ru:8082/api/mobilev1/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'data': ''}),
        }),
    ])
    .then(res => res[1].json())
    .then(json => {
        console.log(json);
        writeItem(json.items);
    })
    .catch(e => console.log('error', e));
