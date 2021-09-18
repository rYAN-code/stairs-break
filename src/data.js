// 拆分前的参数
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
    'sinkHeight': 200,
    'earWidth': 200,
    'earHeight': 200,

    'distance': 100,
    'thickness': 180,

    // 拼缝参数
    'pieceOne': 20,
    'pieceTwo': 20,
    'pieceThree': 20,
    'pieceFour': 20,
    'pieceFive': 30,
    'pieceSix': 20,
};
Object.defineProperties(data, {
    'stairDepth': {
        get: () => { return data._stairDepth = (data.ladderDepth - data.distance) / 2 || 1400 },
        // get:function(){return this._stairDepth = (this.ladderDepth - this.distance) / 2},
        set: (v) => { data.distance = data.ladderDepth - v * 2 }
    },
    'beamDepth': {
        get: () => { return data._beamDepth = data.ladderDepth || 2900 },
        set: (v) => { data.ladderDepth = v; }
    },
    'stairWidth': {
        get: () => { return data._stairWidth = data.ladderWidth - data.beamWidth * 2 || 4420 },
        set: (v) => { data.ladderWidth = data.beamWidth * 2 + v }
    },
    'stairHeight': {
        get: () => { return data.stairHeight = data.ladderHeight - data.beamHeight || 2900 },
        set: (v) => { data.ladderHeight = data.beamHeight + v }
    },
})

// 拆分后梯段一的参数
let parameter1 = deepClone(data);
Object.defineProperties(parameter1, {
    'sinkHeight': {
        get: function(){
            return this._sinkHeight = this.beamHeight - this.earHeight;
        },
        set: function(v){
            this.earHeight = this.beamHeight - v;
        }
    }
})

// 拆分后梯段二的参数
let parameter2 = deepClone(data);
Object.defineProperties(parameter2, {
    'sinkHeight': {
        get: function(){
            return this._sinkHeight = this.beamHeight - this.earHeight;
        },
        set: function(v){
            this.earHeight = this.beamHeight - v;
        }
    }
})

function deepClone(obj, result) {
    var result = result || {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'object' && obj[prop] !== null) {
                // 引用值（obj/array）,且不为null
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    // 对象
                    result[prop] = {};
                } else {
                    // 数组
                    result[prop] = [];
                }
                deepClone(obj[prop], result[prop]);
            } else {
                // 原始值或函数
                result[prop] = obj[prop];
            }
        }
    }
    return result;
}

let basic = deepClone(data);

export { data, parameter1, parameter2, basic, deepClone }