const health = async () => {
    let meta = '29066479918370013891212217120212917879099507390789881449629.79670683449172367'

    const len = Math.ceil(Math.log10(meta + 1));
    const rounded = meta % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 100 + 100
    let speedfunc = parseInt(stripped)

    console.log(speedfunc);
}

const damage = async () => {
    let meta = '29066479918370013891212217120212917879099507390789881449629.79670683449172367'

    const len = Math.ceil(Math.log10(meta + 1));
    const rounded = meta % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 5 + 1
    let speedfunc = parseInt(stripped)

    console.log(speedfunc);
}

const speed = async () => {
    let meta = '29066479918370013891212217120212917879099507390789881449629.79670683449172367'

    const len = Math.ceil(Math.log10(meta + 1));
    const rounded = meta % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 100 + 80
    let speedfunc = parseInt(stripped)

    console.log(speedfunc);
}

speed()