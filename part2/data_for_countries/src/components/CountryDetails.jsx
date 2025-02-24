const getWeatherImgUrl = (iconName) => {
  return `https://openweathermap.org/img/wn/${iconName}@2x.png`;
};

const CountryDetails = ({countryInfo, weatherInfo}) => {
  if (!countryInfo) {
    return null;
  }

  return (
    <div>
      <h1>{countryInfo.name.common}</h1>
      <div>
        <p>Capital {countryInfo.capital[0]}</p>
        <p>Area {countryInfo.area}</p>
      </div>
      <h1>Languages</h1>
      <div>
        <ul>
          {Object.values(countryInfo.languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
      </div>
      <img src={countryInfo.flags.png} />
      <div>
        <h1>Weather in {countryInfo.capital[0]}</h1>
        <div>
          <p>Temperature {weatherInfo.main.temp} K</p>
          <img src={getWeatherImgUrl(weatherInfo.weather[0].icon)} />
          <p>Wind {weatherInfo.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails;
