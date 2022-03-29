const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
		'X-RapidAPI-Key': '35ab0c20c2msh09b757063fe5943p1774f6jsn6adb7f071aa1'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Tucson%20&days=5', options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        
    })
	.catch(err => console.error(err));