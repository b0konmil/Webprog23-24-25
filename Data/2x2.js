let cellColors = ['', '', '', ''];

function changeColor(event) {
    const index = event.target.dataset.index;
    const cell = document.querySelectorAll('.item')[index];

    if (cellColors[index] === '') {
        cell.style.backgroundColor = cell.style.backgroundColor === 'red' ? 'blue' : 'red';
        cellColors[index] = cell.style.backgroundColor;
    }
}

function renderContent() {
    let content = '';
    for (let i = 0; i < 4; i++) {
        content += `<div class="item" onclick="changeColor(event)" data-index="${i}"></div>`;
    }
    document.querySelector('.container').innerHTML = content;
}

renderContent();
