function searchAttractions2() {
    var cityName = document.getElementById('cityInput').value;
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=' + cityName + '&category=&language=en&key=F04408D57CEB4CEF99375C4DFDA649BC',
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };
    try {
        $.ajax(settings).done(async function(response) {
            console.log(response);
            var data = response.data;
            for(var i=0 ; i<data.length ; i++) {
                if (data[i].address_obj.country=== "Israel"){
                    var index = i;
                    i=data.length;
                }
            }
            var location_id1 = data[index].location_id;
            console.log(location_id1);
            waitForOneSecond();
            await putPlaces(location_id1);
        });
    } catch (error) {
        console.log(error);
    }
}
function searchAttractions() {
    var cityName = document.getElementById('cityInput').value;
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=' + cityName + '&category=&language=en&key=key',
        method: 'GET',
        headers: {
            accept: 'application/json',
            origin: 'http://localhost', // Set origin to localhost
            'x-requested-with': 'XMLHttpRequest'
        }
    };
    try {
        $.ajax(settings).done(async function(response) {
            console.log(response);
            var data = response.data;
            var index = -1; // Initialize index
            for(var i = 0; i < data.length; i++) {
                if (data[i].address_obj.country === "Israel"){
                    index = i;
                    break; // Exit loop once country is found
                }
            }
            if (index !== -1) {
                var location_id1 = data[index].location_id;
                console.log(location_id1);
                waitForOneSecond();
                await putPlaces(location_id1);
            } else {
                console.log("No location found in Israel.");
            }
        });
    } catch (error) {
        console.log(error);
    }
}


async function putPlaces(location_id1) {
    const settings2 = {
        async: true,
        crossDomain: true,
        url: 'https://tourist-attraction.p.rapidapi.com/search',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'a11a95f425msh7b2bcc464a0b3fep14d70fjsn9eb21c91b03d',
            'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
        },
        data: {
            location_id: '' + location_id1,
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        }
    };
    try {
        $.ajax(settings2).done(function(response) {
            console.log(response);
            var data = response.results.data;
            var html = '<div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">';
            var elementCounter = 0; // Counter to keep track of the number of added elements
            $.each(data, async function(index, value) {
                if (elementCounter < 9) { // Check if the maximum number of elements has been reached
                    var name = value.name;
                    var imgSrc = value.photo.images.original.url;
                    var description = value.description;
                    var address = value.address_obj;
                    html += '<div class="bg-white rounded-lg shadow-lg p-6">' +
                        '<h3 class="attractionName text-lg font-semibold mb-2">' + name + '</h3>' +
                        '<img src="' + imgSrc + '" alt="Restaurant 1" class="w-full h-48 object-cover rounded-lg mb-4">' +
                        '<p class="text-gray-600 mb-4">About:' + description + '<br></p>' +
                        '<p class="openHours text-gray-600 mb-2">' + '' + '</p>' +
                        '<div class="flex items-center space-x-4">' +
                        '<a href="#" class="text-blue-500 hover:text-blue-700"><img src="images/facebook.png" alt="Facebook" class="h-6 w-6"></a>' +
                        '<a href="#" class="text-blue-500 hover:text-blue-700"><img src="images/waze.png" alt="Facebook" class="h-6 w-6"></a>' +
                        '<a href="#" class="text-blue-500 hover:text-blue-700"><img src="images/phone-call.png" alt="Facebook" class="h-6 w-6"></a>' +
                        '</div>' +
                        '</div>';
                    elementCounter++; // Increment the counter
                } else {
                    return false; // Exit the loop if the maximum number of elements has been reached
                }
            });
            html += '</div>';
            $(".container").append(html);
        });
    } catch (error) {
        console.log(error);
    }
}

function waitForOneSecond() {
    setTimeout(function() {
        // Code to be executed after 1 second
        console.log("Waited for 1 second.");
    }, 2000); // 1000 milliseconds = 1 second
}
