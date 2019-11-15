alert( "json" );
$.getJSON("list/js/student.json")
    .done(function( data ) {
       console.log('logging data ' + data)
    });


$.getJSON("list/js/student.json", function(json) {
    console.log('logging json ' + json); 
}); 