
interface ColorMap {
    [name: string]: any;
}

const colors = {
    blue: '#007aff',
    orange: '#ff9559',
    black: '#000000'
};

const colorMap: ColorMap = {};
Object.entries(colors).forEach(([key, value]):void => {
    colorMap[key] = value;
})

export {
    colors,
    colorMap
};