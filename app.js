let mainTable = document.getElementById("mainTable");
let URL_API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
let createList = (list) => {
  apiList = list;
  let tr = `<tr class="fs-3"><th scope="col" class="text-end pe-5 me-5">Coin</th><th scope="col"></th><th scope="col">Price (GBP)</th><th scope="col">24h Volume</th><th scope="col">24h</th><th scope="col">Market Cap</th></tr>`;
  apiList.forEach((element) => {
    let priceChange = new Intl.NumberFormat("en-IN", {maximumSignificantDigits: 2}).format(element.price_change_percentage_24h);
    tr += `<tr class="fs-4"><td class=""><span><img src=${element.image} width="50px" alt=""/></span><span class="ps-3">${element.name}</span></td><td class="">${element.symbol.toUpperCase()}</td><td class="">${element.current_price.toLocaleString()} $</td><td class="">${element.total_volume.toLocaleString()} $</td><td class="chengeColor"><span class="percentage">${priceChange}</span>%</td><td class="">${element.market_cap.toLocaleString()} $</td></tr>`;
  });
  mainTable.innerHTML = tr;
  let percentage = document.querySelectorAll('.percentage');
  percentageList = [...percentage]
  percentageList.forEach((element)=>{
      if(Number(element.innerText) <= 0){
        element.parentElement.classList.add('text-danger')  
      }else{
        element.parentElement.classList.add('text-success')  
      }
  })
};
let filterApi = (list) => {
  let inputSearch = document.getElementById("inputSearch").value.toLowerCase();
  let filterList =list.filter((element) => {
     return element.name.toLowerCase().startsWith(inputSearch);
  });
  createList(filterList)
};
fetch(URL_API)
  .then(res => res.json())
  .then((data) => 
  {createList(data);
    inputSearch.addEventListener("keyup", () => {
      filterApi(data);
    });
  });
