import React,{ useState, useEffect } from 'react';
import './conversor.css';

import changeIcon from '../imagenes/change-cont.png';
import arrows from '../imagenes/arrows-rotate-svgrepo-com.svg';


export default function Conversor() {

    const [monedas, setMonedas] = useState([]);
    const [moneda1, setMoneda1] = useState('EUR');
    const [moneda2, setMoneda2] = useState('AUD');
    const [monto, setMonto] = useState(0);
    const [result, setResult] = useState(undefined);
    const [styleActive, setStyleActive] = useState(false)

    
    useEffect(() => {
        
        fetch(`https://data.fixer.io/api/latest?access_key=bd5aec64a7f34f78857fd87266592ff1`)
            .then(resp => resp.json())
            .then((data) => {
            setMonedas(Object.keys(data.rates));
        });
    }, [moneda1])

    const handleConverter = () => {
        if(moneda1 !== moneda2) {
            setStyleActive(true);
            fetch(
                `https://api.currencybeacon.com/v1/convert?api_key=bVGPYYgn6dwCNlnGc7P6KlldJeUukG4H&amount=${monto}&from=${moneda1}&to=${moneda2}`
            )
            .then(resp => resp.json())
            .then((data) => {
                const formattedResult = data.value.toFixed(2);
                setResult(formattedResult);
            })
            .catch((error) => {
                if (error.response === 500) {
                    console.log('input vacio');
                } else {
                    console.log('input vacio');
                }
            });
        }
    }

    useEffect(()=>{
        setMonto(undefined)
        setResult(undefined)
        setStyleActive(false)
    }, [moneda1, moneda2])

    const changeCurrency = ()=>{
        setMoneda1(moneda2)

        setMoneda2(moneda1)
        
    }
    
    return (
    <div className='background'>
       <div className='container'>

        <img src={ changeIcon } className='change-icon' alt='icon'/>
            
            <div className='cont-rate'>
                <p className='convert-rate' >{moneda1}  =</p>
            </div>
            <div className='inputs-container'>
                <input 
                className='input-amount' 
                type='text' 
                placeholder='$ $ $'
                value={monto === undefined ? '' : monto}  
                onChange={(e) =>
                setMonto(e.target.value)} />
                <span className='span-input'></span>
            </div>
            
            
            
            <div className='selects-container'>
                <select
                    value={moneda1}
                    name="moneda-1"
                    id="moneda-1"
                    onChange={(e) => setMoneda1(e.target.value)}
                >
                    {monedas.map((moneda, index) => (
                        <option value={moneda} key={index} >{moneda}</option>
                    ))}
                </select>   
                <img src={ arrows } className='arrows' onClick={()=>{changeCurrency()}} alt='icon'/>
                <select
                    value={moneda2}
                    name="moneda-2"
                    id="moneda-2"
                    onChange={(e) => setMoneda2(e.target.value)}
                >
                    {monedas.map((moneda, index) => (
                        <option value={moneda} key={index} >{moneda}</option>
                    ))}
                </select>   
            </div>
            
            <div className='cont-rate'>
                <p className='convert-rate' >{moneda2}  =</p>
            </div>
            
            <div className='cont-result'>
            <p className='convert-result'>{result}</p>
            <span className={`span-convert-result ${ styleActive ? 'span-convert-result-active' : ''}`}></span>
            </div>
            
            <div className='cont-button'>
                <button onClick={handleConverter} className='button'>convertir</button>
            </div>
        </div>
    </div>
  )
}
