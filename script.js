const API_URL = 'https://v6.exchangerate-api.com/v6/9eb8e30741caa96818ec1d9d/latest/'; // Sua URL da API

async function obterCotacaoMoeda(moedaBase, moedaDestino) {
    try {
        const response = await fetch(`${API_URL}${moedaBase}`);
        if (!response.ok) {
            throw new Error('Erro ao obter os dados da API. Status: ' + response.status);
        }
        const data = await response.json();
        const taxa = data.conversion_rates[moedaDestino];

        if (!taxa) {
            throw new Error('Moeda de destino não encontrada nas taxas de câmbio.');
        }

        return taxa;
    } catch (error) {
        console.error('Erro:', error.message);
        document.getElementById('resultado').textContent = 'Erro ao obter a taxa de câmbio. Verifique as moedas e tente novamente.';
        throw error;
    }
}

async function exemploConversaoMoeda(valor, moedaBase, moedaDestino) {
    try {
        const taxa = await obterCotacaoMoeda(moedaBase, moedaDestino);
        const valorConvertido = valor * taxa;
        document.getElementById('resultado').textContent = `${valor} ${moedaBase} é igual a ${valorConvertido.toFixed(2)} ${moedaDestino}`;
    } catch (error) {
        console.error('Erro na conversão de moeda:', error.message);
        document.getElementById('resultado').textContent = 'Erro na conversão de moeda.';
    }
}

// Manipulador de evento para o formulário
document.getElementById('form-conversao').addEventListener('submit', function(event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('valor').value);
    let moedaBase = document.getElementById('moedaBase').value;
    let moedaDestino = document.getElementById('moedaDestino').value;

    if (moedaBase === "") {
        moedaBase = document.getElementById('moedaBasePersonalizada').value.toUpperCase();
    }

    if (moedaDestino === "") {
        moedaDestino = document.getElementById('moedaDestinoPersonalizada').value.toUpperCase();
    }

    exemploConversaoMoeda(valor, moedaBase, moedaDestino);
});

// Manipulador para mostrar/ocultar campos de moeda personalizada
document.getElementById('moedaBase').addEventListener('change', function() {
    document.getElementById('moedaBasePersonalizada').style.display = this.value === '' ? 'block' : 'none';
});

document.getElementById('moedaDestino').addEventListener('change', function() {
    document.getElementById('moedaDestinoPersonalizada').style.display = this.value === '' ? 'block' : 'none';
});

