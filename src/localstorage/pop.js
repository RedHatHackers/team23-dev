// sets the modules p
export function setModulePop(module) {
    console.log(module)
    localStorage.setItem("pop", JSON.stringify(module));
  }
  
  // gets the module the tutor is working on
  export function getModulePop() {
    return JSON.parse(localStorage.getItem("pop"));
  }