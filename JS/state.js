export const state = {
    rows: [],
    bucketSize: 60, // default bucketSize (searchable time frames default to an hour)
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    dept: [], 
    weight: "enrolled", // default for sorting by weight, checks for class enrollment
    timeWindow: [8*60, 23*60], // classes between 8am and 11pm
};

export function initControls(state, rerender) {
    // initializes controls, also includes event listeners
    const $ = (id) => document.getElementById(id);

    // bucket size filter
    $('bucket').addEventListener('change', e => {
        state.bucketSize = +e.target.value;
        rerender();
    });

    // weight filter
    $('weight').addEventListener('change', e => {
        state.weight = e.target.value;
        rerender();
    });

    // day filter
    $('daysGroup').addEventListener('change', e => {
        const checked = document.querySelectorAll('#daysGroup input[type="checkbox"]:checked');
        state.days = Array.from(checked).map(cb => cb.value);
        rerender();
    });

    // department filter
    $('deptGroup').addEventListener('change', e => {
        const checked = document.querySelectorAll('#deptGroup input[type="checkbox"]:checked');
        state.dept = Array.from(checked).map(cb => cb.value);
        rerender();
    });
}