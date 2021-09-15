import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let camera, scene, raycaster, renderer, ambient, point;
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
    setMesh();
}

function setScene() {
    scene = new THREE.Scene();
}

function setLight() {
    //点光源
    point = new THREE.PointLight(0xffffff);
    point.position.set(-800, 5000, 1000); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    ambient = new THREE.AmbientLight(0x444444);
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

function setMesh() {
    class Stairs {
        // 梯段类
        constructor(width, height, deepth, number) {
            this.width = width;
            this.height = height;
            this.deepth = deepth;
            this.number = number;
        }
        build() {
            let shape = new THREE.Shape();
            const perWidth = this.width / this.number;
            const perHeight = this.height / this.number;
            shape.moveTo(100, 0);
            shape.lineTo(100, 180 + perHeight)
            for (let i = 1; i < this.number + 1; i++) {
                shape.lineTo(100 + perWidth * i, 180 + perHeight * i);
                if (i < this.number){
                    shape.lineTo(100 + perWidth * i, 180 + perHeight * (i + 1));
                }
            }
            let extrudeSettings = {
                steps: 2,
                depth: this.deepth,
                bevelEnabled: false,
            };
            return new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        }
    }
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
    function buildBeam() {
        let beam = new Beam(200, 400, 2900);
        let beamGeometry = beam.build();
        let material = new THREE.MeshLambertMaterial({
            color: 0x00e600,
            side: THREE.DoubleSide,
        });
        return new THREE.Mesh(beamGeometry, material);
    }
    function buildStairs() {
        let stairs = new Stairs(4420, 2900 - (400 - 180), 1400, 17);
        let stairsGeometry = stairs.build();
        let material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
        });
        return new THREE.Mesh(stairsGeometry, material);
    }


    let beamDown = buildBeam();
    let stairs = buildStairs();
    let group = new THREE.Group();
    group.add(beam)
    group.add(stairs)
    group.translateOnAxis(v_x, 100)
    group.translateOnAxis(v_y, -200)
    scene.add(group)
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}
