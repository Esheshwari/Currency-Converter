document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const quantity = document.querySelector("input[name='quantity']").value;
        const currency = document.querySelector("select[name='currency']").value;

        const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_AQ129zP1adQUOcizylKKWzAZ4sIdaeG2NpsguxmX&base_currency=${currency}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const rJson = await response.json();
                const rates = rJson.data;
                let outputHTML = '';

                for (const [code, info] of Object.entries(rates)) {
                    const convertedValue = (info.value * quantity).toFixed(2);
                    outputHTML += `
                    <tr>
                        <td>${code}</td>
                        <td>${info.code}</td>
                        <td>${convertedValue}</td>
                    </tr>
                    `;
                }

                document.querySelector('tbody').innerHTML = outputHTML;
            } else {
                console.error('HTTP-Error: ' + response.status);
            }
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    });
});


