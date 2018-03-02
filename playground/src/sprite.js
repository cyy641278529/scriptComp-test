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

  let entity = app.createEntity('sliced-sprite');
  entity.setParent(screen);
  let image = entity.addComp('Image');
  image.setSize(200, 50);
  image.setAnchors(0.2, 0.2, 0.8, 0.8);
  image.type = 'sliced';

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


      app.assets.loadUrls('texture', {
        json: 'E:/github/level-load-test/out/sprites/'+uuid+'.json',
        image: 'E:/github/level-load-test/out/sprites/'+uuid+'.png',
      }, (err, texture) => {
        let sprite = texture.sprites['dark-gray-angle-32x32'];
        sprite.left = 1;
        sprite.top = 1;
        sprite.right = 1;
        sprite.bottom = 1;
        sprite.commit();

        image.sprite = sprite;
      });
    }
  })
})();