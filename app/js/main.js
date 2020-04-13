"use strict";

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

    // for(let i = 0; i < 2; i++) {
    //   let cost = prompt("Введите обязательную статью расходов в этом месяце?");
    //   let price = prompt("Во сколько обойдется?");
    //     if((typeof(cost) !== null) && (typeof(price) !== null) && (cost !== "") && (price !== "")) {
    //       appData.expenses[cost] = price;
    //     } else {
    //       let cost = prompt("Введите обязательную статью расходов в этом месяце?");
    //       let price = prompt("Во сколько обойдется?");
    //     }
      
    //  }
 
let i = 0;
//  while (i < 2) {
//   let cost = prompt("Введите обязательную статью расходов в этом месяце?");
//   let price = prompt("Во сколько обойдется?");
//     if((typeof(cost) !== null) && (typeof(price) !== null) && (cost !== "") && (price !== "")) {
//       appData.expenses[cost] = price;
//     } else {
//       let cost = prompt("Введите обязательную статью расходов в этом месяце?");
//       let price = prompt("Во сколько обойдется?");
//     }
//     i++;
//  }

do {
  let cost = prompt("Введите обязательную статью расходов в этом месяце?");
  let price = prompt("Во сколько обойдется?");
    if((typeof(cost) !== null) && (typeof(price) !== null) && (cost !== "") && (price !== "")) {
      appData.expenses[cost] = price;
    } else {
      let cost = prompt("Введите обязательную статью расходов в этом месяце?");
      let price = prompt("Во сколько обойдется?");
    }
    i++;
} while (i < 2);


console.log(appData);
appData.totalBudget = appData.budget / 30;
alert(`Ваш бюджет на 1 день составляет: ${appData.totalBudget}`);

if (appData.totalBudget < 100) {
  console.log("Минимальный достаток");
} else if (appData.totalBudget > 100 && appData.totalBudget < 2000 ) {
  console.log("Средний достаток");
} else if(appData.totalBudget > 2000) {
  console.log("Высокий достаток");
} else {
  console.log("Введите верные значения");
}