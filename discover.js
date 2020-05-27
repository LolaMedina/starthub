// use fetch to retrieve the products and pass them to init
// report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('products.json').then(function(response) {
    return response.json();
  }).then(function(json) {
    let products = json;
    initialize(products);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });
  
  // sets up the app logic, declares required variables, contains all the other functions
  function initialize(products) {
    // grab the UI elements that we need to manipulate
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const container = document.querySelector('.container');
    const check = document.querySelector('.check');
  
    // keep a record of what the last category and search term entered were
    let lastCategory = category.value;
    // no search has been made yet
    let lastSearch = '';
  
    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
    let categoryGroup;
    let finalGroup;
  
    // To start with, set finalGroup to equal the entire products database
    // then run updateDisplay(), so ALL products are displayed initially.
    finalGroup = products;
    updateDisplay();
  
    // Set both to equal an empty array, in time for searches to be run
    categoryGroup = [];
    finalGroup = [];
  
    // when the search button is clicked, invoke selectCategory() to start
    // a search running to select the category of products we want to display
    searchBtn.onclick = selectCategory;
  
    function selectCategory(e) {
      // Use preventDefault() to stop the form submitting — that would ruin
      // the experience
      e.preventDefault();
  
      // Set these back to empty arrays, to clear out the previous search
      categoryGroup = [];
      finalGroup = [];
  
      // if the category and search term are the same as they were the last time a
      // search was run, the results will be the same, so there is no point running
      // it again — just return out of the function
      if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
        return;
      } else {
        // update the record of last category and search term
        lastCategory = category.value;
        lastSearch = searchTerm.value.trim();
        // In this case we want to select all products, then filter them by the search
        // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
        if(category.value === 'All') {
          categoryGroup = products;
          selectProducts();
        // If a specific category is chosen, we need to filter out the products not in that
        // category, then put the remaining products inside categoryGroup, before running
        // selectProducts()
        } else {
          // the values in the <option> elements are uppercase, whereas the categories
          // store in the JSON (under "type") are lowercase. We therefore need to convert
          // to lower case before we do a comparison
          let lowerCaseType = category.value.toLowerCase();
          for(let i = 0; i < products.length ; i++) {
            // If a product's type property is the same as the chosen category, we want to
            // display it, so we push it onto the categoryGroup array
            if(products[i].typeId === lowerCaseType) {
              categoryGroup.push(products[i]);
            }
          }
  
          // Run selectProducts() after the filtering has been done
          selectProducts();
        }
      }
    }
  
    // selectProducts() Takes the group of products selected by selectCategory(), and further
    // filters them by the tiered search term (if one has been entered)
    function selectProducts() {
      // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
      // array — we don't want to filter the products further — then run updateDisplay().
      if(searchTerm.value.trim() === '') {
        finalGroup = categoryGroup;
        updateDisplay();
      } else {
        // Make sure the search term is converted to lower case before comparison. We've kept the
        // product names all lower case to keep things simple
        let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
        // For each product in categoryGroup, see if the search term is contained inside the product name
        // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
        // onto the finalGroup array
        for(let i = 0; i < categoryGroup.length ; i++) {
          if(categoryGroup[i].typeName.indexOf(lowerCaseSearchTerm) !== -1) {
            finalGroup.push(categoryGroup[i]);
          }
        }
  
        // run updateDisplay() after this second round of filtering has been done
        updateDisplay();
      }
  
    }
  
    // start the process of updating the display with the new set of products
    function updateDisplay() {
      // remove the previous contents of the <main> element
      while (check.firstChild) {
        check.removeChild(check.firstChild);
      }
  
      // if no products match the search term, display a "No results to display" message
      if(finalGroup.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results to display!';
        // container.appendChild(check);
        check.appendChild(para);
      // for each product we want to display, pass its product object to fetchBlob()
      } else {
        for(let i = 0; i < finalGroup.length; i++) {
          fetchBlob(finalGroup[i]);
        }
      }
    }
  
    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlob(product) {
      // construct the URL path to the image file from the product.image property
      let url = 'images/' + product.image;
      // Use fetch to fetch the image, and convert the resulting response to a blob
      // Again, if any errors occur we report them in the console.
      fetch(url).then(function(response) {
          return response.blob();
      }).then(function(blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        let objectURL = URL.createObjectURL(blob);
        // invoke showProduct
        showProduct(objectURL, product);
      });
    }
  
    // Display a product inside the <main> element
    function showProduct(objectURL, product) {
      // create <section>, <h2>, <p>, and <img> elements
      const div_one = document.createElement('div');
      div_one.className = 'col-12 col-4 col-6 col-3';

      const div_two = document.createElement('div');
      div_two.className = "item";

      const div_three = document.createElement('div');
      div_three.className = "img-item";

      const div_four = document.createElement('div');
      div_four.className = "text-item-one";

      const div_five = document.createElement('div');
      div_five.className = "text-item-two";

      const div_six = document.createElement('div');
      div_six.className = "button_clear";

      const image = document.createElement('img');
      const heading_four = document.createElement('h4');
      const para = document.createElement('p');
      const heading_five = document.createElement('h5');

      const icon_one = document.createElement('img');
      icon_one.className = "icon_one";
     
      const icon_two = document.createElement('img');
      icon_two.className = "icon_two";

      const icon_three = document.createElement('img');
      icon_three.className = "icon_three";

    //   const button = document.createElement('button');
    //   button.className = "preview-button";
    //   button.textContent = "Preview";

      const a_one = document.createElement('a');
      a_one.href = product.twitter;
      const a_two = document.createElement('a');
      a_two.href = product.linkedln;
      const a_three = document.createElement('a');
      a_three.href = product.github;
      const a_four = document.createElement('a');
      a_four.href = product.github_url;

      function setAttributes(el, attrs) {
            for (var key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
      }
      setAttributes (a_one, { "target": "_blank"});
      setAttributes (a_two, {"target": "_blank"});
      setAttributes (a_three, {"target": "_blank"});
    //   setAttributes (a_four, {"target": "_blank"});
  
      // give the <section> a classname equal to the product "type" property so it will display the correct icon
    //   section.setAttribute('class', product.type);
  
      // Give the <h2> textContent equal to the product "name" property, but with the first character
      // replaced with the uppercase version of the first character
      heading_four.textContent = product.typeName.replace(product.typeName.charAt(0), product.typeName.charAt(0).toUpperCase());
      heading_five.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
      
  
      // Give the <p> textContent equal to the product "price" property, with a $ sign in front
      // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
      // as 1.40, not 1.4.
      para.textContent = '@' + product.slackId;
  
      // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
      image.src = objectURL;
      image.alt = product.typeName; 
      
      // append the elements to the DOM as appropriate, to add the product to the UI
      container.appendChild(check);
      check.appendChild(div_one);
      div_one.appendChild(div_two);
      div_two.appendChild(div_three);
      div_two.appendChild(div_four);
      div_two.appendChild(div_five);
      div_three.appendChild(image);
      div_four.appendChild(heading_four);
      div_four.appendChild(heading_five);
      div_four.appendChild(para);
      div_five.appendChild(a_one);
      a_one.appendChild(icon_one);
      div_five.appendChild(a_two);
      a_two.appendChild(icon_two);
      div_five.appendChild(a_three);
      a_three.appendChild(icon_three);
    //   div_five.appendChild(a_four);
    //   a_four.appendChild(button);
      div_five.appendChild(div_six);

    }
    
}
  