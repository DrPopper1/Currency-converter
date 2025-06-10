document.addEventListener('DOMContentLoaded', function () {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const fade = document.getElementById('themeFade');
    const amount = document.getElementById('input1');
    const resultat = document.getElementById('input2');
    if(localStorage.getItem('currencies_saved')) {
        fade.style.opacity = '0';
        const currencies = JSON.parse(localStorage.getItem('currencies_saved'));
        console.log(currencies);
        for (let i = 0; i < currencies.length; i++) {
            const oneCurrency = currencies[i];
            const option1 = document.createElement('option');
            option1.value = oneCurrency[0];
            option1.textContent = oneCurrency[0];
            fromCurrency.appendChild(option1);
    
            const option2 = document.createElement('option');
            option2.value = oneCurrency[0];
            option2.textContent = oneCurrency[0];
            toCurrency.appendChild(option2);
        };
        const ul = document.querySelector('.allCurrencies');
        for (let i = 0; i < currencies.length; i++) {
            const oneCurrency = currencies[i];
            const li = document.createElement('li');
            li.innerHTML = oneCurrency[0] + " - это " + oneCurrency[1];
            ul.appendChild(li);
        };

        const amountJSON = JSON.parse(localStorage.getItem('fromCurrency'));
        const resultatJSON = JSON.parse(localStorage.getItem('toCurrency'));
        amount.value = amountJSON[1];
        resultat.value = resultatJSON[1];

        fromCurrency.value = amountJSON[0];
        toCurrency.value = resultatJSON[0];

    } else {
        const loader = document.querySelector('.loader');
        fetch('https://api.frankfurter.app/currencies')
            .then(response => response.json())
            .then(data => {
                const allCurrencies = Object.entries(data);
                console.log(allCurrencies);
                for (let i = 0; i < allCurrencies.length; i++) {
                    const oneCurrency = allCurrencies[i];
                    const option1 = document.createElement('option');
                    option1.value = oneCurrency[0];
                    option1.textContent = oneCurrency[0];
                    fromCurrencySelect.appendChild(option1);
    
                    const option2 = document.createElement('option');
                    option2.value = oneCurrency[0];
                    option2.textContent = oneCurrency[0];
                    toCurrencySelect.appendChild(option2);
                    localStorage.setItem('currencies_saved', JSON.stringify(allCurrencies));
    
                };
                const ul = document.querySelector('.allCurrencies');
                for (let i = 0; i < allCurrencies.length; i++) {
                    const oneCurrency = allCurrencies[i];
                    const li = document.createElement('li');
                    li.innerHTML = oneCurrency[0] + " - это " + oneCurrency[1];
                    ul.appendChild(li);
                };
                loader.style.opacity = '0';
                fade.style.opacity = '0';
            });
    };
});

document.getElementById('convert').addEventListener('click', function() {
    const toCurrency = document.getElementById('toCurrency').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const resultat = document.getElementById('input2');
    const amount = document.getElementById('input1').value;
    if (fromCurrency == toCurrency) {
        resultat.value = amount;
    } else {
        fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`)
            .then((resp) => resp.json())
            .then((data) => {
                resultat.value = (amount * data.rates[toCurrency]).toFixed(2);
                console.log(data);
                if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
                    localStorage.removeItem('toCurrency');
                    localStorage.removeItem('fromCurrency');
                };
                const toCurrencyData = [toCurrency, resultat.value];
                const fromCurrencyData = [fromCurrency, amount];
                localStorage.setItem('toCurrency', JSON.stringify(toCurrencyData));
                localStorage.setItem('fromCurrency', JSON.stringify(fromCurrencyData));
            });
    }
});

document.querySelector('.swap').addEventListener('click', function() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('input1');
    const resultat = document.getElementById('input2');

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    const input = amount.value;
    amount.value = resultat.value;
    resultat.value = input;

    if (localStorage.getItem('toCurrency') || localStorage.getItem('fromCurrency')) {
        localStorage.removeItem('toCurrency');
        localStorage.removeItem('fromCurrency');
    };
    const toCurrencyData = [toCurrency.value, resultat.value];
    const fromCurrencyData = [fromCurrency.value, amount.value];
    localStorage.setItem('toCurrency', JSON.stringify(toCurrencyData));
    localStorage.setItem('fromCurrency', JSON.stringify(fromCurrencyData));
});

const open_button = document.querySelector('.open');

open_button.addEventListener('click', function() {
    const allCurrencies = document.querySelector('.allCurrencies');
    if (open_button.innerHTML == 'Расшифровка ↑') {
        allCurrencies.style.display = 'none';
        open_button.innerHTML = 'Расшифровка ↓'
    } else {
        allCurrencies.style.display = 'grid';
        open_button.innerHTML = 'Расшифровка ↑'
    }
});