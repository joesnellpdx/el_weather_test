(function($) {

    var geoLocate = function(){
        var geocoder;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
//Get the latitude and the longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            codeLatLng(lat, lng)
        }

        function errorFunction(){
            alert("Geocoder failed");
        }

        function initialize() {
            geocoder = new google.maps.Geocoder();



        }

        function codeLatLng(lat, lng) {

            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results)
                    if (results[1]) {
                        //formatted address
                        alert(results[0].formatted_address)
                        //find country name
                        for (var i=0; i<results[0].address_components.length; i++) {
                            for (var b=0;b<results[0].address_components[i].types.length;b++) {

                                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    //this is the object you are looking for
                                    city= results[0].address_components[i];
                                    break;
                                }
                            }
                        }
                        //city data
                        alert(city.short_name + " " + city.long_name)


                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }
    };

    function geoFindMe() {
        var output = document.getElementById("out");

        if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

            var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

            output.appendChild(img);
        };

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        };

        output.innerHTML = "<p>Locating…</p>";

        navigator.geolocation.getCurrentPosition(success, error);
    }


    var weatherFunction = function(){
        var key = '8c1a8ef70cc596b2';
        var Weather = 'http://api.wunderground.com/api/' + key + '/conditions/q/CA/San_Francisco.json';

        var Geo={};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,error);
        }
        else {
            alert('Geolocation is not supported');
        }

        function error() {
            alert("That's weird! We couldn't find you!");
        }
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
        }
        $.ajax({
            url : Weather,
            dataType : "jsonp",
            success : function(data) {
                alert(data);
                // get all the information
            }
        });

        var location =data['location']['city'];
        var temp = data['current_observation']['temp_f'];
        var img = data['current_observation']['icon_url'];
        var desc = data['current_observation']['weather'];
        var wind = data['current_observation']['wind_string'];
//setting the spans to the correct parameters
        $('#location').html(location);
        $('#temp').html(temp);
        $('#desc').html(desc);
        $('#wind').html(wind);
//filling the image src attribute with the image url
        $('#img').attr('src', img);
    };

    function codeLatLng(lat, lng) {

        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results)
                if (results[1]) {
                    //formatted address
                    alert(results[0].formatted_address)
                    //find country name
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                //this is the object you are looking for
                                city = results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    //city data
                    alert(city.short_name + " " + city.long_name)


                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

    $(document).ready(function( $ ) {
        geoFindMe();
        // codeLatLng();
        alert('test');
    });

    $(window).load(function( $ ) {

    });

    $(window).resize(function() {
    });

    $(window).scroll(function() {

    });

})(jQuery);
