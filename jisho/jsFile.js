
$( document ).ready(function() {
    $.getJSON("http://jisho.org/api/v1/search/words?keyword=%22家%22%20%23jlpt-n5", function(person){

    $.each(person, function(key, value){
        document.write(key+": "+value+"<br />"); 
    });
});
});