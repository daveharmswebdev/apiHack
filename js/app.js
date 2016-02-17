$(function() {
  'use strict'
  var url = 'http://getbible.net/json',
      version = 'kjv',
      book = 'Genesis',
      chapter,
      verseNum;

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
      $.each(result.book, function(i,item) {
        $('#selectChapter').append('<option>'+item.chapter_nr+'</option>');
      })
    });
  }

  var retrieveVerse = function(version,book,chapter,verseNum) {
    $.ajax(url, {dataType:'jsonp',data:'p=' + book + chapter + ':' + verseNum + '&v=' + version,type:'GET'})
    .done(function(result){
      displayVerse(result);
    })
    .fail(function(jqXHR, message, error){ //this waits for the ajax to return with an error promise object
      console.log(message + ' - ' + error);
    });
  };

  var displayVerse = function(retrievedVerse) {
    $.each(retrievedVerse.book, function(i,item) {
      $.each(item.chapter, function(i,item) {
        $('.item--firstLanguage').append('<p>' + item.verse + '</p>');
      })
    })
  }

  $('#selectBook').change(function() {
    book = $(this).val();
    $('#selectChapter').children('option').remove();
    retrieveChapters(book);
  })

  $('#selectChapter').change(function() {
    chapter = $(this).val();
  })

  $('.getScripture').click(function() {
    verseNum = $('.verse').val();
    console.log(verseNum);
    retrieveVerse(version,book,chapter,verseNum)
  });

  // retrieveVerse('kjv','John','3','16-18');
  retrieveBookNames('kjv');
  retrieveChapters('Genesis');

});


//curl -L -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/verses/eng-GNTD:Acts.8.34.xml
// https://TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j:bibles.org/v2/versions/eng-GNTD.js
//
// curl -u 'TbgePk5hPSZ4RM4nTZjIzsyKwcnq8ep2ajz5Dh7j':X -k https://bibles.org/v2/versions/eng-GNTD.xml
