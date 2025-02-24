const CountryDetails = ({country, capital, area, languages, flag}) => {
  return (
    <div>
      <h1>{country}</h1>
      <div>
        <p>Capital {capital}</p>
        <p>Area {area}</p>
      </div>
      <h1>Languages</h1>
      <div>
        <ul>
          {languages.map((language, index) => <li key={index}>{language}</li>)}
        </ul>
      </div>
      <img src={flag} />
    </div>
  )
}

export default CountryDetails;
