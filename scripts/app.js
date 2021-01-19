"Use strict";

const form = document.querySelector('form'),
    input = form.querySelector('.send_text'),
    messageArea = document.querySelector('.message-area');

const phrases = {
    default: {
        quest: "Здраствуйте! Меня зовут Иван, я помогу Вам высчитать Вашу суточную норму калорий. Как я могу к Вам обращаться?",
        options: [],
    },
    first: {
        quest: "Укажите Ваш пол",
        options: ["Мужской", "Женский"]
    },
    second: {
        quest: "Укажите Вашу физическую активность",
        options: [
            "Минимальный уровень (без нагрузок)",
            "Низкий уровень (физические нагрузки 1-3 раза в неделю)",
            "Cредний уровень (3-5 дней в неделю)",
            "Высокий уровень (6-7 раз)",
            "Очень высокий уровень (тренировки чаще, чем раз в день)"
        ]
    },
    third: {
        quest: "Укажите Ваш вес?",
        options: []
    },
    fourth: {
        quest: "Укажите Ваш рост?",
        options: []
    },
    fifth: {
        quest: "Укажите Ваш возраст?",
        options: []
    },
    succes: {
        quest: "Ура",
        options: []
    }
}

function makeQuest(quest, addClass) {
    const element = document.createElement('div');
    messageArea.innerHTML = '';
    element.classList.add('text_bot');
    element.textContent = quest.quest;
    messageArea.append(element);
    form.style.display = 'block';
    if (quest.options.length > 0) {
        form.style.display = 'none';
        quest.options.forEach((item) => {
            let choice = document.createElement('div');
            choice.classList.add(addClass);
            choice.textContent = item;
            messageArea.append(choice);
        })
    }
}



makeQuest(phrases.default);

form.addEventListener('submit', e => {
    e.preventDefault();
    total();
    calculator();
    e.target.reset();
})

let obj = {};

function getName() {
    if (!obj.first && !obj.weight && !obj.height && !obj.age && !obj.gender) {
        if (isNaN(input.value)) {
            const a = input.value;
            obj.name = a;
            makeQuest(phrases.first, "first_choice_message");
        } else {
            makeQuest(phrases.default);
        }
    }
}

function getGender() {

    if (!obj.gender && !obj.weight && !obj.height && !obj.age) {
        messageArea.addEventListener('click', e => {
            const target = e.target;
            if (target && target.classList.contains('first_choice_message')) {
                obj.gender = target.innerText;
                makeQuest(phrases.second, 'second_choice_message');
            }
        })
    }
}

function getRatio() {
    if (!obj.ratio) {
        messageArea.addEventListener('click', e => {
            const target = e.target;
            if (target && target.classList.contains('second_choice_message')) {
                obj.ratio = target.innerText;
                makeQuest(phrases.third);
            }
        })
    }
}

function getWeight() {
    if (!obj.weight && obj.name && obj.ratio) {
        if (!isNaN(input.value)) {
            const b = input.value;
            obj.weight = b;
            makeQuest(phrases.fourth)
        } else {
            makeQuest(phrases.third)
        }
    }
}

function getHeight() {
    if (!obj.height && obj.weight) {
        if (!isNaN(input.value)) {
            let c = input.value;
            obj.height = c;
            makeQuest(phrases.fifth)
        } else {
            makeQuest(phrases.fourth)
        }
    }
}

function getAge() {
    if (!obj.age && obj.weight && obj.height) {
        if (!isNaN(input.value)) {
            let d = input.value;
            obj.age = d;
        } else {
            makeQuest(phrases.fifth)
        }
    }
}

function total() {
    getAge();
    getHeight();
    getWeight();
    getRatio();
    getGender()
    getName();
}

function calculator() {
    let koef;
    if (obj.ratio == 'Минимальный уровень (без нагрузок)') {
        koef = 1.2
    }
    if (obj.ratio == "Низкий уровень (физические нагрузки 1-3 раза в неделю)") {
        koef = 1.375
    }
    if (obj.ratio == "Cредний уровень (3-5 дней в неделю)") {
        koef = 1.55
    }
    if (obj.ratio == "Высокий уровень (6-7 раз)") {
        koef = 1.725;
    }
    if (obj.ratio == "Очень высокий уровень (тренировки чаще, чем раз в день)") {
        koef = 1.9
    }
    if (obj.gender === 'Мужской') {
        let result = ((88.36 + (13.4 * +obj.weight) + (4.8 * +obj.height) - (5.7 * obj.age)) * koef).toFixed(2);
        console.log(result);
    } else {
        let result = ((447.6 + (9.2 * +obj.weight) + (3.1 * +obj.height) - (4.3 * obj.age)) * koef).toFixed(2);
        console.log(result);
    }
}