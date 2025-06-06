// fetch(`https://api.frankfurter.dev/v1/latest?base=USD`)
//         .then((resp) => resp.json())
//         .then((data) => {
//             for(let i = 0; data[rates].length; i++) {
//                 document.createElement(option)
//             }
//         });

document.getElementById('convert').addEventListener('click', convert);

function convert() {
    const amount = document.getElementById('input1').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultat = document.getElementById('input2');
    if (fromCurrency != toCurrency) {
        fetch(`https://api.frankfurter.dev/v1/latest?base=USD`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            if (toCurrency == "USD") resultat.value = (amount * data.rates[fromCurrency]).toFixed(2); 
            else resultat.value = (amount * data.rates[toCurrency]).toFixed(2);
        });
    } else {
        document.getElementById('input2').value = amount;
    };
};