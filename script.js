'use strict';

const select = document.getElementById('cars');
const text = document.getElementById('text');

const getData = () => {
   return fetch('./cars.json').then(res => res.json()).catch(err => console.log(err.message));
};

const renderCars = () => {
   getData().then(data => {
      data.cars.forEach(item => {
         const option = document.createElement('option');
         option.value = item.model;
         option.textContent = item.brand;
         select.append(option);
      })
   }).catch(err => console.log(err.message));
}

const showCarsInfo = (option) => {
   if (option.value === '') text.textContent = option.textContent;

   getData().then(data => {
      data.cars.forEach(item => {
         if (option.value === item.model && option.textContent === item.brand)
            text.innerHTML =  `<div>Тачка: ${item.brand} ${item.model}</div><div>Цена: ${item.price}$</div>`;
      });
   }).catch(err => console.log(err.message));
}


select.addEventListener('change', () => {
   const selectedOption = select.options[select.selectedIndex];
   showCarsInfo(selectedOption);
});

renderCars();