export function aggregate(state) {
    const { rows, bucketSize, days, weight, timeWindow } = state;
    const [minT, maxT] = timeWindow;

    // time bucket aggregation and scoring happens here
}