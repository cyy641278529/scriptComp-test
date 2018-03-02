(() => {
  const { cc, app, dgui } = window;
  const { resl, path, async } = cc;
  const { quat, vec3 } = cc.math;

  let camEnt = app.createEntity('camera');
  vec3.set(camEnt.lpos, 10, 10, 10);
  camEnt.lookAt(vec3.new(0, 0, 0));
  camEnt.addComp('Camera');

  let screen = app.createEntity('screen');
  screen.addComp('Screen');


  resl({
    manifest: {
      assetInfos: {
        type: 'text',
        parser: JSON.parse,
        src: `E:/github/level-load-test/out/assets.json`
      },

      scene: {
        type: 'text',
        parser: JSON.parse,
        src: `E:/github/level-load-test/out/spec-script-simple.json`
      },
    },

    onDone(data) {
      const assetInfos = data.assetInfos;
      const sceneJson = data.scene;
      
      let info = null;
      let uuid = null;

      for (uuid in assetInfos) {
        info = assetInfos[uuid];
        for (let item in info.urls) {
          info.urls[item] = path.join('E:/github/level-load-test/out', info.urls[item]);
        }

        app.assets.registerAsset(uuid, info);
      }
      
      let spec = app.createEntity('spec-test');
      let spec_comp = spec.addComp('Model');

      app.assets.load(uuid, (err, asset) => {
        if (err) {
          console.error(err);
          return;
        }
        spec_comp.material = asset;

      })

      let meshBox = cc.utils.createMesh(app, cc.primitives.box(1, 1, 1, {
        widthSegments: 1,
        heightSegments: 1,
        lengthSegments: 1,
      }));
      spec_comp.mesh = meshBox;
    }
  })
})();