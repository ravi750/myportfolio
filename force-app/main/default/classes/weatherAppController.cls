public with sharing class weatherAppController {
    
    @AuraEnabled
    public static string getWeatherDetails(String input){
        String url = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + '&units=metric' + getKey();
        string response = getResponse(url);
        return response;
    }

    public static string getResponse(String strUrl){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(strUrl);
        req.setTimeout(120000);

        HttpResponse res = new HttpResponse();
        res = h.send(req);

        String responseBody = res.getBody();
        return responseBody;
    }

    public static string getKey(){
        string key = '0c9d0842a8d231e4dd6a17cf7b819b1a';
        string output = '&appid=' + key;
        return output;
    }
}