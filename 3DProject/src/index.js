var container = document.getElementById("container");
var camera, scene, renderer;
var plane;
var mouse,
    raycaster,
    isShiftDown = false;
var rollOverMesh, rollOverMaterial;
var cubeGeo, cubeMaterial;
var objects = [];
var path = [];
var cubes = [];
var theMatrix = buildMatrix();

init();
render();

function init() {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.set(150, 1400, 700);
    camera.lookAt(0, 0, 0);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // roll-over helpers
    var rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true
    });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);

    // cubes
    cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xfeb74c
    });

    // grid
    var gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    // raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);
    plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            visible: false
        })
    );
    scene.add(plane);
    objects.push(plane);

    // lights
    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // start
    var startPoint = makeInstance(cubeGeo, 0x0ff74c,  0, 'Start');
    startPoint.cube.position.copy({
        x: -475,
        y: 25,
        z: -475
    });
    cubes.push(startPoint);
    scene.add(startPoint.cube);
    objects.push(startPoint.cube);

    // end
    var endPoint =makeInstance(cubeGeo, 0x00f7fc,  0, 'End'); 
    endPoint.cube.position.copy({
        x: 475,
        y: 25,
        z: 475
    });
    cubes.push(endPoint);
    scene.add(endPoint.cube);
    objects.push(endPoint.cube);

    // 開始 pathFInding
    $("#findBtn").click(function () {
        var grid = new PF.Grid(theMatrix);

        var finder = new PF.AStarFinder();

        path = finder.findPath(0, 0, 19, 19, grid);
        path.forEach(element => {
            var point = new THREE.Mesh(
                cubeGeo,
                new THREE.MeshLambertMaterial({
                    color: 0xE5E5D8,
                    opacity: 0.7,
                    transparent: true
                })
            );
            point.position.copy({
                x: element[0] * 50 - 475,
                y: 25,
                z: element[1] * 50 - 475
            });
            scene.add(point);
        });
    });

    container.appendChild(renderer.domElement);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mousedown", onDocumentMouseDown, false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);    

    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // auto resize
    window.addEventListener("resize", onWindowResize, false);
   
    // render
    requestAnimationFrame(render);
}

function makeInstance(geometry, color, x, name) {
    const labelContainerElem = document.querySelector('#labels');

    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    const elem = document.createElement('div');
    elem.textContent = name;
    labelContainerElem.appendChild(elem);

    return {cube, elem};
  }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position
            .divideScalar(50)
            .floor()
            .multiplyScalar(50)
            .addScalar(25);
    }
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        var intersect = intersects[0];
        // delete cube
        if (isShiftDown) {
            if (intersect.object !== plane) {
                scene.remove(intersect.object);
                objects.splice(objects.indexOf(intersect.object), 1);
            }
            // create cube
        } else {
            var voxel = new THREE.Mesh(cubeGeo, cubeMaterial);

            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position
                .divideScalar(50)
                .floor()
                .multiplyScalar(50)
                .addScalar(25);

            var blockPoint = xzToPoint(voxel.position.x,voxel.position.z);
            console.log("擺放點:"); console.log(blockPoint);
            theMatrix[blockPoint.row][blockPoint.col] = 1;

            if (voxel.position.y == 25) {
                scene.add(voxel);
                objects.push(voxel);
            }
        }
    }
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 16:
            isShiftDown = true;
            break;
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 16:
            isShiftDown = false;
            break;
    }
}

function render() {

    // 更新 startPoint以及endPoint
    cubes.forEach((cubeInfo, ndx) => {
        const {cube, elem} = cubeInfo;
        const tempV = new THREE.Vector3();
        // get the position of the center of the cube
        cube.updateWorldMatrix(true, false);
        cube.getWorldPosition(tempV);
        // get the normalized screen coordinate of that position
        // x and y will be in the -1 to +1 range with x = -1 being
        // on the left and y = -1 being on the bottom
        tempV.project(camera);
  
        // convert the normalized position to CSS coordinates
        const x = (tempV.x *  .5 + .5) * window.innerWidth;
        const y = (tempV.y * -.5 + .5) * window.innerHeight;
        // move the elem to that position
        elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
      });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function buildMatrix() {
    var size = 20;
    var matrix = [];
    for (var r = 1; r <= 20; r++) {
        var insideArr = [];
        for (var c = 1; c <= 20; c++) {
            insideArr.push(0);
        }
        matrix.push(insideArr);
    }
    return matrix;
}

function xzToPoint(x, z) {
    var col = (x + 475) / 50;
    var row = (z + 475) / 50;
    return {
        col: col,
        row: row
    };
}