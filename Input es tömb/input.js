const data = [];

const inputField = document.getElementById('inputField');
const submitButton = document.getElementById('submitButton');
const cardContainer = document.getElementById('cardContainer');

submitButton.addEventListener('click', () => {
    const inputValue = inputField.value.trim();
    if (inputValue !== '') {
        data.push(inputValue);
        inputField.value = '';
        renderData();
    }
});

function renderData() {
    cardContainer.innerHTML = '';
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <p>${item}</p>
            <button onclick="deleteCard(${index})">Törlés</button>
        `;
        cardContainer.appendChild(card);
    });
    inputField.value = '';
}

function deleteCard(index) {
    data.splice(index, 1);
    renderData();
}
