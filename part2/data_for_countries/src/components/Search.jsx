

const Search = ({searchString, onChange}) => {
  return (
    <div>
      <p>find countries</p>
      <input onChange={onChange} value={searchString}></input>
    </div>
  )
}

export default Search;