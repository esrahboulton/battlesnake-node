let timeout;
const timeoutFunc = (callback, ms = 250) => {
    timeout && clearTimeout(timeout);
    // wrapped in a promise incase we want to await it. otherwise useless.
    return new Promise((resolve, reject) => {
        timeout = setTimeout(()=>{ resolve(callback()); }, ms)
    });
}
exports.timeout = timeoutFunc;