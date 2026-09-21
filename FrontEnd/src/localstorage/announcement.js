// sets announcement data
export function setAnnouncement(announcement) {
    localStorage.setItem("announcement", JSON.stringify(announcement));
  }
  
  // gets announcement data
  export function getAnnouncement() {
    return JSON.parse(localStorage.getItem("announcement"));
  }