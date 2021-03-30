import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CategoriesListService from './services/categories-list-service.js';
import CategoryLookupService from './services/category-lookup-service.js';

let categoryIds = [];

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function getCategoryIds(list) {
  console.log(list)
  let randomIndices = [];
  while (randomIndices.length < 5) {
    let randomIndex = Math.floor(Math.random() * 100);
    if (randomIndices.indexOf(randomIndex) === -1) {
      randomIndices.push(randomIndex);
    }
  }

  for (let randomIndex of randomIndices) {
    categoryIds.push(list[randomIndex].id);
  }
}

$(document).ready(function () {


  CategoriesListService.getCategoryList()
    .then(function (categoryListResponse) {
      if (categoryListResponse instanceof Error) {
        throw Error(`Category List API error: ${categoryListResponse.message}`);
      }
      getCategoryIds(categoryListResponse)
      //where we put the catergories ids go
      return CategoryLookupService.getCategory(categoryIds[0]);
    })
    .then(function (categoryResponse1) {
      if (categoryResponse1 instanceof Error) {
        throw Error(`category API error: ${categoryResponse1.message}`);
      }
      console.log(categoryResponse1)
      return CategoryLookupService.getCategory(categoryIds[1]);
    }).then(function (categoryResponse2) {
      if (categoryResponse2 instanceof Error) {
        throw Error(`category API error: ${categoryResponse2.message}`);
      }
      console.log(categoryResponse2)
    }).catch(function (error) {
      displayErrors(error.message);
    });
});