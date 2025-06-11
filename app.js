// LocalStorage Keys
const STUDENTS_KEY = 'students';
const ATTENDANCE_KEY = 'attendance';

// Load students
function loadStudents() {
  return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
}

// Save student
function addStudent() {
  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  if (!name || !roll) return alert("Please fill both fields!");

  const students = loadStudents();
  students.push({ name, roll });
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  alert("Student Added!");
  location.reload();
}

// Show students to mark attendance
if (location.pathname.includes('index.html')) {
  const students = loadStudents();
  const container = document.getElementById('studentsList');
  students.forEach(student => {
    container.innerHTML += `
      <div class="flex items-center space-x-4">
        <span class="w-1/2">${student.name} (${student.roll})</span>
        <label class="flex items-center space-x-2">
          <input type="radio" name="${student.roll}" value="Present" checked> Present
          <input type="radio" name="${student.roll}" value="Absent"> Absent
        </label>
      </div>
    `;
  });
}

// Save attendance
function saveAttendance() {
  const students = loadStudents();
  const data = students.map(s => {
    const status = document.querySelector(`input[name="${s.roll}"]:checked`).value;
    return { ...s, status, date: new Date().toLocaleDateString() };
  });

  const old = JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '[]');
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify([...old, ...data]));
  alert("Attendance Saved!");
}

// View attendance records
if (location.pathname.includes('view.html')) {
  const data = JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '[]');
  const container = document.getElementById('records');
  data.forEach(d => {
    container.innerHTML += `
      <div class="border p-2 rounded bg-gray-800">
        ${d.date} - ${d.name} (${d.roll}) ➤ ${d.status}
      </div>
    `;
  });
}
