import { LightningElement } from 'lwc';
const API_KEY = '0c9d0842a8d231e4dd6a17cf7b819b1a';

import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons';

export default class WeatherApp extends LightningElement {

    clearIcon = WEATHER_ICONS+'/weatherAppIcons/clear.svg';
    cloudIcon = WEATHER_ICONS+'/weatherAppIcons/cloud.svg';
    dropletIcon = WEATHER_ICONS+'/weatherAppIcons/droplet.svg';
    hazeIcon = WEATHER_ICONS+'/weatherAppIcons/haze.svg';
    mapIcon = WEATHER_ICONS+'/weatherAppIcons/map.svg';
    rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain.svg';
    snowIcon = WEATHER_ICONS+'/weatherAppIcons/snow.svg';
    stromIcon = WEATHER_ICONS+'/weatherAppIcons/strom.svg';
    thermometerIcon = WEATHER_ICONS+'/weatherAppIcons/thermometer.svg';
    arrowBackIcon = WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg';

    loadingText = '';
    isError = false;
    cityName = '';

    get loadingClasses(){
        return this.isError ? 'error-message':'success-message';
    }

    searchHandler(event){
        this.cityName = event.target.value;
    }

    submitHandler(event){
        event.preventDefault();
        this.fetchData();
    }

    fetchData(){
        this.isError = false;
        this.loadingText = 'Fetching weather details...';
        console.log('cityName=== ', this.cityName);

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;
        fetch(URL).then(res=>res.json()).then(result=>{
            console.log(JSON.stringify(result));
            //this.loadingText = '';
            this.weatherDetails(result);
        }).catch((error)=>{
            console.error(error);
            this.loadingText = "Something went wrong";
            this.isError= true;
        });
    }

    weatherDetails(info){
        if(info.cod === '404'){
            this.isError = true;
            this.loadingText = `${this.cityName} is not a valid city name`;
        }
        else{
            this.loadingText = '';
        }
    }
}