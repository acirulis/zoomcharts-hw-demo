function shortenValue(value, desiredValueUnit) {
    const units = {
        'K': 1e3,
        'M': 1e6,
        'bn': 1e9,
        'T': 1e12,
    };

    if (typeof value !== 'number'
        || value === 0
        || desiredValueUnit === ''
        || (desiredValueUnit && !units.hasOwnProperty(desiredValueUnit))) {
        return {value: value, valueUnit: desiredValueUnit || ""};
    }

    let outputValue = null
    let outputUnits = null;

    if (desiredValueUnit) {
        let divisor = units[desiredValueUnit];
        outputValue = value / divisor;
        outputUnits = desiredValueUnit;
    } else {
        for (const [key, divisor] of Object.entries(units).sort((a, b) => b[1] - a[1])) {
            if (Math.abs(value / divisor) >= 1) {
                outputValue = value / divisor;
                outputUnits = key;
                break;
            }
        }
    }

    return {value: outputValue, valueUnit: outputUnits};
}
