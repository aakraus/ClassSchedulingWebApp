export const state = {
    rows: [],
    bucketSize: 60, // default bucketSize (searchable time frames default to an hour)
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    dept: "All", 
    weight: "enrolled", // default for sorting by weight, checks for class enrollment
    timeWindow: [8*60, 23*60] // classes between 8am and 11pm
};

export function initControls(state, rerender) {
    // initializes controls, also includes event listeners
}