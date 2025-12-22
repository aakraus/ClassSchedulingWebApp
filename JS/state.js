export const state = {
    rows: [],
    bucketSize: 60, // default bucketSize (searchable time frames default to an hour)
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    dept: "All", 
    weight: "enrolled", // default for sorting by weight, checks for class enrollment
    timeWindow: [8*60, 23*60], // classes between 8am and 11pm
};

export function initControls(state, rerender) {
    // initializes controls, also includes event listeners
    const $ = (id) => document.getElementById(id);

    // bucket size
    $('bucket').addEventListener('change', e => {
        state.bucketSize = +e.target.value;
        rerender();
    });

    // days
    $('days').addEventListener('change', e => {
        state.days = Array.from(e.target.selectedOptions).map(o => o.value);
        rerender();
    });

    // weight
    $('weight').addEventListener('change', e => {
        state.weight = e.target.value;
        rerender();
    })

    // department
    $('department').addEventListener('input', e => {
        const v = (e.target.value || '').trim();
        state.dept = v === '' ? 'All' : v;
        rerender();
    });
}