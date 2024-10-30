document.addEventListener('DOMContentLoaded',addEvents)

function calculateBill() {
    let freeUnit =100;
    let slab= new Map();
    let enteredValue = parseFloat(document.querySelector('#user-ip').value) || 0;
    if (enteredValue <= 100) {
        console.log("No Bill amount for you!!")
    }
    else if (enteredValue <= 500) {
        enteredValue -= freeUnit // neglecting 100 units
        enteredValue>=100? (()=>{slab.set('101-200', 100 *2.35); enteredValue -= 100;})():(()=>{slab.set('101-200', enteredValue *2.35);enteredValue=0})()
       
        enteredValue >=200? (()=>{slab.set('201-400',200*4.7); enteredValue-=200;})():(()=>{slab.set('201-400',enteredValue*4.7);enteredValue=0})();
        enteredValue >0?slab.set('401-500',enteredValue*6.3):''
    }
    else {
        enteredValue -= freeUnit // neglecting 100 units
        slab.set('101-400', 300 *4.7)
        enteredValue -= 300;
        enteredValue >=100? (()=>{slab.set('401-500',100*6.3);enteredValue -= 100;})() :(()=>{slab.set('401-500',enteredValue*6.3);enteredValue = 0;})()
        
        enteredValue >=100? (()=>{slab.set('501-600',100*8.4); enteredValue -= 100;})() :(()=>{slab.set('501-600',enteredValue*8.4);enteredValue = 0;})()
       
        enteredValue >=200? (()=>{slab.set('601-800',200*9.45); enteredValue -= 200;})() :(()=>{slab.set('601-800',enteredValue*9.45);enteredValue = 0;})()
       
        enteredValue >=200? (()=>{slab.set('801-1000',200*10.5);enteredValue -= 200;})() :(()=>{slab.set('801-1000',enteredValue*10.5);enteredValue = 0;})()
        
        enteredValue >0? slab.set('>1000',enteredValue*11.55):''

    }
   showresults(slab)
}
function addEvents(){
let button = document.querySelector('#submit')
button.addEventListener('click',calculateBill)
}

function showresults(data){
    let cols=['Units','Rate']
    let resultEle = document.querySelector('#results');
    resultEle.innerHTML=''
    let table = document.createElement('table');
    let head = document.createElement('thead')
    let body = document.createElement('tbody')
   for(let i=0;i<cols.length;i++){
    let th = document.createElement('th');
    th.textContent = cols[i];
    head.appendChild(th);
   }
   
   console.log(table)
    for(let [key,value] of data){
        let row = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent =key
        let td2 = document.createElement('td');
        td2.textContent=value.toFixed(2);
        row.appendChild(td1);
        row.appendChild(td2);
        body.appendChild(row);

    }
    let lastRow = document.createElement('tr');
    let lastcol1 = document.createElement('td')
    lastcol1.textContent = "Total"
    let lastcol2 = document.createElement('td')
    lastcol2.textContent = data.values().reduce((acc,cur)=>{return acc+cur},0);
    lastRow.appendChild(lastcol1)
    lastRow.appendChild(lastcol2)
    body.appendChild(lastRow);
    table.appendChild(head)
    table.appendChild(body)
    resultEle.appendChild(table)
}

