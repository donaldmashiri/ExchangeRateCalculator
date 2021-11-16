import PropTypes from "prop-types";
import './currencyInput.css';

function CurrencyInput(props) {
    return (
        <div class="text-center" className="group">
            <select  class="form-group form-control" value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
            </select>
            <input class="form-group form-control" className="form-group form-control" type="text" value={props.amount}
                   onChange={ev => props.onAmountChange(ev.target.value)}/>
            <hr/>
        </div>
    );
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;