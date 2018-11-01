
const form = document.querySelector('form');
const loadingImg = document.querySelector('.loading');
const city = document.querySelector('input[name="city"]');
const pin = document.querySelector('input[name="pin"]');
const findId_URL = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=oW8yb70tDQESnSGuH08Clb6EFgCl6MPb&q="


loadingImg.style.display = 'none';
form.addEventListener('submit', formSubmitted);

function formSubmitted(event){
	event.preventDefault();
	const pinValue = pin.value;
	const cityValue = city.value;

	

	loadingImg.style.display = '';
	getId();
	getTemp();

	function getTemp(){
		
	}


	function getId(){
		const idurl = `${findId_URL}${cityValue}`;
		console.log(idurl);

		return fetch(idurl)
			.then(response => response.json(), {'mode': 'no-cors'})
			.then(result => {
				var x = (result[0].Key);
				console.log(x);
				return result[0].Key;
			});
	}
}