function loadCurrencies() {
    const converter = document.querySelector('.converter');
    const loader = document.querySelector('.loader');
    const fade = document.getElementById('themeFade');
    converter.classList.add('none');
    fade.style.opacity = '1';
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
        setTimeout(() => {
            setTimeout(() => {
                loader.style.opacity = '0.8';
                fade.style.opacity = '0.8';
                setTimeout(() => {
                    loader.style.opacity = '0.6';
                    fade.style.opacity = '0.6';
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        fade.style.opacity = '0';
                    }, 200);
                }, 200);
            }, 200);
        }, 18000);
};

loadCurrencies();

document.getElementById('convert').addEventListener('click', function() {
    const resultat = document.getElementById('input2');
    const toCurrency = document.getElementById('toCurrency').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const amount = document.getElementById('input1').value;
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
    toCurrencyD.value = temp;

    const amountD = document.getElementById('input1');
    const resultatD = document.getElementById('input2');

    const input = amountD.value;
    amountD.value = resultatD.value;
    resultatD.value = input;
});