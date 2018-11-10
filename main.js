
const form = document.querySelector('form');
const loadingImg = document.querySelector('.loading');
const city = document.querySelector('input[name="city"]');
const resultArea = document.querySelector('#tempSection');
const error = document.querySelector('.error');
const findId_URL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=oW8yb70tDQESnSGuH08Clb6EFgCl6MPb&q=";
const getWeather = "http://dataservice.accuweather.com/currentconditions/v1/";
const API_key = "?apikey=oW8yb70tDQESnSGuH08Clb6EFgCl6MPb";


loadingImg.style.display = 'none';
form.addEventListener('submit', formSubmitted);



function formSubmitted(event){
	event.preventDefault();
	const cityValue = city.value;


	if(!cityValue){
		alert('Please Enter City Name!!');
	 	city.focus();
	}

	else{
	
	resultArea.innerHTML = '';
	loadingImg.style.display = '';
	getTemp();
	}


	function getTemp(){
		var cityId = getId();


		cityId.then(function(result) {
   			const tempURL = `${getWeather}${result}${API_key}`;
   			// console.log(tempURL);
   			return fetch(tempURL)
   				.then(response => response.json(), {'mode': 'no-cors'})
   				.then(result => {
   					var temp = result[0].Temperature.Metric.Value + ' &deg;' + result[0].Temperature.Metric.Unit;
   					
   					form.reset();
   					loadingImg.style.display = 'none';
   					var note = cityValue + ' : ' + temp;
   					// console.log(note);
   					resultArea.innerHTML = note;
			});
		})
	}


	function getId(){
		const idurl = `${findId_URL}${cityValue}`;

		return fetch(idurl)
			.then(response => response.json(), {'mode': 'no-cors'})
			.then(result => {
				var x = (result[0].Key);
				return parseInt(result[0].Key);
			});
	}
}