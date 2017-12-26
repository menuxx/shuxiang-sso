
import isEmpty from 'is-empty'
// https://github.com/cburgmer/rasterizeHTML.js
import * as rasterizeHTML from 'rasterizehtml'

document.querySelector('#btn1').addEventListener('click', function (event) {
  rasterizeHTML.drawHTML(
    document.querySelector('#draw').innerHTML.replace(/^ {8}/gm, "").replace(/^\n/g, "").replace(/\n +$/g, "\n"),
    document.querySelector('#canvas')).then(function (result) {
    console.log(result);
  }, function (e) {
    console.log('An error occured:', e);
  });
})
