/**
 * Created with JetBrains WebStorm.
 * User: alex
 * Date: 04.07.13
 * Time: 14:20
 * To change this template use File | Settings | File Templates.
 */

/**
 * перед загрузкой модели мы подготовливаем сцену:
 * создаем камеру, контролы для управления ею,
 * освещение, землю,
 * настраиваем класс рендеринга
 * и добавляем рендерер на холст.
 * затем загружаем модель
 * и в каждом кадре обновляем ей скин
 */
(function () {
	var camera, scene, renderer;
	var sceneContainer;
	var skin;
	var controls;
	var stats;

	var points = [];

	var domEvents;

	var models = {};
	var currentModel;

	var reflectionMap;

	init();

	//точка входа
	function init() {
		setupScene();

		var modelURL = 'rotor/mtr/Cams.dae';
		var modelLoader = new THREE.ColladaLoader;
		//modelLoader.load(modelURL, sceneLoader_completeHandler);
		changeModel("mtr/Rotor_HiPoly.DAE", "mtr/images/Rotor_HiPoly_ReflectionMap.png");
		$('.buttons').children().click(modelBtn_clickHandler);
	}

	function setupScene() {
		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;

		setupCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);

		//создаем контролы для управления камерой
		controls = new THREE.OrbitControls(camera);
		controls.damping = 0.2;
		controls.addEventListener('change', render);

		scene = new THREE.Scene;
		scene.fog = new THREE.FogExp2(0x666699, 0.0005);
		setupLight(scene);
		//createGround(scene);
		
		sceneContainer = new THREE.Object3D;
		sceneContainer.scale.x = sceneContainer.scale.y = sceneContainer.scale.z = 20;
		sceneContainer.rotation.x = -Math.PI / 2;
		sceneContainer.rotation.z = -Math.PI / 2;
		scene.add(sceneContainer);

		var axes = new THREE.AxisHelper(100);
		//scene.add(axes);

		setupRenderer(SCREEN_WIDTH, SCREEN_HEIGHT);

		reflectionMap = createCubeMap();

		var container = document.getElementById('Canvas');
		container.appendChild(renderer.domElement);

		setupStatisticsPanel(container);

		//автомасштабирование сцены при масштабировании окна браузера
		THREEx.WindowResize(renderer, camera);

		domEvents = new THREEx.DomEvents(camera, renderer.domElement);
	}

	function setupCamera(fov, aspectRatio, near, far) {
		camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
		camera.position.x = -150;
		camera.position.y = 120;
		camera.position.z = 300;
	}

	function setupLight(scene) {
		//точечный свет
		var pointLight = new THREE.PointLight(0xffcccc, .8);
		pointLight.position.x = 10;
		pointLight.position.y = 400;
		pointLight.position.z = 500;
		//scene.add(pointLight);

		var auxLight = new THREE.PointLight(0xffcccc, .4);
		auxLight.position.x = 10;
		auxLight.position.y = 400;
		auxLight.position.z = -500;
		//scene.add(auxLight);

		var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(10, 400, 500);

		spotLight.castShadow = true;

		spotLight.shadowMapWidth = 4096;
		spotLight.shadowMapHeight = 4096;

		spotLight.shadowCameraNear = 500;
		spotLight.shadowCameraFar = 4000;
		spotLight.shadowCameraFov = 30;

		//scene.add(spotLight);

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 500, 0 );
		scene.add( hemiLight );

		//

		var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( -1, 1.75, 1 );
		dirLight.position.multiplyScalar( 50 );
		scene.add( dirLight );

		dirLight.castShadow = true;

		dirLight.shadowMapWidth = 2048;
		dirLight.shadowMapHeight = 2048;

		var d = 50;

		dirLight.shadowCameraLeft = -d;
		dirLight.shadowCameraRight = d;
		dirLight.shadowCameraTop = d;
		dirLight.shadowCameraBottom = -d;

		dirLight.shadowCameraFar = 3500;
		dirLight.shadowBias = -0.0001;
		dirLight.shadowDarkness = 0.35;

		var sun = new THREE.PointLightHelper(pointLight);
		//scene.add(sun);

		//рассеянный свет
		//scene.add(new THREE.AmbientLight(0xffffff));
	}

	function setupRenderer(width, height) {
		//запрашиваем webgl, если доступен, иначе - canvas
		//renderer = new THREE.WebGLRenderer({canvas: document.getElementById("glCanvas")});
		//renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer;
		var ieCanvas = '<object style="width:100%;height:100%;position: absolute;" id="glCanvas" type="application/x-webgl"></object>';
		if (Detector.webgl) {
			renderer = new THREE.WebGLRenderer({antialias: true});
		} else {
			$('body').append(ieCanvas);
			renderer = new THREE.WebGLRenderer({canvas: $("#glCanvas").get(0), antialias: true});
		}
		renderer.setClearColor(scene.fog.color, 1);
		//размер отрисовываемой области
		renderer.setSize(width, height);

		renderer.gammaInput = true;
		renderer.gammaOutput = true;
	}

	//настроим панельку со статистикой производительности
	function setupStatisticsPanel(container) {
		stats = new Stats;
		$(stats.domElement).css({position: 'absolute', bottom: '0px', 'z-index': 100});
		container.appendChild(stats.domElement);
	}

	function modelBtn_clickHandler() {
		changeModel($(this).attr('model'), $(this).attr('spec'));
	}
	
	function changeModel(modelSrc, spec){
		if (models[modelSrc]) {
			if (currentModel) sceneContainer.remove(currentModel);
			sceneContainer.add(models[modelSrc]);
			currentModel = models[modelSrc];
		} else {
			var modelLoader = new ModelLoader;

			modelLoader.load(modelSrc, spec, reflectionMap, function (src, loadedModel) {
				models[src] = loadedModel;
				if (currentModel) sceneContainer.remove(currentModel);
				sceneContainer.add(models[modelSrc]);
				currentModel = models[modelSrc];
				render();
			});
		}
		render();
	}

	function sceneLoader_completeHandler(collada) {
		console.log(collada);
		//настраиваем загруженную модельку
		var dae = collada.scene;/*
		dae.rotation.x = -Math.PI / 2;
		dae.rotation.z = -Math.PI / 2;
		dae.updateMatrix();*/
		sceneContainer.add(dae);

		/*extractPointMarks(dae);

		 for(var i in points){
		 domEvents.addEventListener(points[i], 'click', clickHandler);
		 }*/

		//вытягиваем из нее скин
		//skin = collada.skins[0];

		var particles = {};

		dae.traverse(function (child) {
			if (child instanceof THREE.SpotLight) {
				child.intensity = .4;
				//console.log(child);
			} else if(child.name.search(/^Camera.+\.Target/) != -1){
				var key = child.name.match(/\d+/)[0];
				var particle = particles[key] || {};
				var pos = child.position;
				
				particle.pos = new THREE.Vector3(pos.x, pos.y, pos.z);
				particles[key] = particle;
			} else if(child.name.search(/^Camera/) != -1){
				key = child.name.match(/\d+/)[0];
				particle = particles[key] || {};
				
				particle.cam = {
					position: child.position,
					rotation: child.rotation
				};
				particles[key] = particle;
			}
		});

		createParticles(particles);

		//обновляем сцену
		//update();
		render();
	}

	function createParticles(particles) {
		var size = 24;
		for (var key in particles) {
			var canvas = document.createElement("canvas");
			canvas.width = size;
			canvas.height = size;
			var ctx = canvas.getContext("2d");

			ctx.strokeStyle = 'rgba(255, 255, 255, 10)';
			ctx.fillStyle = 'rgba(0, 0, 0, 255)';
			ctx.lineWidth = 2;
			roundRect(ctx, 1, 1, size - 2, size - 2, 12);

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "#fff";
			ctx.font = "8pt Arial";
			ctx.fillText(parseInt(key), size / 2, size / 2);

			var map = new THREE.Texture(canvas);
			map.needsUpdate = true;

			var material = new THREE.PointCloudMaterial({size: size, sizeAttenuation: false, map: map, transparent: true});
			var geometry = new THREE.Geometry();
			geometry.vertices.push(particles[key].pos);
			var particle = new THREE.PointCloud(geometry, material);
			particle.cam = particles[key].cam;
			sceneContainer.add(particle);

			domEvents.addEventListener(particle, 'click', clickHandler);
		}
	}

	function roundRect(ctx, x, y, w, h, r) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	function extractPointMarks(dae) {
		var children = dae.children;
		for (var i in children) {
			var child = children[i];
			var mesh = child.children[0];
			mesh.name = child.id;
			if (child.id.search(/^point/) != -1) points.push(mesh);
			/*if(mesh.material)
			 for(var j in mesh.material.materials){
			 mesh.material.materials[j].ambient = new THREE.Color(0xffffff);
			 }*/
		}
	}

	function createCubeMap() {
		var path = "mtr/FishermansBastion/";
		var format = '.jpg';
		var urls = [
			path + 'posx' + format, path + 'negx' + format,
			path + 'posy' + format, path + 'negy' + format,
			path + 'posz' + format, path + 'negz' + format
		];
		return THREE.ImageUtils.loadTextureCube(urls);
	}

	var clock = new THREE.Clock();

	function update() {
		render();
		//THREE.AnimationHandler.update(clock.getDelta());
		//отправляем запрос на обновление сцены
		requestAnimationFrame(update);
	}

	function render() {
		renderer.render(scene, camera);
		stats.update();
	}

	function clickHandler(e) {
		console.log(e.target.cam);
		var cam = e.target.cam;
		camera.position.copy(cam.position);
		camera.rotation.copy(cam.rotation);
	}
})();