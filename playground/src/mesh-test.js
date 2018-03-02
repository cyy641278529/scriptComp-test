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
      // let info = assetInfos['b0ccbfd515e88684c849c6211e6763c4'];
      // console.log(info.urls.mesh);
      // info.urls.mesh = path.join('E:/github/level-load-test/out', info.urls.mesh);
      // info.urls.bin = path.join('E:/github/level-load-test/out', info.urls.bin);
      // app.assets.registerAsset('b0ccbfd515e88684c849c6211e6763c4', info);

      if (info.urls.mesh) {
        let spec = app.createEntity('spec-test');
        // vec3.set(spec.lpos,
        //   -5,//randomRange(-20, 20),
        //   5,//randomRange(0, 10),
        //   0//randomRange(0, 20)
        // );
        // quat.fromEuler(spec.lrot,
        //   30,//randomRange(0, 360),
        //   30,//randomRange(0, 360),
        //   30 //randomRange(0, 360)
        // );
        let spec_comp = spec.addComp('Model');
        app.assets.load(uuid, (err, asset) => {
          if (err) {
            console.error(err);
            return;
          }
          spec_comp.mesh = asset;

        })
        let material = new cc.Material();
        material.effect = app.assets.get('builtin-effect-pbr');
        material.setProperty('roughness', 0.5);
        material.setProperty('metallic', 1);
        material.define('USE_SHADOW_MAP', true);
        spec_comp.material = material;
        vec3.set(spec.lpos,
          0,//randomRange(-20, 20),
          0,//randomRange(0, 10),
          0//randomRange(0, 20)
        );
        vec3.set(spec.lscale,
          5,//randomRange(1, 5),
          5,//randomRange(1, 5),
          5//randomRange(1, 5)
        );
      }
    }
  })
})();