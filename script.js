function loadCurrencies() {
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            const currencies = data;
            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');

            for (const currency in currencies) {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadCurrencies);

document.getElementById('convert').addEventListener('click', function() {
    let resultat = document.getElementById('input2');
    let toCurrency = document.getElementById('toCurrency').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let amount = document.getElementById('input1').value;
    fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((resp) => resp.json())
        .then((data) => {
        console.log(data);
        if (fromCurrency == toCurrency) {
            resultat.value = amount;
        } else {
            resultat.value = (amount * data.rates[toCurrency]).toFixed(2); 
        }
        });
});