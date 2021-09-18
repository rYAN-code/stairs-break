import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import {setGuiBefore, setGuiAfter1, setGuiAfter2} from './gui'
import { buildGeometry, splitGeometry, removeGroup } from './build'

let camera, scene, renderer, ambient, point;
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
    setGuiAfter1();
    setGuiAfter2();
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



export {setMesh, update}