import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

import { data } from './data'
import { buildGeometry, splitGeometry } from './build'

let camera, scene, renderer, ambient, point;
let guiBefore, guiAfter;
let controlUpdate = false;
let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
let group = new THREE.Group();  //整个模型对象
let update = {
    '拆分前': () => { controlUpdate = false; setMesh(); },
    '拆分后': () => { controlUpdate = true; setMesh(); }
}

init();
animate();

function init() {
    setScene();
    setLight();
    setCamera();
    setRenderer();
    setController();
    setHelper();
    setGui();
    setMesh();
}

function setScene() {
    scene = new THREE.Scene();
}

function setLight() {
    point = new THREE.PointLight(0xffffff); //点光源
    point.position.set(-800, 5000, 1000);   //点光源位置
    scene.add(point);
    ambient = new THREE.AmbientLight(0x444444);    //环境光
    scene.add(ambient);
}

function setCamera() {
    const k = width / height; //窗口宽高比
    const s = 4000; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 20000);
    camera.position.set(4000, 1300, 5500); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
}

function setRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
}

function setController() {
    // OrbitControls
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents(window);
}

function setHelper() {
    let axes = new THREE.AxesHelper(3000);
    scene.add(axes);
}

function setGui() {
    setGuiBefore();
    setGuiAfter();

    function setGuiBefore() {
        guiBefore = new GUI();
        guiBefore.width = 300;
        guiBefore.add(update, '拆分前')

        let folder = guiBefore.addFolder('楼梯');
        folder.add(data, 'ladderWidth', 4820)
        folder.add(data, 'ladderHeight', 3300)
        folder.add(data, 'ladderDepth', 2900)
        // folder.open();

        folder = guiBefore.addFolder('梯段');
        folder.add(data, 'stairWidth', 1).onChange(setMesh);
        folder.add(data, 'stairHeight', 1).onChange(setMesh);
        folder.add(data, 'stairDepth', 1).onChange(setMesh);
        folder.add(data, 'stairNumber', 1).onChange(setMesh);
        folder.add(data, 'distance', 100).onChange(setMesh);
        folder.add(data, 'thickness', 180).onChange(setMesh);
        folder.open();

        folder = guiBefore.addFolder('梯梁');
        folder.add(data, 'beamWidth', 1).onChange(setMesh);
        folder.add(data, 'beamHeight', 1).onChange(setMesh);
        folder.add(data, 'beamDepth', 1).onChange(setMesh);
        folder.open();
    }

    function setGuiAfter() {
        guiAfter = new GUI();
        guiAfter.add(update, '拆分后')

        let folder = guiAfter.addFolder('梯段');
        folder.add(data, 'stairWidth', 1).onChange(setMesh);
        folder.add(data, 'stairHeight', 1).onChange(setMesh);
        folder.add(data, 'stairDepth', 1).onChange(setMesh);
        folder.add(data, 'stairNumber', 1).onChange(setMesh);
        folder.add(data, 'thickness', 1).onChange(setMesh);
        folder.add(data, 'horizontalWidth', 1).onChange(setMesh);
        folder.open();

        folder = guiAfter.addFolder('梯梁');
        folder.add(data, 'beamWidth', 1).onChange(setMesh);
        folder.add(data, 'beamHeight', 1).onChange(setMesh);
        folder.add(data, 'beamDepth', 1).onChange(setMesh);
        folder.open();

        folder = guiAfter.addFolder('拼缝');
        folder.add(data, 'pieceOne', 1).onChange(setMesh);
        folder.add(data, 'pieceTwo', 1).onChange(setMesh);
        folder.add(data, 'pieceThree', 1).onChange(setMesh);
        folder.add(data, 'pieceFour', 1).onChange(setMesh);
        folder.add(data, 'pieceFive', 1).onChange(setMesh);
        folder.add(data, 'pieceSix', 1).onChange(setMesh);
        folder.open();

        
    }

}

function setMesh() {

    if (!controlUpdate) {
        removeGroup();
        group = buildGeometry();
        scene.add(group)
    } else {
        removeGroup();
        group = splitGeometry();
        scene.add(group)
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function removeGroup() {
    let group_to_remove = [];
    // Three.js删除模型对象(.remove()和·dispose()方法)
    group.traverse(function (obj) {
        if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            obj.material.dispose();
        }
        if (obj instanceof THREE.Group) {
            group_to_remove.push(obj)
        }
    })
    // 删除所有需要删除的group
    group_to_remove.forEach((items) => {
        group.remove(items);
    })
}

export { update }