// sets the task the tutor is working on
export function setTask(task) {
    console.log(task)
    localStorage.setItem("task", JSON.stringify(task));
  }
  
  // gets the task the tutor is working on
  export function getTask() {
    return JSON.parse(localStorage.getItem("task"));
  }

  export function getSubmissions() {
    return JSON.parse(localStorage.getItem("tasksubmission"));
  }

  // sets the student the tutor is working on (on a certain task)
export function setStudent(student) {
  console.log(student)
  localStorage.setItem("student_T", JSON.stringify(student));
}

  // gets the student the tutor is working on (on a certain task)
export function getStudent() {
  return JSON.parse(localStorage.getItem("student_T"));
}


