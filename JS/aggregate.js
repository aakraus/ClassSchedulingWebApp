export function aggregate(state) {
    const { rows, bucketSize, days, weight, timeWindow } = state;
    const [minT, maxT] = timeWindow;

    // build bucket start times
    const timeAxis = [];
    for (let t = minT; t <= maxT; t += bucketSize) {
        timeAxis.push(t)
    }
    
    // prepare lookup structures for fast indexing
    const dIdx = Object.fromEntries(days.map((d, i) => [d, i]));

    // initialize an empty matrix with dimensions # of selected days x # of time buckets
    const matrix = Array.from(
        { length : days.length },
        () => Array(timeAxis.length).fill(0)
    );

    // apply department filter
    const filtered =
        dept === 'All'
        ? rows
        : rows.filter(r => r.dept === dept);

    /* aggregation logic:
    for each meeting row
        - find day index
        - check for overlapping time buckets
        - increment matrix cell
    */
   
    for (const r of filtered) {
        const di = dIdx[r.day];
        if (di == null) continue; // skip rows if day isn't selected

        for (let i = 0; i < timeAxis.length; i++) {
            const slotStart = timeAxis[i];
            const slotEnd = slotStart + bucketSize;

            const overlaps = Math.max(slotStart, r.start) < Math.min(slotEndEnd, r.end);

            if (overlaps) {
                matrix[di][i] += (weight === 'enrolled' ? (r.enrolled || 0) : 1);
            }
        }
    }

    // return aggregated result for visualization
    return {
        timeAxis, // x-axis
        days, // y-axis
        matrix // conflict scores
    };
}