import * as THREE from 'three';
import { Beam, Stairs, Horizontal } from './class';
import { parameter } from './data'

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
 * 传入参数，构建梯段的网格模型
 * @param { Number } width 梯段的总宽度
 * @param { Number } height 梯段的总高度
 * @param { Number } depth 梯段的长度
 * @param { Number } number 梯段的阶梯个数
 * @returns THREE.Mesh
 */
function buildStairs(width, height, depth, number) {
    let stairs = new Stairs(width, height, depth, number);
    let stairsGeometry = stairs.build();
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(stairsGeometry, material);
}

/**
 * 传入参数，构建水平梯段的网格模型
 * @param { Number } x 水平梯段的宽
 * @param { Number } y 水平梯段的高
 * @param { Number } z 水平梯段的长
 * @returns THREE.Mesh
 */
function buildHorizontal(x, y, z) {
    let horizontal = new Horizontal(x, y, z);
    let horizontalGeometry = horizontal.build();
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    });
    return new THREE.Mesh(horizontalGeometry, material);
}



function buildGeometry() {
    let beamDown1 = buildBeam(parameter.beamWidth, parameter.beamHeight, parameter.beamDepth);
    beamDown1.translateOnAxis(v_x, parameter.beamWidth / 2).translateOnAxis(v_y, -(parameter.beamHeight) / 2);

    let beamUp1 = buildBeam(parameter.beamWidth, parameter.beamHeight, parameter.beamDepth);
    beamUp1.translateOnAxis(v_x, parameter.stairWidth + parameter.beamWidth * 3 / 2).translateOnAxis(v_y, parameter.stairHeight - (parameter.beamHeight) / 2);

    let stairs1 = buildStairs(parameter.stairWidth, parameter.stairHeight, parameter.stairDepth, parameter.stairNumber);
    stairs1.translateOnAxis(v_x, parameter.beamWidth).translateOnAxis(v_y, -(parameter.beamHeight) / 2).translateOnAxis(v_z, parameter.distance / 2);

    let beamDown2 = buildBeam(parameter.beamWidth, parameter.beamHeight, parameter.beamDepth);
    beamDown2.translateOnAxis(v_x, parameter.beamWidth / 2).translateOnAxis(v_y, -(parameter.beamHeight) / 2);

    let beamUp2 = buildBeam(parameter.beamWidth, parameter.beamHeight, parameter.beamDepth);
    beamUp2.translateOnAxis(v_x, parameter.stairWidth + parameter.beamWidth * 3 / 2).translateOnAxis(v_y, parameter.stairHeight - (parameter.beamHeight) / 2);

    let stairs2 = buildStairs(parameter.stairWidth, parameter.stairHeight, parameter.stairDepth, parameter.stairNumber);
    stairs2.translateOnAxis(v_x, parameter.beamWidth).translateOnAxis(v_y, -(parameter.beamHeight) / 2).translateOnAxis(v_z, parameter.distance / 2);

    let group1 = new THREE.Group();
    let group2 = new THREE.Group();

    group1.add(beamUp1, beamDown1, stairs1)

    group2.add(beamUp2, beamDown2, stairs2).rotateOnAxis(v_y, Math.PI).translateOnAxis(v_x, - parameter.stairWidth - parameter.beamWidth * 2)

    group.add(group1, group2)

    return group;
}

function splitGeometry() {
    let horizontalDown1 = buildHorizontal(parameter.horizontalWidth, parameter.thickness, parameter.stairDepth - parameter.pieceOne - parameter.pieceTwo)
    horizontalDown1.translateOnAxis(v_x, parameter.horizontalWidth / 2).translateOnAxis(v_y, parameter.thickness / 2).translateOnAxis(v_z, (parameter.stairDepth - parameter.pieceOne - parameter.pieceTwo) / 2)

    let horizontalUp1 = buildHorizontal(parameter.horizontalWidth, parameter.thickness, parameter.stairDepth - parameter.pieceOne - parameter.pieceTwo)
    horizontalUp1.translateOnAxis(v_x, parameter.stairWidth + parameter.horizontalWidth * 3 / 2).translateOnAxis(v_y, parameter.stairHeight + (parameter.thickness) / 2).translateOnAxis(v_z, (parameter.stairDepth - parameter.pieceOne - parameter.pieceTwo) / 2)

    let stairs1 = buildStairs(parameter.stairWidth, parameter.stairHeight, parameter.stairDepth - parameter.pieceOne - parameter.pieceTwo, parameter.stairNumber);
    stairs1.translateOnAxis(v_x, parameter.horizontalWidth)

    let group1 = new THREE.Group();
    let group2 = new THREE.Group();

    group1.add(stairs1, horizontalDown1, horizontalUp1)

    group.add(group1, group2)

    return group
}

export{ buildGeometry, splitGeometry }