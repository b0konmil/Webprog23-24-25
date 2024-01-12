const forditas = () => {
    const szoveg = document.getElementById('input').value;
    const forditott = szoveg.split('').reverse().join('');
    document.getElementById('output').innerText = forditott;
}