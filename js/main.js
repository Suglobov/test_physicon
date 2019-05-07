const compareNumbers = (a, b) => a - b; // для сортировки чисел
// классы указаны через ;, надо выводить как x-y классы или x класс
const gradeText = (grade) => {
    const gradeArr = grade.split(';');
    if (gradeArr.length === 1) {
        return `${gradeArr[0]} класс`;
    }
    return `${gradeArr[0]}-${gradeArr[gradeArr.length - 1]} классы`;
};

const state = {}; // сюда сохранятся всякие объекты
// ждем загрузки страницы
const windowsLoad = () => new Promise((resolve) =>
    window.addEventListener('load', () => resolve('load')));
// находим нужные элементы на странице
const findDomElems = () => new Promise((resolve, reject) => {
    state.itemsContainer = document.querySelector('.itemsContainer');
    state.subjectsControl = document.querySelector('.controls .subjects');
    state.genresControl = document.querySelector('.controls .genres');
    state.gradesControl = document.querySelector('.controls .grades');
    state.search = document.querySelector('.controls .search');
    state.priceBonus = document.querySelector('.controls .priceBonusInput');
    if (!state.itemsContainer) reject('itemsContainer не найден');
    if (!state.subjectsControl) reject('controlSubjects не найден');
    if (!state.genresControl) reject('controlGenres не найден');
    if (!state.gradesControl) reject('controlGenres не найден');
    if (!state.search) reject('search не найден');
    if (!state.priceBonus) reject('priceBonus не найден');
    resolve();
});
// загрузка страницы и поиск элементов
const loadAndFind = async () => {
    const load = await windowsLoad();
    const find = await findDomElems();
    return Promise.resolve('load and find');
};
// размещаем эелементы на странице
const writeItem = (itemsArr) => {
    if (!itemsArr || !itemsArr.length) return;
    const itemsContainer = state.itemsContainer; // контейнер для эелементов
    const tmp = { // данные для селектов без повторений значений
        subjects: new Set(),
        genres: new Set(),
        grades: new Set(),
    };

    const items = itemsArr.map(el => {
        tmp.subjects.add(el.subject);
        tmp.genres.add(el.genre);
        el.grade.split(';').forEach(g => {
            tmp.grades.add(g);
        });
        const wrap = document.createElement('div');
        wrap.classList.add('courses-sci');
        wrap.dataset.subjects = el.subject;
        wrap.dataset.genres = el.genre;
        wrap.dataset.grades = el.grade;
        wrap.dataset.title = el.title;
        wrap.insertAdjacentHTML('afterBegin', [
            `<div class="sci-figure">`,
            `<img src="https://www.imumk.ru/svc/coursecover/${el.courseId}" alt="${el.genre}">`, `</div>`,
            `<div class="sci-info">`,
            `<div class="sci-title">${el.subject}</div>`,
            `<div class="sci-grade">${gradeText(el.grade)}</div>`,
            `<div class="sci-genre">${el.genre}</div>`,
            `<div class="sci-meta"><a href="${el.shopUrl}">Подробнее</a></div>`,
            `<div class="sci-controls">`,
            `<a href="${el.shopUrl}" class="sci-button">`,
            `<span class="sci-price sci-hidden">${el.price}</span>`,
            `<span class="sci-bonus sci-hidden">${el.priceBonus}</span>`,
            `</a>`, `</div>`, `</div>`,
        ].join(''));
        return wrap;
    });
    state.subjects = [...tmp.subjects].sort();
    state.genres = [...tmp.genres].sort();
    state.grades = [...tmp.grades].sort(compareNumbers);
    state.items = items;
    items.forEach(el => itemsContainer.appendChild(el));
};
// заполняем селекты значениями для фильтрации
const fillingControll = () => {
    const addOptions = (element) => {
        state[element].forEach(el => {
            const option = document.createElement('option');
            option.text = el;
            state[`${element}Control`].appendChild(option);
        })
    };
    addOptions('subjects');
    addOptions('genres');
    addOptions('grades');
};
// вешаем слушателей на изменения в селекте
const listenControll = () => {
    const listener = (element, multiVal = false) => {
        const hiddenClass = `itemSizeReduction-${element}`;
        state[`${element}Control`].addEventListener('change', ({target}) => {
            state.items.forEach(el => {
                if (target.selectedIndex === 0) {
                    el.classList.remove(hiddenClass);
                } else {
                    if (!multiVal && el.dataset[element] === target.value) {
                        el.classList.remove(hiddenClass);
                    } else if (multiVal && el.dataset[element].split(';').includes(target.value)) {
                        el.classList.remove(hiddenClass);
                    } else {
                        el.classList.add(hiddenClass);
                    }
                }
            });
        });
    };
    listener('subjects');
    listener('genres');
    listener('grades', true);
};
// слушатель для поисковой строки
const listenSearch = () => {
    const hiddenClass = `itemSizeReduction-search`;
    state.search.addEventListener('input', ({target}) => {
        state.items.forEach(el => {
            if (target.value === '') {
                el.classList.remove(hiddenClass);
            } else {
                if (el.dataset.title.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())) {
                    el.classList.remove(hiddenClass);
                } else {
                    el.classList.add(hiddenClass);
                }
            }
        });
    });
};
// параллельно делаем фетч и ждем загрузки страницы
Promise.all(
    [
        loadAndFind(),
        fetch('https://cors-anywhere.herokuapp.com/http://krapipl.imumk.ru:8082/api/mobilev1/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'data': ''}),
        }),
    ])
    .then(res => res[1].json())
    .then((json) => writeItem(json.items))
    .then(() => fillingControll())
    .then(() => listenControll())
    .then(() => listenSearch())
    .catch(e => console.log('error:', e));


