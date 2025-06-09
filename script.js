const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const fade = document.getElementById('themeFade');

if(localStorage.getItem('currencies_saved')) {
    fade.style.opacity = '0';
    const currenciesA = JSON.parse(localStorage.getItem('currencies_saved'));
    for (let i = 0; i < currenciesA.length; i++) {
        const option1 = document.createElement('option');
        option1.value = currenciesA[i];
        option1.textContent = currenciesA[i];
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currenciesA[i];
        option2.textContent = currenciesA[i];
        toCurrencySelect.appendChild(option2);
    }
    if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
    const toCurrency = document.getElementById('toCurrency');
    const fromCurrency = document.getElementById('fromCurrency');
    
    toCurrency.value = JSON.parse(localStorage.getItem('toCurrency'));
    fromCurrency.value = JSON.parse(localStorage.getItem('fromCurrency'));
    }
    console.log(JSON.parse(localStorage.getItem('currencies_saved')));
} else {
    let currencies_saved = [];
    const loader = document.querySelector('.loader');
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (const currency in data) {
                currencies_saved.push(currency);
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
                localStorage.setItem('currencies_saved', JSON.stringify(currencies_saved));
            }
            if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
                const toCurrency = document.getElementById('toCurrency');
                const fromCurrency = document.getElementById('fromCurrency');
    
                toCurrency.value = JSON.parse(localStorage.getItem('toCurrency'));
                fromCurrency.value = JSON.parse(localStorage.getItem('fromCurrency'));
            }
            loader.style.opacity = '0';
            fade.style.opacity = '0';
        });
};

document.getElementById('convert').addEventListener('click', function() {
    const resultat = document.getElementById('input2');
    const toCurrency = document.getElementById('toCurrency').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const amount = document.getElementById('input1').value;
    if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
        localStorage.removeItem('toCurrency');
        localStorage.removeItem('fromCurrency');
    }
    localStorage.setItem('toCurrency', JSON.stringify(toCurrency));
    localStorage.setItem('fromCurrency', JSON.stringify(fromCurrency));

    fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((resp) => resp.json())
        .then((data) => {
        console.log(data);
        if (fromCurrency == toCurrency) resultat.value = amount;
        else resultat.value = (amount * data.rates[toCurrency]).toFixed(2);
        });
});

const swap = document.querySelector('.swap');

swap.addEventListener('click', function() {
    const fromCurrencyD = document.getElementById('fromCurrency');
    const toCurrencyD = document.getElementById('toCurrency');

    const temp = fromCurrencyD.value;
    fromCurrencyD.value = toCurrencyD.value;
    if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
        localStorage.removeItem('toCurrency');
        localStorage.removeItem('fromCurrency');
    }
    localStorage.setItem('toCurrency', JSON.stringify(temp));
    localStorage.setItem('fromCurrency', JSON.stringify(toCurrencyD.value));
    toCurrencyD.value = temp;

    const amountD = document.getElementById('input1');
    const resultatD = document.getElementById('input2');

    const input = amountD.value;
    amountD.value = resultatD.value;
    resultatD.value = input;
});