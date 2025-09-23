const dayAliases = { mon:"Mon", monday:"Mon", tue:"Tue", tues:"Tue", tuesday:"Tue",
  wed:"Wed", weds:"Wed", wednesday:"Wed", thu:"Thu", thur:"Thu", thurs:"Thu",
  thursday:"Thu", fri:"Fri", friday:"Fri", sat:"Sat", saturday:"Sat", sun:"Sun", sunday:"Sun" }; 

const normalizeDay = t => dayAliases[t?.toLowerCase()] || null; // handle  day aliases
const toMinutes = s => { const [h,m]=s.split(':').map(Number); return h*60+(m||0); }; // converts HH:MM format into minutes

export function parseSchedule(cell) {
    // parse schedule info
}

export async function loadCSV(text) {
    // accept CSV and normalize data
}