/**
 * Created with PyCharm.
 * User: Alex
 * Date: 15.02.2015
 * Time: 20:37
 * To change this template use File | Settings | File Templates.
 */

(function () {
	function ModelLoader() {
		this.loader = new THREE.ColladaLoader;
	}

	ModelLoader.prototype.load = function (src, spec, reflectionMap, completeHandler) {
		this.loader.load(src, function (collada) {
			setupModel(collada, src, spec, reflectionMap, completeHandler);
		});
	};

	function setupModel(collada, src, spec, reflectionMap, completeHandler) {
		var dae = collada.scene;
		/*dae.rotation.x = -Math.PI / 2;
		dae.rotation.z = -Math.PI / 2;
		dae.updateMatrix();*/

		var specularTexture = THREE.ImageUtils.loadTexture(spec);
		dae.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.castShadow = true;
				child.receiveShadow = true;

				child.material.metal = true;

				child.material.side = THREE.DoubleSide;

				child.material.envMap = reflectionMap;
				child.material.specularMap = specularTexture;
				child.material.shininess = 1;

				child.material.needsUpdate = true;
				console.log(child);
			}
		});

		completeHandler(src, dae);
	}

	window.ModelLoader = ModelLoader;
})();