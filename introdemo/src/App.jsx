import './App.css'

function Hello(props) {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
}

function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Arpan' age="34" />
      <Hello name='Pat' age="33"/>
      <Hello name='Jordan' age={2025 - 1845}/>
    </div>
  );
}

export default App
