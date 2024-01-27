/*
* Shopping Cart Requirements:
* - Before you start, please run `npm run start:api` to start mock API server
* - data for mock APIs come from ./db/db.json
* - There are 2 APIs you need to call:
*     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
*     - http://localhost:4002/products : this will provide a list of products with full details
*
* We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
* product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
* inside table#shopping-cart-tbl as below:
* ID     Item
* 1001   TV
* 1002   iPad
*
* */
const View = {

  getCart:async function(tbodyElem) {  

    try {
      
      const [products, cart] = await Promise.all([
        fetch('http://localhost:4002/products').then(response => response.json()),
        fetch('http://localhost:4002/cart').then(response => response.json())
      ]);

      const fragment = document.createDocumentFragment();

      cart.map( cartProduct => { 
        let product = products.find(product => product.id === cartProduct.id);
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        td.innerText= product.id;    
        td2.innerText= product.name;    
        tr.append(td)
        tr.append(td2)
        fragment.appendChild(tr)
      });

      tbodyElem.appendChild(fragment);  

    } catch (error) {
      
    }
   
  },
  init: () => {
    const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');
    View.getCart(tbodyElem);   
    console.log('TODO: Please see the above requirement');
  }
};
document.addEventListener('DOMContentLoaded', View.init);
