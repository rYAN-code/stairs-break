import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { Beam, Stairs } from './class';
import { parameter, data } from './data'

let camera, scene, renderer, ambient, point;
let gui, raycaster;
let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
// x, y, z 轴的单位向量
let v_x = new THREE.Vector3(1, 0, 0);
let v_y = new THREE.Vector3(0, 1, 0);
let v_z = new THREE.Vector3(0, 0, 1);

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
    gui = new GUI();
    gui.width = 350;
    let folder = gui.addFolder('Scene');
    folder.add(data, 'model', ["beforeSplit", "afterSplit"]).onChange( setMesh() );
    folder.open();

    folder = gui.addFolder('Ladder');
    folder.add(data, 'ladderWidth', 4820)
    folder.add(data, 'ladderHeight', 3300)
    folder.add(data, 'ladderDepth', 2900)
    folder.open();

    folder = gui.addFolder('Stair');
    folder.add(data, 'stairWidth', 0).onChange(setMesh);
    folder.add(data, 'stairHeight', 2900)
    folder.add(data, 'stairDepth', 1400)
    folder.add(data, 'stairNumber', 17)
    folder.add(data, 'distance', 100)
    folder.open();

    folder = gui.addFolder('Beam');
    folder.add(data, 'beamWidth', 200)
    folder.add(data, 'beamHeight', 400)
    folder.add(data, 'beamDepth', 4820)
    folder.open();
}

function setMesh() {

    /**
     * 传入参数，构建梯梁的网格模型
     * @param {梯梁的宽} x 
     * @param {梯梁的高} y 
     * @param {梯梁的长} z 
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
     * @param {梯段的总宽度} width 
     * @param {梯段的总高度} height 
     * @param {梯段的长度} depth 
     * @param {梯段的阶梯个数} number 
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

    if (parameter.model === 'beforeSplit') {
        buildGeometry();
    } else if (parameter.model === 'afterSplit') {
        splitGeometry();
    }

    function buildGeometry() {
        let beamDown = buildBeam(200, 400, 2900);
    
        let beamUp = buildBeam(200, 400, 2900);
        beamUp.translateOnAxis(v_x, 4520);
        beamUp.translateOnAxis(v_y, 2900);
    
        let stairs = buildStairs(data.stairWidth, data.stairHeight, data.stairDepth, data.stairNumber);
        stairs.translateOnAxis(v_z, 50)
    
        let group1 = new THREE.Group();
        let group2 = new THREE.Group();
    
        group2.add(beamUp);
        group2.add(stairs);
        group2.translateOnAxis(v_x, 100);
    
        group1.add(beamDown);
        group1.add(group2);
        group1.translateOnAxis(v_x, 100);
        group1.translateOnAxis(v_y, -200);
    
        let group3 = new THREE.Group();
        group3 = group1.clone().rotateOnAxis(v_y, Math.PI).translateOnAxis(v_x, -4620)
    
        scene.add(group1)
        scene.add(group3)
    }

    function splitGeometry() {

    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}


