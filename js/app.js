$(function() {
  'use strict'

  console.log('hello dave 2');

  var settings = function() {
    var settings = {
      url: 'http://getbible.net/json',
      dataType:"jsonp",
      data: 'p=Jn3:16&v=kjv',
      type: 'GET',
    }
    return settings;
  };

  var retrieveVerse = function() {
    $.ajax(settings().url, settings())
    .done(function(result){
      console.log(result);
      // displayVerse(result);
      $.each(result.book, function(i,item) {
        console.log(item.chapter);
        $.each(item.chapter, function(i,item) {
          console.log(item.verse);
        })
      })
    })
    .fail(function(jqXHR, message, error){ //this waits for the ajax to return with an error promise object
      console.log(message + ' - ' + error);
    });
  };

  var displayVerse = function(verse) {
    console.log(verse);
    $.each(verse, function(i,item) {
        console.log('each');
        console.log(item.book.chapter);
    })
  };

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

  retrieveVerse();

});


//curl -L -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/verses/eng-GNTD:Acts.8.34.xml
// https://TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j:bibles.org/v2/versions/eng-GNTD.js
//
// curl -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/versions/eng-GNTD.xml
