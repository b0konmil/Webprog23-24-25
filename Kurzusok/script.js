document.addEventListener('DOMContentLoaded', function() {
    const newCourseForm = document.getElementById('new-course-form');
    const courseList = document.getElementById('course-list');
  
    newCourseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const courseName = document.getElementById('course-name').value;
  
      fetch('https://vvri.pythonanywhere.com/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: courseName })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hiba a kéréskor');
        }
        return response.json();
      })
      .then(newCourse => {
        const courseItem = document.createElement('div');
        courseItem.innerHTML = `
          <p>ID: ${newCourse.id}</p>
          <p>Név: ${newCourse.name}</p>
        `;
        courseList.appendChild(courseItem);
  
        alert('A kurzus sikeresen létre lett hozva!');
      })
      .catch(error => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a kurzus létrehozása közben.');
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const courseList = document.getElementById('course-list');
    const getCourseBtn = document.getElementById('get-course-btn');
    const courseIdInput = document.getElementById('course-id-input');
    const courseDetailsDiv = document.getElementById('course-details');
  
    getCourseBtn.addEventListener('click', function() {
      const courseId = courseIdInput.value;
      if (courseId.trim() === '') {
        alert('Kérlek add meg a kurzus ID-jét!');
        return;
      }
  
      fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hiba a kéréskor');
          }
          return response.json();
        })
        .then(course => {
          courseDetailsDiv.innerHTML = `
            <h2>Kurzus részletei</h2>
            <p>ID: ${course.id}</p>
            <p>Név: ${course.name}</p>
          `;
        })
        .catch(error => {
          courseDetailsDiv.innerHTML = '';
          console.error('Hiba történt:', error);
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const newCourseForm = document.getElementById('new-course-form');
      });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const assignStudentForm = document.getElementById('assign-student-form');
    const courseIdSelect = document.getElementById('course-select');
    const courseList = document.getElementById('course-list');
    const studentSelect = document.getElementById('student-select');

    function fetchCourses() {
      fetch('https://vvri.pythonanywhere.com/api/courses')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Hiba a kurzusok lekérésekor');
              }
              return response.json();
          })
          .then(courses => {
              courses.forEach(course => {
                  const option = document.createElement('option');
                  option.value = course.id;
                  option.textContent = `${course.id} - ${course.name}`;
                  courseIdSelect.appendChild(option);
  
                  const sortedStudents = course.students.sort((a, b) => a.id - b.id);
                  sortedStudents.forEach(student => {
                      addStudentToSelect(student);
                  });
  
                  const courseItem = document.createElement('div');
                  courseItem.innerHTML = `
                      <p>ID: ${course.id}</p>
                      <p>Név: ${course.name}</p>
                      <p>Diákok:</p>
                  `;
  
                  const studentList = document.createElement('ul');
                  sortedStudents.forEach(student => {
                      const studentItem = document.createElement('li');
                      studentItem.textContent = `${student.id} - ${student.name}`;
                      studentList.appendChild(studentItem);
                  });
  
                  courseItem.appendChild(studentList);
                  courseList.appendChild(courseItem);
              });
          })
          .catch(error => console.error('Hiba történt a kurzusok lekérésekor:', error));
    }
  
    function fetchStudents() {
        fetch('https://vvri.pythonanywhere.com/api/students')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hiba a diákok lekérésekor');
                }
                return response.json();
            })
            .then(students => {
                const sortedStudents = students.sort((a, b) => a.id - b.id);
                sortedStudents.forEach(student => {
                    addStudentToSelect(student);
                });
            })
            .catch(error => console.error('Hiba történt a diákok lekérésekor:', error));
    }
  
    function addStudentToSelect(student) {
        const studentOption = document.createElement('option');
        studentOption.value = student.id;
        studentOption.textContent = `${student.id} - ${student.name}`;
        studentSelect.appendChild(studentOption);
    }
    
    fetchCourses();
    fetchStudents();
  

    assignStudentForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const courseId = courseIdSelect.value;
      const studentId = studentSelect.value;
  
      fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Hiba a kurzus lekérésekor');
          }
          return response.json();
      })
      .then(course => {
          course.students.push({ id: studentId });
  
          return fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(course)
          });
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Hiba a kurzus frissítésekor');
          }
          return response.json();
      })
      .then(data => {
          alert('A diák sikeresen hozzá lett rendelve a kurzushoz!');
          console.log('A diák hozzá lett rendelve a kurzushoz:', data);
      })
      .catch(error => {
          console.error('Hiba történt a diák hozzárendelése közben:', error);
          alert('Hiba történt a diák hozzárendelése közben.');
      });

  });
});

  document.addEventListener('DOMContentLoaded', function() {
    const studentList = document.getElementById('student-list');

    function fetchStudents() {
        fetch('https://vvri.pythonanywhere.com/api/students')
        .then(response => {
            if (!response.ok) {
            throw new Error('Hiba a kéréskor');
            }
            return response.json();
        })
        .then(students => {
            studentList.innerHTML = '';
    
            students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.innerHTML = `
                <p>ID: ${student.id}</p>
                <p>Név: ${student.name}</p>
                <p>Kurzus: ${student.course}</p>
            `;
            studentList.appendChild(studentItem);
            });
        })
        .catch(error => console.error('Hiba történt:', error));
  }
  fetchStudents();
})

  document.addEventListener('DOMContentLoaded', function() {
    const studentDetailsDiv = document.getElementById('student-details');
    const getStudentBtn = document.getElementById('get-student-btn');
    const studentIdInput = document.getElementById('get-student-id');
  
    getStudentBtn.addEventListener('click', function() {
      const studentId = studentIdInput.value.trim();
      if (studentId === '') {
        alert('Kérlek add meg a diák ID-jét!');
        return;
      }
  
      fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hiba a kéréskor');
          }
          return response.json();
        })
        .then(student => {
          studentDetailsDiv.innerHTML = `
            <h2>Diák részletei</h2>
            <p>ID: ${student.id}</p>
            <p>Név: ${student.name}</p>
            <p>Kurzus: ${student.course}</p>
          `;
        })
        .catch(error => {
          studentDetailsDiv.innerHTML = '';
          console.error('Hiba történt:', error);
          alert('Nincs diák ezzel az azonosítóval.');
        });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const editStudentForm = document.getElementById('edit-student-form');
    const studentIdInput = document.getElementById('edit-student-id');
    const editStudentNameInput = document.getElementById('student-name');
    const editStudentButton = document.getElementById('edit-student-button');
    const saveChangesButton = document.getElementById('save-changes-button');
  
    editStudentButton.addEventListener('click', function() {
      const studentId = studentIdInput.value;
      fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hiba a kéréskor');
          }
          return response.json();
        })
        .then(student => {
          editStudentNameInput.value = student.name;
          editStudentForm.style.display = 'block';
        })
        .catch(error => {
          console.error('Hiba történt:', error);
          alert('Nincs diák ezzel az azonosítóval.');
        });
    });
    
    saveChangesButton.addEventListener('click', function() {
      const studentId = studentIdInput.value;
      const editedName = editStudentNameInput.value;
  
      fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: editedName }),
          mode: 'cors'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Hiba a szerver válaszakor: ${response.status} - ${response.statusText}`);
          }
          return response.json();
      })
      .then(data => {
          alert('A diák adatai sikeresen frissítve lettek!', data);
          editStudentForm.style.display = 'none';
      })
      .catch(error => {
          console.error('Hiba történt:', error);
          alert('Hiba történt a diák adatainak frissítése közben. Kérjük, ellenőrizze a hálózati kapcsolatot és próbálkozzon újra.');
      });
    });   
  });

  document.addEventListener('DOMContentLoaded', function() {
    const deleteStudentBtn = document.getElementById('delete-student-btn');
    const studentIdInput = document.getElementById('delete-student-id');
  
    deleteStudentBtn.addEventListener('click', function() {
      const studentId = studentIdInput.value.trim();
      if (studentId === '') {
        alert('Kérlek add meg a diák ID-jét!');
        return;
      }
  
      if (!confirm('Biztosan törölni szeretnéd ezt a diákot?')) {
        return;
      }
  
      fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a törléskor');
        }
        return response.json();
    })
    .then(data => {
        alert('A diák sikeresen törölve lett.');
    })
      .catch(error => {
        console.error('Hiba történt:', error);
        alert('Nem sikerült törölni a diákot.');
      });
    });
  });
  
  