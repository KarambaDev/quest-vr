// import { AsyncStorage } from 'react-360';
import { ReactInstance, Location, Surface, Module, asset } from 'react-360-web';

var surface = new Map()
var r360
function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    // Register custom modules at init time
    nativeModules: [
      // new surfaceModule(),
      new spotModule(),
    ],
    // provide the custom asset root
    // assetRoot: 'https://mycdn.example.net/myapp/',
    ...options,
  });
  // surf['InfoPoint1'] = r360.getDefaultSurface();
  // surf['InfoPoint1'] = new Surface(300, 300, Surface.SurfaceShape.Flat);
  // surf['InfoPoint1'].setAngle(0, 0); // Math.PI/2 - потолок
  // surf.resize(650, 200)
  // r360.renderToSurface(
  //   r360.createRoot('InfoPoint', {}),
  //   surf['InfoPoint1']
  //   );
    
  r360.compositor.setBackground('./static_assets/bank_scene0_state0.jpg');

  // AsyncStorage.setItem('my-storage-key', 'I like to save it.');
  // AsyncStorage.getItem('my-storage-key').then(value => console.log(value))

  // Create three roots: two flat panels on the left and the right, and a Location
  // to mount rendered models in 3D space
  // const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // leftPanel.setAngle(-0.6, 0);
  // const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  // rightPanel.setAngle(0.6, 0.7);
  // r360.renderToSurface(
  //   r360.createRoot('TopPosts'),
  //   leftPanel,
  // );
  // r360.renderToSurface(
  //   r360.createRoot('CurrentPost'),
  //   rightPanel,
  // );
  // r360.renderToLocation(
  //   r360.createRoot('ModelView'),
  //   new Location([0, -2, -10]),
  // );
  // const s = r360.getDefaultSurface();
  // s.setShape(Surface.SurfaceShape.Flat);
  // s.resize(1000, 1000);
  // r360.renderToSurface(
  //   r360.createRoot('SlideshowSample', {
  //     photos: [
  //       { uri: './static_assets/bank.jpg', title: '360 World', format: '2D' },
  //       // Add your own 180 / 360 photos to this array,
  //       // with an associated title and format
  //     ],
  //   }),
  //   s,
  //   // r360.getDefaultSurface()
  // );

  // loc3d = new Location([0, 0, -400])
  r360.renderToLocation(
    r360.createRoot('Way'),
    new Location()
    // new Location(
    //   [0, -50, -200], [0.5,0,0,0]
    //   // [0, 0, 0], [0,0,0,1]
    //   // 1 = 180 градусов
    //   //, [-Math.PI / 4, 1, 0, 0.5]
    //   ),
  );
  // r360.renderToLocation(
  //   r360.createRoot('Way2'),
  //   new Location()
  // );
  // let angle = 0
  // setInterval(loc3d => {
  //   angle += 5
  //   // console.log(angle)
  //   loc3d.setWorldRotation(angle/100,0,0,0)
  //   if (angle == 100) { angle=0}
  // }, 500, loc3d)
}

class spotModule extends Module {
  constructor() {
    super('spotModule'); // Makes this module available at NativeModules.MyModule
  }
  // This methods will be exposed to the React app
  add(name, location) {
    const { x, y } = location
    const surf = new Surface(300, 100, Surface.SurfaceShape.Flat);
    surf.setAngle(x || 0, y || 0); // Math.PI/2 - потолок
  // surf.resize(650, 200)
    const tag = r360.renderToSurface(
      r360.createRoot(name, {}),
      surf
      )
    surface.set(name, {tag, surf})
  }
  delete(name) {
    const value = surface.get(name)
    r360.detachRoot(value.tag)
    surface.delete(name)
  }

}

// class surfaceModule extends Module {
//   constructor() {
//     super('surfaceModule'); // Makes this module available at NativeModules.MyModule
//   }
//   // This methods will be exposed to the React app
//   resizeSurf(name, width, height) {
//     console.log('!!!!!!!!!!!1!!!!!!!!')
//     surf[name].resize(width, height)
//   }
//   changeSurf(name, Type) {
//     Type === "Flat" ?
//       surf[name].setShape(Surface.SurfaceShape.Flat) : surf[name].setShape(Surface.SurfaceShape.Cylinder);
//   }
//   create(name, location) {
//     const { x, y } = location
//     surf[name] = new Surface(300, 100, Surface.SurfaceShape.Flat);
//     surf[name].setAngle(x || 0, y || 0); // Math.PI/2 - потолок
//   // surf.resize(650, 200)
//     console.log('r360 ',r360.renderToSurface(
//       r360.createRoot(name, {}),
//       surf[name]
//       )
//       )
//   }
// }

window.React360 = { init };