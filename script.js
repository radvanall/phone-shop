
const showSmallerPricesbtn=document.getElementById("find-selector");
const ascendentSortingBtn=document.getElementById("ascendent");
const descendentSortingBtn=document.getElementById("descendent");

const homeBtn=document.getElementById("home");
const discountBtn=document.getElementById("discount");
const choseFinderBtn=document.getElementById("find-selector");
const choseBrandBtn=document.getElementById("brand-finder");
const chosePriceBtn=document.getElementById("price-finder");
const goBrandBtn=document.getElementById("fbrand");
const goPriceBtn=document.getElementById("fprice")


let products=[];
let sortedProducts=[];
let key=true;
let keyBrand=true;
let keyPrice=true;

function showProducts(){

let xhr=new XMLHttpRequest();

xhr.open('GET','produse.json',true);

    xhr.onload=function(){
        if(this.status==200){
            let productsArray=JSON.parse(this.responseText);

           // console.log(productsArray);
            document.getElementById('card-keeper').innerHTML = ' ';

           for (let i = 0; i < productsArray.length; i++) {
                let prodDiv=document.createElement('div');
                prodDiv.classList.add("card");
             prodDiv.innerHTML=`
               <ul>
                    <li><img src=${productsArray[i].img}
                  " alt=""  width="300"  height="400" 
                   sizes="" srcset="" class="pim"> </li>
                    <li>Name: ${productsArray[i].name}</li>    
                   <li>Price: ${productsArray[i].price}</li>
                   <li>Brand: ${productsArray[i].brand}</li>
                   <li>Reducere: ${productsArray[i].reducere}</li> <li><button class="buy">CUMPARA ACUM</button></li>   
                  </ul>
                  



            `;
         
           products.push(productsArray[i]);
           sortedProducts.push(productsArray[i]);

             document.getElementById('card-keeper').appendChild(prodDiv);   
            };
        }

    }
    xhr.send();

};
window.onload=showProducts;

function showProduct(arr) {
    document.getElementById('card-keeper').innerHTML = ' ';
  
    arr.forEach((item) => {
      const element = document.createElement("div");
      element.classList.add("card");
      element.innerHTML = `
      <ul>
           <li><img src=${item.img}
         " alt=""  width="300"  height="400" 
          sizes="" srcset="" class="pim"> </li>
           <li >Name: ${item.name}</li>    
          <li>Price: ${item.price}</li>
          <li>Brand: ${item.brand}</li>  
          <li>Reducere: ${item.reducere}</li>
          <li><button class="buy">CUMPARA ACUM</button></li>     
      </ul>
      
      `;
      document.getElementById('card-keeper').appendChild(element);
    });
}


 
console.log(products);
function showSmallerPrice() {
  
    let min=document.getElementById('input-min-price').value;
    let max=document.getElementById('input-max-price').value;
    sortedProducts = products.filter(product => {
         return parseFloat(product.price)<parseFloat(max)&&parseFloat(product.price)>parseFloat(min);
    });
    console.log(products);
    showProduct(sortedProducts);
}



function ascendentSorting() {
  sortedProducts.sort(function(a, b){return parseFloat(a.price) - parseFloat(b.price)});
    showProduct(sortedProducts);
  }

  
function descendentSorting() {
  sortedProducts.sort(function(a, b){return parseFloat(b.price) - parseFloat(a.price)});
    showProduct(sortedProducts);
  }


  function brandSorting()
  {
    let str2=document.getElementById('input-brand').value;
    

    sortedProducts=products.filter(product=>{
          
          return  product.brand.toLowerCase()===str2.toLowerCase();
      });
      console.log(products);
      console.log(sortedProducts);
      showProduct(sortedProducts);
  
  }


  
function stringSorting(arr) {
  arr.sort(function(a, b){
    let editedA= a.reducere.slice(0, -1);
    let editedB=b.reducere.slice(0, -1);
    
    return parseFloat(editedB) - parseFloat(editedA)});
  showProduct(arr);
}

  
  function discountSorting()
  {
    
      sortedProducts=[];
      sortedProducts=products.filter(product=>{
          
          return  product.reducere!="0%";
      });
      stringSorting(sortedProducts);
  }
  
   function startPage(){
     products=[];
     sortedProducts=[];
    showProducts();
   }
  function choseButton(){
    if(key){
      document.getElementById("search-selector").classList.remove("hidden");
      document.getElementById("find-selector").innerText="Inchide";
      key=false;
    }else
    {
      document.getElementById("search-selector").classList.add("hidden");
      key=true;
      document.getElementById("findprice").classList.add("hidden");
      document.getElementById("findbrand").classList.add("hidden");
      keyBrand=true;
      keyPrice=true;
      document.getElementById("find-selector").innerText="Cauta";
    }
    
  }

  function choseBrand(){
    if(keyBrand){
      document.getElementById("findbrand").classList.remove("hidden");
      keyBrand=false;
    }else
    {
      document.getElementById("findbrand").classList.add("hidden");
      keyBrand=true;
     
    }

  }


  function chosePrice(){
    if(keyPrice){
      document.getElementById("findprice").classList.remove("hidden");
      keyPrice=false;
    }else
    {
      document.getElementById("findprice").classList.add("hidden");
      keyPrice=true;
     
    }

  }

  ascendentSortingBtn.addEventListener("click",ascendentSorting);
  
  goPriceBtn.addEventListener("click",showSmallerPrice);
  
  descendentSortingBtn.addEventListener("click",descendentSorting);

  goBrandBtn.addEventListener("click",brandSorting);

  homeBtn.addEventListener("click",startPage);

  discountBtn.addEventListener("click",discountSorting);

  choseFinderBtn.addEventListener("click",choseButton);

  choseBrandBtn.addEventListener("click",choseBrand);

  chosePriceBtn.addEventListener("click",chosePrice);

