$(function() {
  'use strict'
  var url = 'http://getbible.net/json';

  var retrieveBookNames = function(version) {
    $.ajax(url, {dataType:'jsonp',data: 'v=' + version,type:'GET'})
    .done(function(result){
      $.each(result.version, function(i,item) {
        $('#selectBook').append('<option>'+item.book_name+'</option>');
      })
    })
  }

  var retrieveChapters = function(book) {
    $.ajax(url, {dataType:'jsonp',data: 'p=' + book,type:'GET'})
    .done(function(result){
      console.log(result);
      $.each(result.book, function(i,item) {
        console.log(item.chapter_nr);
        $('#selectChapter').append('<option>'+item.chapter_nr+'</option>');
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

  $('#selectBook').change(function() {
    console.log('change');
  })

  $('.btn-verse').click(function() {
    var verse = $('.query-verse').val();
    console.log(verse);
  });

  // retrieveVerse('kjv','John','3','16-18');
  retrieveBookNames('kjv');
  retrieveChapters('Genesis');

});


//curl -L -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/verses/eng-GNTD:Acts.8.34.xml
// https://TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j:bibles.org/v2/versions/eng-GNTD.js
//
// curl -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/versions/eng-GNTD.xml
