// import { AsyncStorage } from 'react-360';
import { ReactInstance, Location, Surface, Module, asset } from 'react-360-web';
import { rotateByQuaternion } from 'react-360-web/js/Utils/Math'

var r360

function init(bundle, parent, options = {}) {
  try {
    // const topMenuSurface = new Surface(300, 300, Surface.SurfaceShape.Flat )
    // Vector pointing out from camera
    const cameraDirection = [0, 0, -1];
    var cameraVerticalDeg = 0;
    var cameraHorizontalDeg = 0;
    const topMenuVertical = 0.5

    r360 = new ReactInstance(bundle, parent, {
      // Add custom options here
      frame: () => {
        // frameNumber++;
        const cameraQuat = r360.getCameraQuaternion();
        cameraDirection[0] = 0;
        cameraDirection[1] = 0;
        cameraDirection[2] = -1;
        // cameraDirection will point out from the view of the camera,
        // we can use it to compute surface angles
        rotateByQuaternion(cameraDirection, cameraQuat);
        const cx = cameraDirection[0];
        const cy = cameraDirection[1];
        const cz = cameraDirection[2];

        const vertAngleRad = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
        const vertAngleDeg = vertAngleRad * 180 / Math.PI;
        const horizontalAngleRad = Math.atan2(cx, -cz);
        const horizontalAngleDeg = horizontalAngleRad * 180 / Math.PI;
        if (cameraVerticalDeg !== vertAngleDeg || cameraHorizontalDeg !== horizontalAngleDeg) {
          // topMenuSurface.setAngle(cx, cy, cz);
          topMenuSurface.setAngle(horizontalAngleRad, topMenuVertical);
          // console.log('cameraVerticalDeg: ', cameraVerticalDeg)
          // console.log('cameraHorizontalDeg: ', cameraHorizontalDeg)
        }
        cameraVerticalDeg = vertAngleDeg;
        cameraHorizontalDeg = horizontalAngleDeg;
        // You can either just read the cameraVerticalDeg, cameraHorizontalDeg
        // angles directly from other classes, or if you are waiting for a 
        // particular condition to trigger an action you can 
        // Broadcast the camera positions to any listeners
        // if (someConditionisTrue) {
        //   r360.runtime.context.callFunction('RCTDeviceEventEmitter', 'emit', [
        //     'cameraPositionUpdate',
        //     vertAngleDeg,
        //     horizontalAngleDeg,
        //     0,
        //   ]);
        // }
      },
      fullScreen: true,
      // Register custom modules at init time
      nativeModules: [
        // new surfaceModule(),
        new spotModule(),
        ctx => new screenModule(ctx),
      ],
      // provide the custom asset root
      // assetRoot: 'https://mycdn.example.net/myapp/',
      ...options,
    });
      
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
      r360.createRoot('Ways'),
      new Location()
      // new Location(
      //   [0, -50, -200], [0.5,0,0,0]
      //   // [0, 0, 0], [0,0,0,1]
      //   // 1 = 180 градусов
      //   //, [-Math.PI / 4, 1, 0, 0.5]
      //   ),
    );

    const topMenuSurface = new Surface(300, 100, Surface.SurfaceShape.Flat)
    topMenuSurface.setAngle(0, topMenuVertical, 0)
    r360.renderToSurface(
      r360.createRoot('TopMenu'),
      topMenuSurface
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
  catch (e) {
    console.log('init errors catch: ', e)
  }
}

var surface = new Map()

class spotModule extends Module {
  constructor() {
    super('spotModule'); // Makes this module available at NativeModules.MyModule
  }
  // This methods will be exposed to the React app
  add(name, location) {
    const { x, y } = location
    const surf = new Surface(300, 120, Surface.SurfaceShape.Flat);
    surf.setAngle(x || 0, y || 0, 0); // Math.PI/2 - потолок
  // surf.resize(650, 200)
    // console.log('surf ', surf)
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

const screenSurface = new Surface(300, 300, Surface.SurfaceShape.Flat)
screenSurface.setAngle(0, 0, 0);
let screen

class screenModule extends Module {
  constructor(ctx) {
    super('screenModule'); // Makes this module available at NativeModules.MyModule
    this._ctx = ctx;
  }
  // This methods will be exposed to the React app
  show() {
    screen = r360.renderToSurface(
      r360.createRoot('Screen'),
      screenSurface,
      'Screen'
    );
  }
  hide() {
    r360.detachRoot(screen)
  }
  transform(size, location) {
    const { x, y } = location
    const { width, height } = size
    // tooltipSurface.setRadius(3);
    // tooltipSurface.setDensity(3000);
    screenSurface.setAngle(x, y);
    screenSurface.resize(width, height);
  }
  getScreenSize() {
    // window.screen.width * window.devicePixelRatio
    // window.screen.height * window.devicePixelRatio
    // if (navigator.userAgent.match('add your match criteria here')) {
    //   let swidth = screen.width
    //   let sheight = screen.height
    //   surfaceName.resize(swidth, sheight);
    //   this._ctx.invokeCallback(
    //     id,
    //     [swidth, sheight]
    //   );
    // }
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