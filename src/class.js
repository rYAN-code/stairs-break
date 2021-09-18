import * as THREE from 'three';

class Beam {
    // 梯梁类
    constructor(width, height, depth) {
        // this.width = width;
        // this.height = height;
        // this.depth = depth;
        Object.assign(this, {width, height, depth})
    }
    build() {
        return new THREE.BoxGeometry(this.width, this.height, this.depth);
    }
}

class Stairs {
    // 梯段类
    constructor(width, height, depth, number, thickness, horizontalWidth) {
        Object.assign(this, {width, height, depth, number, thickness, horizontalWidth})
    }
    build() {
        let distance = this.thickness / Math.sin(Math.atan(this.width / this.height))
        let shape = new THREE.Shape();
        const perWidth = this.width / this.number;
        const perHeight = this.height / (this.number + 1);
        shape.moveTo(0, 0).lineTo(0, distance + perHeight);
        for (let i = 1; i < this.number + 1; i++) {
            shape.lineTo(perWidth * i, distance + perHeight * i);
            if (i < this.number) {
                shape.lineTo(perWidth * i, distance + perHeight * (i + 1));
            }
        }
        shape.lineTo(this.width, this.height - perHeight)
        let extrudeSettings = {
            steps: 2,
            depth: this.depth,
            bevelEnabled: false,
        };
        return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    }
    split() {
        let angle = Math.atan(this.width / this.height);
        let distance = this.thickness / Math.sin(angle);
        let littleWidth = this.thickness / Math.cos(angle);
        let shape = new THREE.Shape();
        const perWidth = this.width / this.number;
        const perHeight = this.height / (this.number + 1);
        shape.moveTo(0, 0).lineTo(0, this.thickness).lineTo(this.horizontalWidth, this.thickness).lineTo(this.horizontalWidth, distance + perHeight);
        for (let i = 1; i < this.number + 1; i++) {
            shape.lineTo(this.horizontalWidth + perWidth * i, distance + perHeight * i);
            if (i < this.number) {
                shape.lineTo(this.horizontalWidth + perWidth * i, distance + perHeight * (i + 1));
            }
        }
        shape.lineTo(this.width + this.horizontalWidth, this.height - perHeight + this.thickness * 2)
        shape.lineTo(this.width + this.horizontalWidth * 2, this.height - perHeight + this.thickness * 2)
        shape.lineTo(this.width + this.horizontalWidth * 2, this.height - perHeight + this.thickness)
        shape.lineTo(this.width + this.horizontalWidth * 2 - (this.horizontalWidth - littleWidth), this.height - perHeight + this.thickness)
        shape.lineTo(this.horizontalWidth, 0)
        let extrudeSettings = {
            steps: 2,
            depth: this.depth,
            bevelEnabled: false,
        };
        return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    }
}

class Ear extends Beam {
    // 挑耳类
    constructor(width, height, depth, sinkHeight, earWidth, earHeight, pieceFive, pieceSix) {
        super(width, height, depth);
        Object.assign(this, {sinkHeight, earWidth, earHeight, pieceFive, pieceSix})
    }
    split() {
        let shape = new THREE.Shape();
        // shape.moveTo(0, 0).lineTo(0, this.height).lineTo(-this.width, this.height).lineTo(-this.width, this.earHeight)
        //     .lineTo(-this.width - this.earWidth, this.earHeight).lineTo(-this.width - this.earWidth, 0);
        shape.moveTo(0, 0).lineTo(-this.width, 0).lineTo(-this.width, -this.sinkHeight).lineTo(-this.width - this.earWidth, -this.sinkHeight)
            .lineTo(-this.width - this.earWidth, -this.sinkHeight - this.earHeight).lineTo(0, -this.sinkHeight - this.earHeight)
        let extrudeSettings = {
            steps: 2,
            depth: this.depth,
            bevelEnabled: false,
        };
        return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    }
}

export { Beam, Stairs, Ear }

