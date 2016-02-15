$(function() {
  'use strict'

  var appToken = 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j';
  console.log(appToken);

  $('.btn-verse').click(function() {
    var verse = $('.query-verse').val();
    console.log(verse);
  });

  $('.btn-firstLanguage').click(function() {
    var firstLanguage = $('.query-firstLanguage').val();
    console.log(firstLanguage);
  });

  $('.btn-secondLanguage').click(function() {
    var secondLanguage = $('.query-secondLanguage').val();
    console.log(secondLanguage);
  });

});
