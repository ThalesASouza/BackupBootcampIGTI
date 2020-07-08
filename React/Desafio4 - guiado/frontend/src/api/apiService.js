import axios from 'axios';

const API_URL = 'http://localhost:3001/grade/';
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType:'Exercícios',
    minValue:0,
    maxValue:10,
  },
  {
    id: 2,
    gradeType:'Trabalho Prático',
    minValue:0,
    maxValue:40,
  },
  {
    id: 3,
    gradeType:'Desafio',
    minValue:0,
    maxValue:50,
  },
]


async function getAllGrades(){
  const res = await axios.get(API_URL);

  const grades = res.data.grades.map((grade) =>{
    const {student,subject,type} = grade;
    return{
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeletede: false,
    };
  });
  let allStudents = new Set();
  grades.forEach(grade => allStudents.add(grade.student))
  allStudents = Array.from(allStudents);
  
  let allSubject = new Set();
  grades.forEach(grade => allSubject.add(grade.student))
  allSubject = Array.from(allSubject);
  
  let allGradeTypes = new Set();
  grades.forEach(grade => allGradeTypes.add(grade.student))
  allGradeTypes = Array.from(allGradeTypes);

  const allCombinations = [];
  allStudents.forEach(student =>{
    allSubject.forEach(subject =>{
      allGradeTypes.forEach(type =>{
        allCombinations.push({
          student,
          subject,
          type
        })
      })
    })
  })

  allCombinations.forEach(({student,subject,type})=>{
    const hasItem = grades.find((grade)=>{
      grade.subject === subject &&
      grade.student === student &&
      grade.type === type;
    });

    if(!hasItem){
      grades.push({
        id: grades.length +1,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeletede: true
      })
    }
  })

  return allStudents;
}

export {getAllGrades};