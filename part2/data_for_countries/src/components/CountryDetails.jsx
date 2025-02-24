const CountryDetails = ({countryInfo}) => {
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
    </div>
  )
}

export default CountryDetails;
