// let data = (function () {
let data = {
    // 楼梯参数
    'ladderWidth': 4820,
    'ladderHeight': 3300,
    'ladderDepth': 2900,
    
    // 梯段参数
    'stairWidth': 4420,
    'stairHeight': 2900,
    'stairDepth': 1400,
    'stairNumber': 17,
    // 水平梯段参数
    'horizontalWidth': 500,

    // 梯梁参数
    'beamWidth': 200,
    'beamHeight': 400,
    'beamDepth': 2900,

    'distance': 100,
    'thickness': 180,

    // 拼缝参数
    'pieceOne': 20,
    'pieceTwo': 20,
    'pieceThree': 20,
    'pieceFour': 20,
    'pieceFive': 20,
    'pieceSix': 20,

    params: function () {
        let params = data;
        // params.model = data.model;
        // // 楼梯参数
        // params.ladderWidth = data.ladderWidth;
        // params.ladderHeight = data.ladderHeight;
        // params.ladderDepth = data.ladderDepth;
        // // 梯段参数
        // params.stairWidth = data.stairWidth;
        // params.stairHeight = data.stairHeight;
        // params.stairDepth = data.stairDepth;
        // params.stairNumber = data.stairNumber;
        // // 梯梁参数
        // params.beamWidth = data.beamWidth;
        // params.beamHeight = data.beamHeight;
        // params.beamDepth = data.beamDepth;
        // params.distance = data.distance;
        // params.thickness = data.thickness;
        return params
    },
}
let parameter = data.params()
// return data;
// })();



export { parameter, data }