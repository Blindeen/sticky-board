const drawCoords = (maxX: number, maxY: number) => {
    let x = Math.floor(Math.random() * (maxX + 1));
    x = Math.min(Math.max(0, x), maxX);

    let y = Math.floor(Math.random() * (maxY + 1));
    y = Math.min(Math.max(0, y), maxY);

    return { x, y };
};

export { drawCoords };
