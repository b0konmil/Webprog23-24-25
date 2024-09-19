const apiBaseURL = 'https://www.codewars.com/api/v1/users/';

async function FetchScoreByLanguage() {
    const usernameInput = document.getElementById('userInput').value.trim();
    const errorElement = document.getElementById('error');
    const tableBody = document.querySelector('#languagesTable tbody');
    const resultsContainer = document.getElementById('resultsContainer');

    tableBody.innerHTML = '';
    errorElement.textContent = '';
    resultsContainer.classList.add('d-none');

    if (usernameInput === '') {
        errorElement.textContent = 'Adjon meg egy felhasználónevet.';
        return;
    }

    try {
        const response = await fetch(apiBaseURL + usernameInput);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const userData = await response.json();
        const languages = userData.ranks.languages;

        let dataAdded = false;
        for (const [language, data] of Object.entries(languages)) {
            const row = document.createElement('tr');

            const languageCell = document.createElement('td');
            languageCell.textContent = language;
            row.appendChild(languageCell);

            const userCell = document.createElement('td');
            userCell.textContent = usernameInput;
            row.appendChild(userCell);

            const pointsCell = document.createElement('td');
            pointsCell.textContent = data.score;
            row.appendChild(pointsCell);

            tableBody.appendChild(row);
            dataAdded = true;
        }

        if (dataAdded) {
            resultsContainer.classList.remove('d-none');
        } else {
            errorElement.textContent = 'Nincs elérhető információ.';
        }
    } catch (error) {
        errorElement.textContent = `Failed to fetch user data: ${error.message}`;
    }
}

async function FetchAllUserInfo() {
    const usernameInput = document.getElementById('userInput').value.trim();
    const errorElement = document.getElementById('allInfoError');
    const tableBody = document.querySelector('#allInfoTable tbody');
    const allInfoContainer = document.getElementById('allInfoContainer');

    tableBody.innerHTML = '';
    errorElement.textContent = '';
    allInfoContainer.classList.add('d-none');

    if (usernameInput === '') {
        errorElement.textContent = 'Adjon meg egy felhasználónevet.';
        return;
    }

    try {
        const response = await fetch(apiBaseURL + usernameInput);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const userData = await response.json();

        for (const [key, value] of Object.entries(userData)) {
            const row = document.createElement('tr');

            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            row.appendChild(keyCell);

            const valueCell = document.createElement('td');
            valueCell.textContent = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
            row.appendChild(valueCell);

            tableBody.appendChild(row);
        }

        allInfoContainer.classList.remove('d-none');
    } catch (error) {
        errorElement.textContent = `Failed to fetch user data: ${error.message}`;
    }
}

document.getElementById('fetchDataButton').addEventListener('click', FetchScoreByLanguage);
document.getElementById('fetchAllInfoButton').addEventListener('click', FetchAllUserInfo);
