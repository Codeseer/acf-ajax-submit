//listens to all acf_forms on page.
jQuery(function($) {
  acf.add_filter('validation_complete', function( json, form ) {
  	if( !json.errors ) {
      //if no errors stop form from being submitted.
      form.submit(function(event) { event.preventDefault(); submitACF_AJAX(this); return false;});
  	}
    return json;
  });

  //sends the request using FormData object will work with file uploads as well.
  function submitACF_AJAX(form) {
  	var data = new FormData(form);
    var $spinner = $("#acf-form").find('.spinner, .acf-spinner');

  	$.ajax({
      type: 'POST',
      url: window.location.href,
      data: data,
      processData: false,
      contentType: false,
      beforeSend: function(data){
        acf.showSpinner( $spinner );
      }
  	})
  	.done(function(data) {
  		$(form).trigger('acf_submit_complete', data);
      acf.hideSpinner( $spinner );
    })
  	.fail(function(error) {
      $(form).trigger('acf_submit_fail', error);
    });
  }
})
