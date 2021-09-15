import * as THREE from 'three';
import {data} from './data'

class Beam {
    // 梯梁类
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    build() {
        return new THREE.BoxGeometry(this.x, this.y, this.z);
    }
}

class Stairs {
    // 梯段类
    constructor(width, height, deepth, number) {
        this.width = width;
        this.height = height;
        this.deepth = deepth;
        this.number = number;
    }
    build() {
        let distance = data.thickness / Math.sin(Math.atan(this.width / this.height))
        let shape = new THREE.Shape();
        const perWidth = this.width / this.number;
        const perHeight = this.height / (this.number + 1);
        shape.moveTo(0, 0);
        shape.lineTo(0, distance + perHeight)
        for (let i = 1; i < this.number + 1; i++) {
            shape.lineTo(perWidth * i, distance + perHeight * i);
            if (i < this.number){
                shape.lineTo(perWidth * i, distance + perHeight * (i + 1));
            }
        }
        shape.lineTo(this.width, this.height - distance + perHeight)
        console.log(shape)
        console.log(this.width)
        let extrudeSettings = {
            steps: 2,
            depth: this.deepth,
            bevelEnabled: false,
        };
        return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    }
}

export {Beam, Stairs}