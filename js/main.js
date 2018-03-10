$(document).ready(function(){

	$('#colorsSelector .colorItem').on('click',function(){
		let img = $(this).attr('data-img-path');


		$('#imgHolder img').fadeOut(function(){
			$(this).attr('src' , img).fadeIn();
		});
	})

	
	let modelSpecs = '' ,
		modelPrice = 0,
		modelSpecsHolder = $('#modelSpecs') ,
		modelPriceHolder = $('#modelPrice'),
		modelPriceHolderUSD = $('#modelPriceUSD')
	calculatePrice();
	compileSpecs();
	
	function calculatePrice(){
		let modelPriceEngine ,
		 	modelPriceTransmission ,
			modelPricePackage;

		modelPriceEngine = +$('input[name=engine]:checked', '#autoForm').val();
		modelPriceTransmission = +$('input[name=transmission]:checked', '#autoForm').val();
		modelPricePackage = +$('input[name=package]:checked', '#autoForm').val();
		
		modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;


		modelPriceHolder.text(addSpace(modelPrice) + ' рублей');
		
	}

	function compileSpecs(){
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text() + ',';
		modelSpecs += $('input[name=transmission]:checked + label', '#autoForm').text()+ ',';
		modelSpecs += $('input[name=package]:checked + label', '#autoForm').text();
		modelSpecsHolder.text(modelSpecs);
	}
	
	$('#autoForm').on('change',function(e){
		calculatePrice();
		compileSpecs();
		calculateUSD();
	})


	const currentUrl = 'https://openexchangerates.org/api/latest.json?app_id=5ae2f3c6bd62418faaecaba89308dbf6';
	let rurUsdRate = 0;
	$.ajax({
		url : currentUrl,
		cache : false,
		success: function (response) {
			console.log(response.rates.RUB);
			rurUsdRate = response.rates.RUB;
			calculateUSD()
		}
	});

	function calculateUSD(){
		let modelPriceUSD = modelPrice / rurUsdRate;
		
		modelPriceHolderUSD.text( addSpace( modelPriceUSD.toFixed()) + ' $' );
	}
	
	function addSpace(nStr) {
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	    }
	    return x1 + x2;
	}
});