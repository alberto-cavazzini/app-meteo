(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    //API di OpenWeatherMap per ottenere informazioni meteorologiche
    var Weather = /** @class */ (function () {
        function Weather() {
            this.weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather";
            this.geocodingEndpoint = "https://api.openweathermap.org/geo/1.0/direct";
            this.forecastEndpoint = "https://api.openweathermap.org/data/2.5/forecast";
            this.setting = { units: "metric", lang: "it" };
            this.apiKey = "7ffe7774698b87adefd37076515752ec";
        }
        Weather.getInstance = function () {
            if (!Weather.instance) {
                Weather.instance = new Weather();
            }
            return Weather.instance;
        };
        Weather.prototype.getLocations = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("".concat(this.geocodingEndpoint, "?q=").concat(query, "&limit=5&appid=").concat(this.apiKey, "&lang=").concat(this.setting.lang))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Weather.prototype.getCurrentWeather = function (lat, lon) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("".concat(this.weatherEndpoint, "?lat=").concat(lat, "&lon=").concat(lon, "&appid=").concat(this.apiKey, "&units=").concat(this.setting.units, "&lang=").concat(this.setting.lang))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Weather.prototype.getForecast = function (lat, lon) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("".concat(this.forecastEndpoint, "?lat=").concat(lat, "&lon=").concat(lon, "&appid=").concat(this.apiKey, "&units=").concat(this.setting.units, "&lang=").concat(this.setting.lang))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            data.list = this.filterForecast(data.list);
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Weather.prototype.filterForecast = function (forecast) {
            var foundDays = [];
            var filteredForecast = [];
            forecast.forEach(function (forecastWeather) {
                var date = forecastWeather.dt_txt.split(' ')[0];
                if (foundDays.indexOf(date) === -1) {
                    foundDays.push(date);
                    filteredForecast.push(forecastWeather);
                }
                else {
                    return;
                }
            });
            return filteredForecast;
        };
        return Weather;
    }());

    var citySearchForm = document.querySelector('.city-search-form');
    if (citySearchForm) {
        citySearchForm.addEventListener('submit', function (e) { return __awaiter(void 0, void 0, void 0, function () {
            var cityInput, searchResults, city, weather, locations, li;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        cityInput = citySearchForm.querySelector('.city');
                        searchResults = citySearchForm.querySelector('.search-results');
                        city = cityInput.value;
                        weather = Weather.getInstance();
                        return [4 /*yield*/, weather.getLocations(city)];
                    case 1:
                        locations = _a.sent();
                        searchResults.innerHTML = '';
                        if (!locations.length) {
                            li = document.createElement('li');
                            li.textContent = 'Nessun risultato trovato';
                            searchResults.appendChild(li);
                            return [2 /*return*/];
                        }
                        locations.forEach(function (location) {
                            var li = document.createElement('li');
                            var button = document.createElement('button');
                            button.textContent = "".concat(location.name, ", ").concat(location.state, ", ").concat(location.country);
                            button.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    searchResults.innerHTML = '';
                                    Promise.all([
                                        weather.getCurrentWeather(location.lat, location.lon),
                                        weather.getForecast(location.lat, location.lon)
                                    ]).then(function (_a) {
                                        var currentWeather = _a[0], forecast = _a[1];
                                        showWeatherData(currentWeather, forecast);
                                    });
                                    return [2 /*return*/];
                                });
                            }); });
                            li.appendChild(button);
                            searchResults.appendChild(li);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    function showWeatherData(currentWeather, forecast) {
        var weatherMain = document.querySelector('.weather-main');
        var weatherLocation = document.querySelector('.weather-location');
        var weatherTemperature = document.querySelector('.weather-temperature');
        var weatherStats = document.querySelector('.weather-stats');
        var weatherDaily = document.querySelector('.weather-daily ul');
        weatherStats.className = 'weather-stats';
        weatherStats.classList.add(currentWeather.weather[0].main.toLowerCase());
        weatherMain.textContent = currentWeather.weather[0].description;
        weatherLocation.textContent = currentWeather.name;
        weatherTemperature.textContent = "".concat(Math.round(currentWeather.main.temp), "\u00B0C");
        weatherDaily.innerHTML = '';
        var forecastElements = createWeatherDay(forecast);
        forecastElements.forEach(function (element) {
            weatherDaily.appendChild(element);
        });
    }
    function createWeatherDay(forecast) {
        var forecastMap = forecast.list.map(function (forecastWeather) {
            var li = document.createElement('li');
            var day = new Date(forecastWeather.dt * 1000);
            li.innerHTML = "\n    <span class=\"day\">".concat(day.toLocaleDateString('it-IT', { weekday: 'long' }), "</span>\n    <span class=\"stats\">\n      <span>").concat(Math.round(forecastWeather.main.temp), "\u00B0C</span>\n      <span>").concat(forecastWeather.weather[0].description, "</span>\n    </span>\n    ");
            return li;
        });
        return forecastMap;
    }

})();
//# sourceMappingURL=main.js.map
