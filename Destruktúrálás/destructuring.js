//1. feladat
let car = ['Ford', 'Mustang', 2022, 'blue'];

let [brand, model, year, color] = car;

console.log(brand);
console.log(model);
console.log(year);
console.log(color);

//Kérdések: 1, kisbetűs változóneveket. 2, A változók sorrendje fontos.

//2. feladat
let book = {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    publicationYear: 2008,
    language: 'English'
    };

let {bookTitle, bookAuthor, publicationYear, language} = book;

console.log(bookTitle);
console.log(bookAuthor);
console.log(publicationYear);
console.log(language);

//Kérdések: 1, camelCase írásmódban. 2, A változók sorrendje itt is fontos.

//3. feladat
function printStudentInfo({name, age, grade, subjects})
{
    console.log(`${name} ${age} éves, ${grade} osztályzat, ${subjects} tantárgyakból.`);
}

let student = {
    name: 'John Doe',
    age: 20,
    grade: 'B',
    subjects: ['Math', 'English', 'History']
};

printStudentInfo(student);