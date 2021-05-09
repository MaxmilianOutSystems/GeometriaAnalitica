(() => {
    'use stric'
    var control = { status: false, x: -194, y: 154, z: 644 }
    var scene, camera, renderer, texture, geometry, material, cube, terra, moon;

    var key = { event: " ", status: false }
    var touchpad = { event: " ", status: false }

    var axis;

    var distanceMoon = { x: 0, y: 0, z: 0 }
    var distanceTerra = { x: 0, y: 0, z: 0 }
    var distanceCube = { x: 0, y: 0, z: 0 }
    var distancia
    var cont = 1
    
    var pivotPoint,pivotPointL;
    pivotPoint = new THREE.Object3D();
    pivotPointL = new THREE.Object3D();
    var mensagem = document.getElementById("mensagem");
    window.onload = BuilderGamer

    document.addEventListener("keydown", CaptureKeyDown)
    document.addEventListener("keyup", CaptureKeyUp)

    document.getElementById('btn1').addEventListener('touchstart', DownOn);
    document.getElementById('btn1').addEventListener('touchend', DownOff);
    document.getElementById('btn2').addEventListener('touchstart', LeftON);
    document.getElementById('btn2').addEventListener('touchend', LeftOff);
    document.getElementById('btn3').addEventListener('touchstart', RighON);
    document.getElementById('btn3').addEventListener('touchend', RighOff);
    document.getElementById('btn4').addEventListener('touchstart', UpON);
    document.getElementById('btn4').addEventListener('touchend', UpOff);

    document.getElementById('cuboX').addEventListener('click', movX);
    document.getElementById('cuboY').addEventListener('click', movY);
    document.getElementById('cuboZ').addEventListener('click', movZ);

    document.getElementById('mensagem').addEventListener('click', Next);
    
    //var audio1 = document.getElementById('audio1')
    //var audio2 = document.getElementById('audio2')

    function BuilderGamer() {

        SceneBuild()
        startCube(CubeMaker())
        addAxisInScene()
        startMoon(MoonMaker())
        startTerra(Terra())
        startCentroT(CentroTerra())
        startCentroL(CentroLua())
        
    }


    function SceneBuild() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement);
        camera.position.x = control.x
        camera.position.y = control.y
        camera.position.z = control.z
        CubeMaker()
        animate()
        mensagem.style.display="none"
    }

    function CubeMaker(x = 10, y = 5, z = 8, color = 'gold') {
        texture = new THREE.TextureLoader().load('images/satelite.jpg')
        geometry = new THREE.CubeGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        return cube
    }

    function startCube(cube, x = 0, y = 104, z = 0) {
        cube.position.x = x
        cube.position.y = y
        cube.position.z = z

        distanceCube = { x: cube.position.x, y: cube.position.y, z: cube.position.z }

    }

    function CentroTerra(x = 50, y = 10, z = 10, color = 'gold') {
        texture = new THREE.TextureLoader().load('images/satelite.jpg')
        geometry = new THREE.CubeGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture });
        centroT = new THREE.Mesh(geometry, material);
        centroT.add(pivotPoint)
        scene.add(centroT);
        return centroT
    }

    function startCentroT(centroT, x = 0, y = 0, z = 0) {
        centroT.position.x = x
        centroT.position.y = y
        centroT.position.z = z

        distancecentroT = { x: centroT.position.x, y: centroT.position.y, z: centroT.position.z }

    }

    function CentroLua(x = 5, y = 3, z = 3, color = 'gold') {
        texture = new THREE.TextureLoader().load('images/satelite.jpg')
        geometry = new THREE.CubeGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture });
        centroL = new THREE.Mesh(geometry, material);
        centroL.add(pivotPointL)
        scene.add(centroL);
        return centroL
    }

    function startCentroL(centroL, x = 0, y = 384, z = 0) {
        centroL.position.x = x
        centroL.position.y = y
        centroL.position.z = z

        distancecentroL = { x: centroL.position.x, y: centroL.position.y, z: centroL.position.z }

    }

    function Terra(x = 104, y = 103, z = 103, color = 'red') {
        texture = new THREE.TextureLoader().load('images/Terra.jpg')
        geometry = new THREE.SphereGeometry(x, y, z)
        material = new THREE.MeshBasicMaterial({ map: texture });
        terra = new THREE.Mesh(geometry, material);
        //terra.add(pivotPoint);
        scene.add(terra);
        return terra
    }

    function startTerra(terra, x = 0, y = 0, z = 0) {
        terra.position.x = x
        terra.position.y = y
        terra.position.z = z

        distanceTerra = { x: terra.position.x, y: terra.position.y, z: terra.position.z }
    }

    function MoonMaker(x = 13, y = 200, z = 200) {
        texture = new THREE.TextureLoader().load('images/Lua.jpg')
        geometry = new THREE.SphereGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture })
        moon = new THREE.Mesh(geometry, material);
        //moon.add(pivotPointL);
        scene.add(moon)
        return moon
    }

    function startMoon(moon, x = 0, y = 384, z = 0) {
        moon.position.x = x
        moon.position.y = y
        moon.position.z = z

        distanceMoon = { x: moon.position.x, y: moon.position.y, z: moon.position.z }
    }

    function CaptureKeyDown(event) {
        key.event = event.key
        key.status = true
    }

    function CaptureKeyUp(event) {
        key.event = event.key
        key.status = false

    }

    function addAxisInScene() {
        axis = new THREE.AxisHelper(700);
        scene.add(axis);
    }

    function animate() {
        win()
        JoyStick()
        joyPad()
        AnimPivo()
        if (key.status || touchpad.status) {
            camera.position.z = control.z
            camera.position.x = control.x
            camera.position.y = control.y

        }

        upadteDisplay()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)

    }

    function JoyStick() {

        control.status = key.status

        if (key.status) {

            switch (key.event) {
                case 'ArrowUp':
                    control.z -= 2
                    break
                case 'ArrowDown':
                    control.z += 2
                    break
                case 'ArrowRight':
                    control.x += 2
                    break
                case 'ArrowLeft':
                    control.x -= 2
                    break
                case 'Shift':
                    control.y += 2
                    break
                case 'Control':
                    control.y -= 2
                    break
                case 'Delete':
                    conosle.log("vai da certo")
                    break
                default:

            }

        }

        return control.z

    }

    function joyPad() {

        control.status = touchpad.status

        if (touchpad.status) {

            switch (touchpad.event) {
                case 'up':
                    control.z -= 2
                    break
                case 'down':
                    control.z += 2
                    break
                case 'right':
                    control.x += 2
                    break
                case 'left':
                    control.x -= 2
                    break
                default:
            }
        }
        return control
    }

    function DownOn(event) {
        event.preventDefault()
        touchpad = { event: "down", status: true }
    }

    function DownOff() {
        touchpad = { event: "down", status: false }
    }

    function LeftON(event) {
        event.preventDefault()
        touchpad = { event: "left", status: true }
    }

    function LeftOff() {
        touchpad = { event: "left", status: false }
    }

    function RighON(event) {
        event.preventDefault()
        touchpad = { event: "right", status: true }
    }

    function RighOff() {
        touchpad = { event: "right", status: false }
    }

    function UpON() {
        event.preventDefault()
        touchpad = { event: "up", status: true }
    }

    function UpOff() {
        touchpad = { event: "up", status: false }
    }

    function upadteDisplay() {

        document.getElementById('luaX').value = distanceMoon.x
        document.getElementById('luaY').value = distanceMoon.y
        document.getElementById('luaZ').value = distanceMoon.z

        document.getElementById('terraX').value = distanceTerra.x
        document.getElementById('terraY').value = distanceTerra.y
        document.getElementById('terraZ').value = distanceTerra.z

        document.getElementById('cuboX').value = distanceCube.x
        document.getElementById('cuboY').value = distanceCube.y
        document.getElementById('cuboZ').value = distanceCube.z

        document.getElementById('distanceX').value = distanceMoon.x - distanceCube.x
        document.getElementById('distanceY').value = distanceMoon.y - distanceCube.y
        document.getElementById('distanceZ').value = distanceMoon.z - distanceCube.z
        distancia = Math.pow(distanceMoon.x - distanceCube.x,2) + Math.pow(distanceMoon.y - distanceCube.y,2) + Math.pow(distanceMoon.z - distanceCube.z,2)
        document.getElementById('distancia').value = Math.sqrt(distancia)
       
       
    }

    function movX() {
        //playAudio()
        distanceCube.x = parseInt(prompt("Informe o valor da Coordenada x"));
        cube.position.x = distanceCube.x

    }

    function movY() {
        //playAudio()
        distanceCube.y = parseInt(prompt("Informe o valor da Coordenada y"));
        cube.position.y = distanceCube.y

    }

    function movZ() {
        //playAudio()
        distanceCube.z = parseInt(prompt("Informe o valor da Coordenada z"));
        cube.position.z = distanceCube.z

    }


    function AnimPivo() {
        //seprecisar girar nas outras coordenadas
        //pivotPoint.rotation.x += 0.907;
        pivotPoint.rotation.y += 0.002;
        pivotPointL.rotation.z += 0.01;
        //pivotPoint.rotation.z += 0.907;
        
        pivotPoint.add(terra)
        pivotPoint.add(moon)

   
    }

    function win() {
        console.log("posição cubo",cont)
        if (Math.sqrt(distancia) == 28 && cont==1) {
            pivotPointL.add(cube)
            cube.position.y = 20
            mensagem.style.display="block" 
        }
        else if(cont>1) {
            
            cube.position.y = 104
        }
    }
     

    function Next() {               
        window.location.href = "nivel1.html";
        cont += 1
        
    }


})()