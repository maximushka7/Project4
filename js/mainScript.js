let startBtn = document.getElementById('start'),

    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpencesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),

    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),

    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money,
    time;

startBtn.addEventListener('click', function () {
    time = prompt('"Введите дату в формате YYYY-MM-DD"');
    money = +prompt('Ваш бюджет на месяц?');

    while(isNaN(money) || money == null || money == ' ') {
        money = +prompt('Ваш бюджет на месяц?');
    }

    appData.moneyKey = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear(); // parse() конвентирует полученное время в милисекунды с 1 января 1970
    monthValue.value = new Date(Date.parse(time)).getMonth() +1; // добавляем единицу по скольку, исчисление начинаеться с 0 и получаеться 11 месяцев
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
            if( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50 && b.length < 50) {
                appData.expenses[a] = b;
                sum += +b;
            } else {
                alert('Некорретные данные, попробуйте снова');
                i = i - 1;
            }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {

    for(let i=0; i<optionalExpensesItem.length; i++) {
       let opt = optionalExpensesItem[i].value;
       appData.optionalExpenses[i] = opt;
       optionalExpencesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
   
});



countBudgetBtn.addEventListener('click', function () {
    appData.expensesOneData = money / 30;
    dayBudgetValue.textContent = appData.expensesOneData.toFixed();

    while(money != undefined) {
        if (appData.expensesOneData < 200) {
            levelValue.textContent = 'Минимальный уровень достатка';
            break;
        } else if(appData.expensesOneData > 200 && appData.expensesOneData < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
            break;
        } else if(appData.expensesOneData > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
            break;
        } else {
            levelValue.textContent = 'произошла ошибка';
            break;
        }
    }

    if(money == undefined) {
        dayBudgetValue.textContent = 'Произошла ошибка, сначало нужно рассчитать доход';
    }
    
});

    incomeItem.addEventListener('input', function(){
        let items = incomeItem.value;
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    });
    
    checkSavings.addEventListener('click', function(){
        if(appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
    
                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;
    
                monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
                yearSavingsValue.textContent = appData.yearIncome.toFixed(1); 
        }
    });
    
    
    percentValue.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
    
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
    
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1); 
        }
    });
    

let appData = {
    moneyKey : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false
};