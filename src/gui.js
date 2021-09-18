import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

import { data, parameter1, parameter2, basic } from './data'
import { setMesh, update } from './index'
import { down, mid1, mid2 } from './build'


function setGuiBefore() {
    let guiBefore = new GUI();
    guiBefore.width = 300;
    guiBefore.add(update, '拆分前').onChange(setMesh)
    guiBefore.domElement.style = 'position:absolute;top:0px;left:0px';

    let folder = guiBefore.addFolder('楼梯');
    folder.add(data, 'ladderWidth', 4820).onChange(setMesh).listen();
    folder.add(data, 'ladderHeight', 3300).onChange(setMesh).listen();
    folder.add(data, 'ladderDepth', 2900).onChange(down).listen();
    folder.open();

    folder = guiBefore.addFolder('梯段');
    folder.add(data, 'stairWidth', 1).onChange(setMesh).listen();
    folder.add(data, 'stairHeight', 1).onChange(setMesh).listen();
    folder.add(data, 'stairDepth', 1).onChange(setMesh).listen();
    folder.add(data, 'stairNumber', 1).onChange(setMesh).listen();
    folder.add(data, 'distance', 100).onChange(setMesh).listen();
    folder.add(data, 'thickness', 180).onChange(setMesh).listen();
    folder.open();

    folder = guiBefore.addFolder('梯梁');
    folder.add(data, 'beamWidth', 1).onChange(setMesh).listen();
    folder.add(data, 'beamHeight', 1).onChange(setMesh).listen();
    folder.add(data, 'beamDepth', 1).onChange(setMesh).listen();
    folder.open();

    var folder2 = guiBefore.addFolder('拼缝');
    folder2.add(data, 'pieceOne', 1).onChange(setMesh).listen();
    folder2.add(data, 'pieceTwo', 1).onChange(setMesh).listen();
    folder2.add(data, 'pieceThree', 1).onChange(setMesh).listen();
    folder2.add(data, 'pieceFour', 1).onChange(setMesh).listen();
    folder2.add(data, 'pieceFive', 1).onChange(setMesh).listen();
    folder2.add(data, 'pieceSix', 1).onChange(setMesh).listen();
    folder2.open();
}

function setGuiAfter1() {
    let guiAfter = new GUI();
    guiAfter.add(update, '拆分后').onChange()

    let folder = guiAfter.addFolder('梯段1');
    folder.add(parameter1, 'stairWidth', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'stairHeight', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'stairDepth', 1).onChange(mid1).listen();
    folder.add(parameter1, 'stairNumber', 1).onChange(setMesh).listen();
    folder.add(data, 'thickness', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'horizontalWidth', 1).onChange(setMesh).listen();
    folder.open();

    folder = guiAfter.addFolder('梯梁1');
    folder.add(parameter1, 'beamWidth', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'beamHeight', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'beamDepth', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'sinkHeight', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'earWidth', 1).onChange(setMesh).listen();
    folder.add(parameter1, 'earHeight', 1).onChange(setMesh).listen();
    folder.open();
}

function setGuiAfter2() {
    let guiAfter = new GUI();
    guiAfter.add(update, '拆分后').onChange()

    let folder = guiAfter.addFolder('梯段2');
    folder.add(parameter2, 'stairWidth', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'stairHeight', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'stairDepth', 1).onChange(mid2).listen();
    folder.add(parameter2, 'stairNumber', 1).onChange(setMesh).listen();
    folder.add(data, 'thickness', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'horizontalWidth', 1).onChange(setMesh).listen();
    folder.open();

    folder = guiAfter.addFolder('梯梁2');
    folder.add(parameter2, 'beamWidth', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'beamHeight', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'beamDepth', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'sinkHeight', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'earWidth', 1).onChange(setMesh).listen();
    folder.add(parameter2, 'earHeight', 1).onChange(setMesh).listen();
    folder.open();
}


export { setGuiBefore, setGuiAfter1, setGuiAfter2 }