let money = prompt("Ваш бюджет на месяц"),
    time  = prompt("Введите вашу дату в формате YYYY-MM-DD"),
    appData = {
      budget: money,
      timeData: time,
      expenses: {

      },
      optionalExpensex: {

      },
      income: [],
      savings:false
    };

let cost1 = prompt("Введите обязательную статью расходов в этом месяце?");
let price1 = prompt("Во сколько обойдется?");
let cost2 = prompt("Введите обязательную статью расходов в этом месяце?");
let price2 = prompt("Во сколько обойдется?");


appData.expenses.cost1 = price1;
appData.expenses.cost2 = price2;

console.log(appData);
let totalBudget = money / 30;
alert(`Ваш бюджет на 1 день составляет: ${totalBudget}`);