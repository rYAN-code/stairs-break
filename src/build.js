import * as THREE from 'three';
import { Beam, Stairs, Ear } from './class';
import { data, parameter1, parameter2  } from './data'

let group = new THREE.Group();
// x, y, z 轴的单位向量
let v_x = new THREE.Vector3(1, 0, 0);
let v_y = new THREE.Vector3(0, 1, 0);
let v_z = new THREE.Vector3(0, 0, 1);

/**
 * 传入参数，构建梯梁的网格模型
 * @param { Number } x 梯梁的宽
 * @param { Number } y 梯梁的高
 * @param { Number } z 梯梁的长
 * @returns THREE.Mesh
 */
function buildBeam(x, y, z) {
    let beam = new Beam(x, y, z);
    let beamGeometry = beam.build();
    let material = new THREE.MeshLambertMaterial({
        color: 0x00e600,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(beamGeometry, material);
}

/**
 * 传入参数，构建拆分前梯段的网格模型
 * @param { Number } width 梯段的总宽度
 * @param { Number } height 梯段的总高度
 * @param { Number } depth 梯段的长度
 * @param { Number } number 梯段的阶梯个数
 * @param { Number } thickness 梯段的板厚
 * @returns THREE.Mesh
 */
function buildStairs(width, height, depth, number, thickness) {
    let stairs = new Stairs(width, height, depth, number, thickness);
    let stairsGeometry = stairs.build();
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(stairsGeometry, material);
}

/**
 * 传入参数，构建拆分后梯段的网格模型
 * @param { Number } width 梯段的总宽度
 * @param { Number } height 梯段的总高度
 * @param { Number } depth 梯段的长度
 * @param { Number } number 梯段的阶梯个数
 * @param { Number } thickness 梯段的板厚
 * @param { Number } horizontalWidth 水平梯段的宽度
 * @returns THREE.Mesh
 */
function splitStairs(width, height, depth, number, thickness, horizontalWidth) {
    let stairs = new Stairs(width, height, depth, number, thickness, horizontalWidth);
    let stairsGeometry = stairs.split();
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(stairsGeometry, material);
}

/**
 * 
 * @param { Number } width 梯梁宽度
 * @param { Number } height 梯梁高度
 * @param { Number } depth 梯梁长度
 * @param { Number } sinkHeight 下沉高度
 * @param { Number } earWidth 挑耳宽度
 * @param { Number } earHeight 挑耳高度
 * @returns 
 */
function splitEar(width, height, depth, sinkHeight, earWidth, earHeight) {
    let ear = new Ear(width, height, depth, sinkHeight, earWidth, earHeight);
    let earGeometry = ear.split();
    let material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(earGeometry, material);
}


function buildGeometry() {
    let beamDown1 = buildBeam(data.beamWidth, data.beamHeight, data.beamDepth);
    beamDown1.translateOnAxis(v_x, data.beamWidth / 2).translateOnAxis(v_y, -(data.beamHeight) / 2);

    let beamUp1 = buildBeam(data.beamWidth, data.beamHeight, data.beamDepth);
    beamUp1.translateOnAxis(v_x, data.stairWidth + data.beamWidth * 3 / 2).translateOnAxis(v_y, data.stairHeight - (data.beamHeight) / 2);

    let stairs1 = buildStairs(data.stairWidth, data.stairHeight, data.stairDepth, data.stairNumber, data.thickness);
    stairs1.translateOnAxis(v_x, data.beamWidth).translateOnAxis(v_y, -(data.beamHeight) / 2).translateOnAxis(v_z, data.distance / 2);

    let beamDown2 = buildBeam(data.beamWidth, data.beamHeight, data.beamDepth);
    beamDown2.translateOnAxis(v_x, data.beamWidth / 2).translateOnAxis(v_y, -(data.beamHeight) / 2);

    let beamUp2 = buildBeam(data.beamWidth, data.beamHeight, data.beamDepth);
    beamUp2.translateOnAxis(v_x, data.stairWidth + data.beamWidth * 3 / 2).translateOnAxis(v_y, data.stairHeight - (data.beamHeight) / 2);

    let stairs2 = buildStairs(data.stairWidth, data.stairHeight, data.stairDepth, data.stairNumber, data.thickness);
    stairs2.translateOnAxis(v_x, data.beamWidth).translateOnAxis(v_y, -(data.beamHeight) / 2).translateOnAxis(v_z, data.distance / 2);

    let group1 = new THREE.Group();
    let group2 = new THREE.Group();

    group1.add(beamUp1, beamDown1, stairs1)

    group2.add(beamUp2, beamDown2, stairs2).rotateOnAxis(v_y, Math.PI).translateOnAxis(v_x, - data.stairWidth - data.beamWidth * 2)

    group.add(group1, group2)

    return group;
}

function splitGeometry() {

    let stairs1 = splitStairs(parameter1.stairWidth, parameter1.stairHeight, parameter1.stairDepth - data.pieceOne - data.pieceTwo, parameter1.stairNumber, data.thickness, parameter1.horizontalWidth);
    stairs1.translateOnAxis(v_z, data.pieceTwo);

    let ear1 = splitEar(parameter1.beamWidth, parameter1.beamHeight, parameter1.beamDepth, parameter1.sinkHeight, parameter1.earWidth, parameter1.earHeight);
    ear1.translateOnAxis(v_x, parameter1.stairWidth + parameter1.horizontalWidth * 2 + parameter1.beamWidth + data.pieceFive).translateOnAxis(v_y, parameter1.stairHeight + data.thickness + data.pieceSix).translateOnAxis(v_z, -parameter1.beamDepth / 2)

    let stairs2 = splitStairs(parameter2.stairWidth, parameter2.stairHeight, parameter2.stairDepth - data.pieceFour - data.pieceThree, parameter2.stairNumber, data.thickness, parameter2.horizontalWidth);
    stairs2.translateOnAxis(v_z, data.pieceThree);
    
    let ear2 = splitEar(parameter2.beamWidth, parameter2.beamHeight, parameter2.beamDepth, parameter2.sinkHeight - data.pieceSix, parameter2.earWidth - data.pieceFive, parameter2.earHeight);
    ear2.translateOnAxis(v_x, parameter2.stairWidth + parameter2.horizontalWidth * 2 + parameter2.beamWidth + data.pieceFive).translateOnAxis(v_y, parameter2.stairHeight - data.thickness - data.pieceSix).translateOnAxis(v_z, -parameter2.beamDepth / 2)

    let group1 = new THREE.Group();
    let group2 = new THREE.Group();

    group1.add(stairs1, ear1);
    group2.add(stairs2, ear2).rotateOnAxis(v_y, Math.PI).translateOnAxis(v_x, -(parameter2.stairWidth + parameter2.horizontalWidth * 2 + parameter2.beamWidth + data.pieceFive))

    group.add(group1, group2)

    return group;
}

export { buildGeometry, splitGeometry }