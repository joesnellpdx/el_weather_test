(function($) {

    var geoLocate = function(){
        var geocoder = new google.maps.Geocoder(),
            cityName = '';
            stateName = '';

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
                    if (results[1]) {
                        for (var i=0; i<results[0].address_components.length; i++) {
                            for (var b=0;b<results[0].address_components[i].types.length;b++) {

                                if (results[0].address_components[i].types[b] == "locality"){
                                    city= results[0].address_components[i];
                                } else if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    state= results[0].address_components[i];
                                    break;
                                }
                            }
                        }

                        $('body').find('#out').append(city.long_name + ', ' + state.short_name);
                        cityName = city.long_name;
                        stateName = state.short_name;
                        weatherFunction(cityName, stateName);

                    } else {
                        weatherFunction('null', 'null');
                    }
                } else {
                    weatherFunction('null', 'null');
                }
            });
        }
    };

    var weatherFunction = function(city, state){
        $('body').find('#current, #forecast').empty();
        var data = '';
        if(city == 'null'){
            var currentW = '',
                location = 'Enter Zip Below',
                temp = '',
                desc = '',
                ticon = '';

            currentW = '<div id="w-current" class="w-current">';
            currentW = currentW + '<div class="f-display"><div class="f-display__inner f-display__' + ticon + '"></div></div>';
            currentW = currentW + '<h1 class="w-current__location">' + location + '</h1>';
            currentW = currentW + '<span class="w-current__temp">' + temp + '</span>';
            currentW = currentW + '<span class="w-current__wind">' + desc + '</span>';
            currentW = currentW + '</div>'

            $('body').find('#current').append(currentW);
        } else {
            var key = '8c1a8ef70cc596b2',
                Weather = 'http://api.wunderground.com/api/' + key + '/conditions/q/' + state + '/' + city + '.json',
                Forecast = 'http://api.wunderground.com/api/' + key + '/forecast/q/' + state + '/' + city + '.json',
                today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear();

            today = dd + ' - ' + mm + ' - ' + yyyy;

            $.ajax({
                url: Weather,
                dataType: "jsonp",
                success: function (data) {
                    var test = data['current_observation'];
                    if(test == null){
                        var currentW = '',
                            location = 'Zip Code Error. Try again.',
                            temp = '',
                            desc = '',
                            ticon = '';

                        currentW = '<div id="w-current" class="w-current">';
                        currentW = currentW + '<div class="f-display f-display__' + ticon + '"><div class="f-display__inner"></div></div>';
                        currentW = currentW + '<h1 class="w-current__location">' + location + '</h1>';
                        currentW = currentW + '<span class="w-current__temp">' + temp + '</span>';
                        currentW = currentW + '<span class="w-current__wind">' + desc + '</span>';
                        currentW = currentW + '</div>'

                        $('body').find('#current').append(currentW);
                    } else {
                        var location = data['current_observation']['display_location']['city'] + ', ' + data['current_observation']['display_location']['state'],
                            temp = data['current_observation']['temp_f'],
                            desc = data['current_observation']['weather'],
                            ticon = data['current_observation']['icon'];

                        var currentW = '';

                        currentW = '<div id="w-current" class="w-current">';
                        currentW = currentW + '<div class="f-display f-display__' + ticon + '"><div class="f-display__inner"></div></div>';
                        currentW = currentW + '<h1 class="w-current__location">' + location + '</h1>';
                        currentW = currentW + '<span class="w-current__temp">' + temp + '&#176;</span>';
                        currentW = currentW + '<span class="w-current__wind">' + desc + '</span>';
                        currentW = currentW + '</div>'

                        $('body').find('#current').append(currentW);
                    }

                },
                error: function () {
                    var currentW = '',
                        location = 'Enter Zip Below',
                        temp = '',
                        desc = '',
                        ticon = '';

                    currentW = '<div id="w-current" class="w-current">';
                    currentW = currentW + '<div class="f-display f-display__' + ticon + '"><div class="f-display__inner"></div></div>';
                    currentW = currentW + '<h1 class="w-current__location">' + location + '</h1>';
                    currentW = currentW + '<span class="w-current__temp">' + temp + '</span>';
                    currentW = currentW + '<span class="w-current__wind">' + desc + '</span>';
                    currentW = currentW + '</div>'

                    $('body').find('#current').append(currentW);
                }
            });

            $.ajax({
                url: Forecast,
                dataType: "jsonp",
                success: function (data) {
                    var test = data.forecast;
                    if(test == null){
                        // do nothing
                    } else {

console.log(data);
                        var forecastArray = data.forecast.simpleforecast.forecastday,
                            dayF = '';
                            dayF = '<h2 class="forecast__title">Forecast</h2>';
                            dayF = dayF + '<div class="forecast__container g g-4up">';


                        $.each(forecastArray, function (i, item) {
                            dayI = i + 1,
                            conditions = forecastArray[i].conditions,
                            high = forecastArray[i].high.fahrenheit,
                            low = forecastArray[i].low.fahrenheit
                            icon = forecastArray[i].icon;
                            if(i == 0){
                                date = 'Today';
                            } else {
                                date = forecastArray[i].date.weekday_short;
                            }


                            dayF = dayF + '<div id="day-' + dayI + '" class="w-day w-day__day-' + dayI + ' gi">';
                            dayF = dayF + '<div class="f-display f-display__' + icon + '"><div class="f-display__inner"></div></div>';
                            dayF = dayF + '<p class="w-day__date date-' + dayI + '">' + date + '</p>';
                            dayF = dayF + '<span class="w-day__temp high">' + high + '&#176;</span>/';
                            dayF = dayF + '<span class="w-day__temp low">' + low + '&#176;</span>';
                            dayF = dayF + '<p class="w-day__conditions conditions-' + dayI + '">' + conditions + '</p>';
                            dayF = dayF + '</div>';


                            // var ords = item.orders;
                            // $.each(ords, function(i, ork) {
                            //     alert(ork.BidPrice);
                            // });

                        });​

                    dayF = dayF + '</div>';
                    }
                   
                    $('body').find('.main').addClass('weather-active').find('#forecast').append(dayF).delay(500).queue(function (next) {
                       $('body').addClass('weather-move');
                       next();
                   });
                    $('body').find('#jspdx-loader').removeClass('jspdx-loader--loading');
                },
                error: function () {
                    // do nothing
                }
            });
        }

    };

    var weatherFormSubmit = function(){

        $( '#weather-form' ).submit(function( event ) {
            event.preventDefault();
            var zip = $('#wzip').val();

            if(zip == ''){

            } else {
                getAddressInfoByZip(zip);
            }
        });
    };

    var getAddressInfoByZip = function(zip){
        if(zip.length >= 5 && typeof google != 'undefined'){

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': zip }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var cityName = results[0].address_components[1].long_name;
                    var stateName = results[0].address_components[3].short_name;

                    $('body').find('.main').removeClass('weather-active, weather-move');
                    $('body').find('#jspdx-loader').addClass('jspdx-loader--loading');
                    weatherFunction(cityName, stateName);
                } else {
                    alert("Request failed. Please try again.")
                }
            });
        } else {
            // do nothing
        }
    };

    var formLabel = function(){
        var container = '#weather-form',
            field = '.form-group',
            trigger = 'input';

        // added change and keyup for browser autofill
        $(document).on( 'focus change keyup', field + ' :input', function() {
            $(this).parents(field).addClass('label-active');
        });

        $(document).on( 'blur', field + ' :input', function() {

            if(((!$(this).val()) && ($(this).not('.datepicker'))) || ($(this).val() == '(___) ___-____')){
                $(this).parents(field).removeClass('label-active');
            }
        });
    };


    $(document).ready(function( $ ) {
        geoLocate();
        weatherFormSubmit();
        formLabel();

    });

    $(window).load(function( $ ) {

    });

    $(window).resize(function() {
    });

    $(window).scroll(function() {

    });

})(jQuery);
