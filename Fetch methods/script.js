fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => console.log(json));

fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: 'delectus aut autem',
      userId: 1,
      complete: false
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'PUT',
    body: JSON.stringify({
        title: 'delectus aut autem',
        userId: 1,
        id: 201
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'PATCH',
    body: JSON.stringify({
        title: 'delectus aut autem',
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'DELETE',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
     
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
     
    .then(json => console.log(json))
    .catch(error => console.error('There was a problem with the fetch operation:', error));