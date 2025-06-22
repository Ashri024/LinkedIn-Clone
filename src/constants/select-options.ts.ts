// /lib/constants/select-options.ts

export const MONTHS = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  
  export const YEARS = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - i);
  
  export const DEGREES = [
    "B.Tech", "M.Tech", "MBA", "BBA", "BCA", "MCA", "Ph.D", "B.Sc", "M.Sc",
    "MBBS", "LLB", "LLM", "B.Com", "M.Com", "Diploma", "Certificate", "BA", "MA",
    "BE", "ME", "PGDM", "B.Arch", "M.Arch"
  ];
  
  export const FIELDS_OF_STUDY = [
    "Computer Science", "Information Technology", "Electronics", "Mechanical",
    "Civil", "Business Administration", "Finance", "Marketing", "Physics",
    "Mathematics", "Law", "Architecture", "Medicine", "Biology", "Chemistry",
    "Political Science", "History", "Psychology", "Sociology", "Economics"
  ];
  