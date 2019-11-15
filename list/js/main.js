alert( "json" );

$.getJSON("https://github.com/MaximilianSteidl/maximiliansteidl.github.io/blob/master/list/js/student.json")
    .done(function( data ) {
       console.log('logging data ' + data)
    });


$.getJSON("https://github.com/MaximilianSteidl/maximiliansteidl.github.io/blob/master/list/js/student.json", function(json) {
    console.log('logging json ' + json); 
}); 