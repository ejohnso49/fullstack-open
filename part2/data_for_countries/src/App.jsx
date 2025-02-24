import { useState, useEffect } from 'react'

import Search from './components/Search';
import SearchMatches from './components/SearchMatches';
import CountryDetails from './components/CountryDetails';
import countriesApi from './services/countries';

const App = () => {
  const [searchString, setSearchString] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState(undefined);

  useEffect(() => {
    countriesApi.getAll().then(data =>
      setCountries(data)
    );
  }, []);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
    setCountryInfo(undefined);
  }

  const handleShowCountryClick = (countryName) => {
    const countryInfo = countries.find(country => country.name.common === countryName);
    setCountryInfo(countryInfo);
    setSearchString('');
  }

  let matches;
  if (searchString !== '') {
    matches = countries
      .filter((country) => {
        return country.name.common.toLowerCase().includes(searchString);
      });
  } else {
    matches = [];
  }



  return (
    <div>
      <Search onChange={handleSearchStringChange} searchString={searchString} />
      {
        countryInfo ?
        <CountryDetails countryInfo={countryInfo} /> :
        <SearchMatches matches={matches.map(match => match.name.common)} onClick={handleShowCountryClick} />
      }
    </div>
  );
};

export default App;
