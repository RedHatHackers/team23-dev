// sets  all of the tutors modules
export function setModules(module) {
  localStorage.setItem("modules", JSON.stringify(module));
}

// sets  all of the tutors modules
export function getModules() {
  return JSON.parse(localStorage.getItem("modules"));
}

// sets the module the tutor/student is working on
export function setModule(module) {
  localStorage.setItem("module", JSON.stringify(module));
}

// gets the module the tutor/student is working on
export function getModule() {
  return JSON.parse(localStorage.getItem("module"));
}

export function findModule(code) {
  var modules = getModules();

  if (modules.length != null)
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].code === code) {
        return modules[i];
      }
    }
}
