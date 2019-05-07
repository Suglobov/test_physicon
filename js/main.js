const compareNumbers = (a, b) => a - b;
const windowsLoad = new Promise((resolve) =>
    window.addEventListener('load', () => {
        resolve('load')
    }));

const state = {
    itemsContainer: null,
    subjects: [],
    genres: [],
    grades: [],
};
const gradeText = (grade) => {
    const gradeArr = grade.split(';');
    if (gradeArr.length === 1) {
        return `${gradeArr[0]} класс`;
    }

    return grade;
};

const writeItem = (itemsArr) => new Promise((resolve, reject) => {
    if (!itemsArr || !itemsArr.length) reject('входной параметр пустой или null');
    const itemsContainer = document.querySelector('.itemsContainer');
    const tmp = {
        subjects: new Set(),
        genres: new Set(),
        grades: new Set(),
    };

    const itemsSci = itemsArr.map(el => {
        tmp.subjects.add(el.subject);
        tmp.genres.add(el.genre);
        el.grade.split(';').forEach(g => {
            tmp.grades.add(g);
        });
        const wrap = document.createElement('div');
        wrap.classList.add('courses-sci');
        wrap.insertAdjacentHTML('afterBegin', [
            `<div class="sci-figure">`,
            `<img src="https://www.imumk.ru/svc/coursecover/${el.courseId}" alt="${el.genre}">`,
            `</div>`,
            `<div class="sci-info">`,
            `<div class="sci-title">${el.subject}</div>`,
            `<div class="sci-grade">${gradeText(el.grade)}</div>`,
            `<div class="sci-genre">${el.genre}</div>`,
            `<div class="sci-meta"><a href="${el.shopUrl}">Подробнее</a></div>`,
            `<div class="sci-controls">`,
            `<a href="${el.shopUrl}" class="sci-button">`,
            `<span class="sci-price sci-hidden">${el.price}</span>`,
            `<span class="sci-bonus sci-hidden">${el.priceBonus}</span>`,
            `</a>`,
            `</div>`,
            `</div>`,
        ].join(''));
        return wrap;
    });
    state.subjects = [...tmp.subjects].sort();
    state.genres = [...tmp.genres].sort();
    state.grades = [...tmp.grades].sort(compareNumbers);
    itemsSci.forEach(el => itemsContainer.appendChild(el));
    resolve();
});

Promise.all(
    [
        windowsLoad,
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
    .then(() => {
        console.log(state);
    })
    .catch(e => console.log('error', e));


