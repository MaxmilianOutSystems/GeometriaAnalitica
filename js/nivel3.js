(() => {
    'use stric'
    var control = { status: false, x: -250, y: 50, z: 644 }
    var scene, camera, renderer, texture, geometry, material, cube, terra, moon;

    var key = { event: " ", status: false }
    var touchpad = { event: " ", status: false }

    var axis;

    //var distanceMoon = { x: 0, y: 0, z: 0 }
    var distanceTerra = { x: 0, y: 0, z: 0 }
    var distanceCube = { x: 0, y: 0, z: 0 }
    var distancecentroT= {x:0, y: 0, z: 0}
    //var distancecentroL = { x: 0, y: 0, z: 0 }
    var distancia
    var cont = 1
    var angle = 0.3  
    var raio

    var pivotPoint,pivotPoint2, pivotPointL;
    pivotPoint = new THREE.Object3D();
    pivotPoint2 = new THREE.Object3D();
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
    document.getElementById('raio').addEventListener('click', Next);
    
    //var audio1 = document.getElementById('audio1')
    //var audio2 = document.getElementById('audio2')

    function BuilderGamer() {

        SceneBuild()
        startCube(CubeMaker())
        addAxisInScene()
        //startMoon(MoonMaker())
        startTerra(Terra())
        startCentroT(CentroTerra())
        startCentroT2(CentroTerra2())
        //startCentroL(CentroLua())
        
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
        cube.rotation.x = angle
        cube.rotation.y = angle    
        scene.add(cube);
        return cube
    }

    function startCube(cube, x = 50, y = 180, z = 200) {
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

    function startCentroT(centroT, x = 20, y = 10, z = 30) {
        centroT.position.x = x
        centroT.position.y = y
        centroT.position.z = z

        distancecentroT = { x: centroT.position.x, y: centroT.position.y, z: centroT.position.z }

    }

    function CentroTerra2(x = 50, y = 10, z = 10, color = 'gold') {
        texture = new THREE.TextureLoader().load('images/satelite.jpg')
        geometry = new THREE.CubeGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture });
        centroT2 = new THREE.Mesh(geometry, material);
        centroT2.add(pivotPoint2)
        scene.add(centroT2);
        return centroT2
    }

    function startCentroT2(centroT2, x = 0, y = 0, z = 0) {
        centroT2.position.x = x
        centroT2.position.y = y
        centroT2.position.z = z

        distancecentroT2 = { x: centroT2.position.x, y: centroT2.position.y, z: centroT2.position.z }

    }

   /* function CentroLua(x = 5, y = 3, z = 3, color = 'gold') {
        texture = new THREE.TextureLoader().load('images/satelite.jpg')
        geometry = new THREE.CubeGeometry(x, y, z);
        material = new THREE.MeshBasicMaterial({ map: texture });
        centroL = new THREE.Mesh(geometry, material);
        centroL.add(pivotPointL)
        scene.add(centroL);
        return centroL
    }*/

    /*function startCentroL(centroL, x = -120, y = 180, z = 500) {
        centroL.position.x = x
        centroL.position.y = y
        centroL.position.z = z

        distancecentroL = { x: centroL.position.x, y: centroL.position.y, z: centroL.position.z }

    }*/

    function Terra(x = 104, y = 103, z = 103, color = 'red') {
        texture = new THREE.TextureLoader().load('images/Terra.jpg')
        geometry = new THREE.SphereGeometry(x, y, z)
        material = new THREE.MeshBasicMaterial({ map: texture });
        terra = new THREE.Mesh(geometry, material);
        //terra.add(pivotPoint);
        scene.add(terra);
        return terra
    }

    function startTerra(terra, x = 20, y = 30, z = 50) {
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
        scene.add(moon)
        return moon
    }

    function startMoon(moon, x = 0, y = 0, z = 0) {
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

        document.getElementById('terraX').value = distancecentroT.x
        document.getElementById('terraY').value = distancecentroT.y
        document.getElementById('terraZ').value = distancecentroT.z

        document.getElementById('cuboX').value = distanceCube.x
        document.getElementById('cuboY').value = distanceCube.y
        document.getElementById('cuboZ').value = distanceCube.z

        document.getElementById('distanceX').value = distancecentroT.x - distanceCube.x
        document.getElementById('distanceY').value = distancecentroT.y - distanceCube.y
        document.getElementById('distanceZ').value = distancecentroT.z - distanceCube.z
         
        distancia = Math.pow(distancecentroT.x - distanceCube.x,2) + Math.pow(distancecentroT.y - distanceCube.y,2) + Math.pow(distancecentroT.z - distanceCube.z,2)
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
        pivotPoint2.rotation.y += 0.011;
        //pivotPointL.rotation.y += 0.01;
        //pivotPoint.rotation.z += 0.907;
        pivotPoint.add(terra)
        //pivotPointL.add(moon)
   
    }

    function win() {
        if (Math.sqrt(distancia) == 104 && cont==1) {
            cube.position.y = 0
            cube.position.x = 0
            cube.position.z = 120
            pivotPoint2.add(cube)
            mensagem.style.display="block" 
        }
        else if(cont>1) {
            
            cube.position.y = 104
        }
    }
     

    function Next() {               
        window.location.href = "nivel3.html";
        cont += 1
        
    }


})()