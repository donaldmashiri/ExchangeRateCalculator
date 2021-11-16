import logo from './shumba.jpg';
import './App.css';
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState('USD');
    const [currency2, setCurrency2] = useState('EUR');
    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios.get('http://data.fixer.io/api/latest?access_key=92f09c1da0400c765508fd0be542346f')
            .then(response => {
                setRates(response.data.rates);
            })
    }, []);

    useEffect(() => {
        if (!!rates) {
            function init() {
                handleAmount1Change(1);
            }
            init();
        }
    }, [rates]);



    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setCurrency2(currency2);
    }



  return (
    <div className="container App">
      <header className="App-header">
        <img src={logo} class="rounded-circle" className="App-logo" alt="logo" />
        <p>
          ShumbaMoney Exchange Rates
          {/*Edit <code>src/App.js</code> and save to reload.*/}
        </p>
      </header>

        <div class="card card-body">
            <h1>Currency Converter</h1>
            <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(rates)}
                amount={amount1}
                currency={currency1} />
            <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(rates)}
                amount={amount2}
                currency={currency2} />
        </div>
    </div>
      
  );
}

export default App;
