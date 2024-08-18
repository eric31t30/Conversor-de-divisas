import Conversor from './componentes/conversor'
import './App.css';

import iconExchange from './imagenes/exchange.png'
import iconExchangeBig from './imagenes/exchange-grande.png'
import github from './imagenes/github.png'

function App() {
  return (
    <div className="App">
      <header className='header'>
        <h1 className='header-tittle'>Currency Converter</h1>
        <img src={iconExchange} className='icon-exchange' alt='icon'/>
        <img src={iconExchangeBig} className='icon-exchange-big' alt='icon' />
      </header>
        <Conversor></Conversor>
      <footer className='footer'>
        <a className='author' href='https://github.com/eric31t30' target='_blank'>eric31t30</a>
        <img src={ github } alt='icon' className='github-icon'/>
      </footer>
    </div>
  );
}

export default App;
