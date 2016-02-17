$(function() {
  'use strict'
  var url = 'http://getbible.net/json';

  console.log('hello dave 2');

  var settings = function() {
    var settings = {
      dataType:"jsonp",
      data: 'p=Jn3:16&v=kjv',
      data: 'v=kjv',
      type: 'GET',
    }
    return settings;
  };

  var retrieveBookNames = function(version) {
    $.ajax(url, {dataType:'jsonp',data: 'v=' + version,type:'GET'})
    .done(function(result){
      $.each(result.version, function(i,item) {
        console.log(item.book_name);
      })
    })
  }

  var retrieveChapters = function(book) {
    $.ajax(url, {dataType:'jsonp',data: 'p=' + book,type:'GET'})
    .done(function(result){
      console.log(result);
      $.each(result.book, function(i,item) {
        console.log(item.chapter_nr);
      })
    });
  }

  var retrieveVerse = function(version,book,chapter,verse) {
    $.ajax(url, {dataType:'jsonp',data:'p=' + book + chapter + ':' + verse + '&v=' + version,type:'GET'})
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

  retrieveVerse('kjv','John','3','16-18');
  // retrieveBookNames('kjv');
  // retrieveChapters('Exodus');

});


//curl -L -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/verses/eng-GNTD:Acts.8.34.xml
// https://TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j:bibles.org/v2/versions/eng-GNTD.js
//
// curl -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/versions/eng-GNTD.xml
