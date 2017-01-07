$('a#submit').click(function(){ 

	var email = $('input#email').val() || '' ;
	var websites = $('input#websites').val() || '';
	var output = $('select#output').val() || '';
	var recurring = $('select#recurring').val() || '' ;
	var notes = $('textarea#notes').val() || '';
	var login = $('#login').is(':checked');
	
	var valid_email = validateEmail(email);
	var valid_url = validateWebsite(websites);

	valid_email ? $('#invalid-email').hide() : $('#invalid-email').show();
	valid_url ? $('#invalid-url').hide() : $('#invalid-url').show();

	if(valid_email && valid_url){
		$.ajax({
			url: "https://formspree.io/contact@simplyscrape.com",
			method: "POST",
			data: {
				email: email,
				websites: websites,
				output: output,
				recurring: recurring,
				notes: notes,
				login: login
			},
			dataType: "json"
		})
		swal({
				title: "Thanks!", 
				text: "We'll get back to you shortly!", 
				type: "success"
			}, function(){
				window.location.hash = 'faq'
		});
	}
})

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateWebsite(website)
{
	var lower_case_website = website.toLowerCase();
	var is_valid = !_.some(unsupported_sites, function(unsupported_site){
		return website.includes(unsupported_site)
	});
	return is_valid;
}

var unsupported_sites = [
	'linkedin.com',
	'facebook.com'
]