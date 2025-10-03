const dayAliases = { mon:"Mon", monday:"Mon", tue:"Tue", tues:"Tue", tuesday:"Tue",
  wed:"Wed", weds:"Wed", wednesday:"Wed", thu:"Thu", thur:"Thu", thurs:"Thu",
  thursday:"Thu", fri:"Fri", friday:"Fri", sat:"Sat", saturday:"Sat", sun:"Sun", sunday:"Sun" }; 

const normalizeDay = t => dayAliases[t?.toLowerCase()] || null; // handle  day aliases
const toMinutes = s => { const [h,m]=s.split(':').map(Number); return h*60+(m||0); }; // converts HH:MM format into minutes

export function parseMeetings(cell) {
  if (!cell) return [];
  // clean input string
  const s = cell.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  // extract meeting entries using regex
  const re = /([A-Za-z]{3,9}(?:\s+[A-Za-z]{3,9})*)\s+from\s+([0-2]?\d:\d{2})\s*-\s*([0-2]?\d:\d{2})(?:\s+in\s+([^)]+?))?(?=$|\s*\)|\s*;|\s*[A-Za-z]{3,9}\s+from)/gi;
  const meetings = [];
  let m, lastLoc = null;

  // finds every meeting that matches regex pattern, pushes object to meetings array
  while ((m = re.exec(s)) !== null) {
    const days = m[1].split(/\s+/).map(normDay).filter(Boolean);
    const start_time = m[2], end_time = m[3], loc = (m[4]?.trim() || null);
    meetings.push({ days, start_time, end_time, location: loc });
    if (loc) lastLoc = loc;
    else if (lastLoc) meetings[meetings.length-1].location = lastLoc;
  }
  return meetings;
}

export async function loadCSV(text) {
    // accept CSV and normalize data
}