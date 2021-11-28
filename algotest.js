const test = async () => {
    let meta = await getAlgoRandomness()
    console.log('meta', meta);

    const len = Math.ceil(Math.log10(meta + 1));
    const rounded = meta % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 10 + 10
    let speedfunc = parseInt(meta)
}

test()