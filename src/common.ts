export function sortNumbers(a: number, b: number) {

    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
}

export function caseInsensitiveSort(a: string, b: string) {

    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
}

export function groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        }
        else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
}