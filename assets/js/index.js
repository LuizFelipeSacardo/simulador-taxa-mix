let button = document.querySelector('#button');
let value01 = document.querySelector('#value01').value;
let value02 = document.querySelector('#value02').value;
let tax01 = document.querySelector('#tax01').value;
let tax02 = document.querySelector('#tax02').value;
let periods01 = document.querySelector('#periods01').value;
let periods02 = document.querySelector('#periods02').value;
let periodType01 = document.querySelector('#periodType01').value;
let periodType02 = document.querySelector('#periodType02').value;
let selic = 12.75;
let results = document.querySelector('.results');

button.addEventListener('click', generateResults);


function teste(){
  event.preventDefault();
  let x = valuesPercentagesOverTotal();
  console.log(x)
}


function convertPeriodsToDays(){
  let periods = [];

  let firstPeriod = periods01 * periodType01;
  let secondPeriod = periods02 * periodType02;

  periods.push(firstPeriod);
  periods.push(secondPeriod);

  return periods;
}

function valuesPercentagesOverTotal(){
  let value1 = value01;  
  let value2 = value02;
  let totalValue = Number(value1) + Number(value2);

  let value1Percentage = value1/totalValue;
  let value2Percentage = value2/totalValue;  

  return [value1Percentage, value2Percentage]
}

function ponderateTaxes(){
  let tax1 = tax01;
  let tax2 = tax02;

  let ponderatedTax01 = valuesPercentagesOverTotal()[0]*tax1;
  let ponderatedTax02 = valuesPercentagesOverTotal()[1]*tax2;

  let ponderatedTax = ponderatedTax01 + ponderatedTax02;

  return ponderatedTax;
}

function periodTotalTax(){
  let days = convertPeriodsToDays();
  let days1 = days[0];
  let days2 = days[1];
  let tax1 = tax01;
  let tax2 = tax02;
  let value01Percentage = valuesPercentagesOverTotal()[0];
  let value02Percentage = valuesPercentagesOverTotal()[1];

  let days1Factor = (days1/360);
  let days2Factor = (days2/360);

  let totalTax01 = days1Factor*tax1*value01Percentage;
  let totalTax02 = days2Factor*tax2*value02Percentage;

  let totalPeriodTax = totalTax01+totalTax02;

  return totalPeriodTax;
}

function taxOverSelic(){
  let efetiveTax = ponderateTaxes();
  return efetiveTax/selic;
}

function generateResults(){
  event.preventDefault();
  results.classList.remove('hide');
  button.classList.add('hide')
  let ponderateTax = ponderateTaxes();
  let totalTax = periodTotalTax();
  let valuePercentage01 = valuesPercentagesOverTotal()[0]*100;
  let valuePercentage02 = valuesPercentagesOverTotal()[1]*100;
  let taxOverSelicPercentage = taxOverSelic()*100;

  results.innerHTML = `A taxa MIX anual é de <span class="results__output--highlight-main">${ponderateTax.toFixed(2)}%</span>, o que representa <span class="results__output--highlight">${taxOverSelicPercentage.toFixed(0)}%</span> da taxa Selic atual.<br> A taxa total do período é de <span class="results__output--highlight"> ${totalTax.toFixed(2)}%.</span> <br> Esta simulação apresenta <span class="results__output--highlight"> ${valuePercentage01.toFixed(2)}% </span> de Recursos controlados e <span class="results__output--highlight"> ${valuePercentage02.toFixed(2)}% </span> de recursos livres. <button type="submit" class="form__button" id="redoButton">Refazer</button>`

  window.scrollBy({
    top: 2000,
    behavior: 'smooth'
  });

  let redoButton = document.querySelector('#redoButton');
  redoButton.addEventListener('click', redoSimulation);
}

function redoSimulation(){
  button.classList.remove('hide');
  results.classList.add('hide');

  window.scrollBy({
    top: -100,
    behavior: 'smooth'
  });
}

