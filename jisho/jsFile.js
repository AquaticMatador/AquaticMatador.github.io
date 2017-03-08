
$( document ).ready(function() {
  //var words = request.message;
  var jax = new XMLHttpRequest();

  jax.open("GET","http://jisho.org/api/v1/search/words?keyword=house");
  jax.send();
  jax.onreadystatechange = function() {
    if (jax.readyState == 4) {
      var responseText = jax.responseText;
      var responseObject = JSON.parse(responseText);
      var data = responseObject.data;
      var current = data[0];

      
    }
  };
});
