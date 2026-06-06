const fs = require('fs');
const fsPromises = require('fs').promises;

const studentData = [
  {
    id: 1,
    name: 'Alice Johnson',
    age: 20,
    course: 'Computer Science',
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: 'Bob Smith',
    age: 22,
    course: 'Data Science',
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: 'Carol Williams',
    age: 21,
    course: 'Web Development',
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

// Synchronous write to students.json
function writeStudentsSync() {
  try {
    fs.writeFileSync('students.json', JSON.stringify(studentData, null, 2));
    console.log('Students data written SYNCHRONOUSLY to students.json');
  } catch (error) {
    console.error('Error writing file (sync):', error.message);
  }
}

// Synchronous read from students.json
function readStudentsSync() {
  try {
    const data = fs.readFileSync('students.json', 'utf8');
    const students = JSON.parse(data);
    console.log('Students data read SYNCHRONOUSLY from students.json');
    console.log(`Found ${students.length} students`);
    return students;
  } catch (error) {
    console.error('Error reading file (sync):', error.message);
    return null;
  }
}

// Asynchronous write to students.json
async function writeStudentsAsync() {
  try {
    await fsPromises.writeFile('students.json', JSON.stringify(studentData, null, 2));
    console.log('Students data written ASYNCHRONOUSLY to students.json');
  } catch (error) {
    console.error('Error writing file (async):', error.message);
  }
}

// Asynchronous read from students.json
async function readStudentsAsync() {
  try {
    const data = await fsPromises.readFile('students.json', 'utf8');
    const students = JSON.parse(data);
    console.log('Students data read ASYNCHRONOUSLY from students.json');
    console.log(`Found ${students.length} students`);
    return students;
  } catch (error) {
    console.error('Error reading file (async):', error.message);
    return null;
  }
}

// Add a new student to students.json
async function addStudent(newStudent) {
  try {
    const data = await fsPromises.readFile('students.json', 'utf8');
    const students = JSON.parse(data);
    const maxId = Math.max(...students.map((s) => s.id));
    newStudent.id = maxId + 1;
    students.push(newStudent);
    await fsPromises.writeFile('students.json', JSON.stringify(students, null, 2));
    console.log(`New student added: ${newStudent.name}`);
    return newStudent;
  } catch (error) {
    console.error('Error adding student:', error.message);
    return null;
  }
}

// Update a student's course in students.json
async function updateStudentCourse(studentId, newCourse) {
  try {
    const data = await fsPromises.readFile('students.json', 'utf8');
    const students = JSON.parse(data);
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      console.log(`Student with ID ${studentId} not found`);
      return null;
    }
    const oldCourse = student.course;
    student.course = newCourse;
    await fsPromises.writeFile('students.json', JSON.stringify(students, null, 2));
    console.log(`Updated ${student.name} course from "${oldCourse}" to "${newCourse}"`);
    return student;
  } catch (error) {
    console.error('Error updating student:', error.message);
    return null;
  }
}

// Delete a student from students.json
async function deleteStudent(studentId) {
  try {
    const data = await fsPromises.readFile('students.json', 'utf8');
    const students = JSON.parse(data);
    const studentToDelete = students.find((s) => s.id === studentId);
    if (!studentToDelete) {
      console.log(`Student with ID ${studentId} not found`);
      return null;
    }
    const remaining = students.filter((s) => s.id !== studentId);
    await fsPromises.writeFile('students.json', JSON.stringify(remaining, null, 2));
    console.log(`Deleted student: ${studentToDelete.name}`);
    return studentToDelete;
  } catch (error) {
    console.error('Error deleting student:', error.message);
    return null;
  }
}

module.exports = {
  writeStudentsSync,
  readStudentsSync,
  writeStudentsAsync,
  readStudentsAsync,
  addStudent,
  updateStudentCourse,
  deleteStudent,
};
