import * as THREE from '../assets/vendor/three.module.js';
import { RoomEnvironment } from '../assets/vendor/RoomEnvironment.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const forced = new URLSearchParams(location.search).has('render');
const scenes = new Map();
window.__lumaScenes = scenes;

function panel(w, h, d, material, bevel = .045) {
  const shape = new THREE.Shape();
  shape.moveTo(-w/2,-h/2); shape.lineTo(w/2,-h/2); shape.lineTo(w/2,h/2); shape.lineTo(-w/2,h/2); shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:3,steps:1});
  geo.translate(0,0,-d/2);
  const mesh = new THREE.Mesh(geo,material); mesh.castShadow=true; mesh.receiveShadow=true; return mesh;
}

function makeObject(kind, mats) {
  const group = new THREE.Group();
  const add=(mesh,x,y,z,rx=0,ry=0,rz=0)=>{mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);group.add(mesh);return mesh;};
  const {ivory,navy,blue,edge}=mats;
  if(kind==='about'){
    const shape=new THREE.Shape();shape.moveTo(-1.45,-1.45);shape.lineTo(1.45,-1.45);shape.lineTo(1.45,.4);shape.absarc(0,.4,1.45,0,Math.PI,false);shape.lineTo(-1.45,-1.45);
    const hole=new THREE.Path();[[-.69,-.8],[-.69,.67],[-.19,1.17],[-.19,-.3],[.9,-.3],[.4,-.8]].forEach(([x,y],i)=>i?hole.lineTo(x,y):hole.moveTo(x,y));hole.closePath();shape.holes.push(hole);
    const portal=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.5,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:5}),[ivory,navy]);add(portal,0,0,-.25);
    add(panel(3.25,.14,1.25,blue),0,-1.58,0);
    group.scale.setScalar(.83);
  } else if(kind==='home') {
    const facet=(points)=>{const shape=new THREE.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();const geometry=new THREE.ExtrudeGeometry(shape,{depth:.28,bevelEnabled:true,bevelSize:.045,bevelThickness:.045,bevelSegments:6});geometry.translate(0,-.25,-.14);return new THREE.Mesh(geometry,[ivory,blue]);};
    const upright=add(facet([[-1.05,-1],[-1.05,1.02],[-.42,1.65],[-.42,-.37]]),0,.08,0);upright.userData.fold='upright';
    const foot=add(facet([[-1.03,-1.02],[-.4,-.39],[1.12,-.39],[.48,-1.02]]),0,.08,0);foot.userData.fold='foot';
    add(panel(.5,1.8,.09,navy),-.66,.18,-.24,0,.12,0);
  } else if(kind==='journey') {
    const points=[];
    for(let i=0;i<5;i++){
      const x=(i-2)*1.38,z=Math.abs(i-2)*.22,y=Math.abs(i-2)*.1;
      const station=new THREE.Group();station.position.set(x,y,z);station.userData.route=i;group.add(station);
      const card=panel(.87,1.25,.09,i===0?navy:ivory,.035);card.position.y=.1;card.rotation.y=(i-2)*-.08;station.add(card);
      for(let j=0;j<3;j++){const line=panel(j===0?.32:.57,.018,.008,i===0?blue:navy,.003);line.position.set(j===0?-.14:0,.42-j*.19,.095);card.add(line);}
      const base=panel(1.03,.09,.7,i===4?navy:blue,.035);base.position.set(0,-.65,0);station.add(base);points.push(new THREE.Vector3(x,-.73+y,z));
    }
    const route=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),64,.014,6,false),blue);route.userData.routePath=true;group.add(route);
  } else if(kind==='registration'||kind==='contact') {
    const count=3;
    for(let i=0;i<count;i++) {
      const p=add(panel(1.78,2.25,.065,i===0?navy:ivory), (i-(count-1)/2)*.29, (i-(count-1)/2)*.09, i*.15, -.14, -.14+i*.07, -.17+i*.08);
      p.userData.layer=i;
      const binding=panel(.025,2.02,.012,i===0?blue:navy,.004);binding.position.set(-.77,0,.085);p.add(binding);
      if(kind==='contact'){p.position.x=(i-1)*.4;p.position.z=i*.5-.25;p.rotation.y=(i-1)*.35;p.rotation.z=(i-1)*.06;}
      if(i===count-1){
        for(let j=0;j<4;j++) {const line=panel(j===0?.6:1.05,.025,.006,j===0?navy:blue,.002);line.position.set(j===0?-.27:0,.65-j*.25,.1);p.add(line);}
        const seal=new THREE.Shape();[[-.12,-.13],[-.12,.11],[-.04,.19],[-.04,-.05],[.16,-.05],[.08,-.13]].forEach(([x,y],j)=>j?seal.lineTo(x,y):seal.moveTo(x,y));seal.closePath();const mark=new THREE.Mesh(new THREE.ExtrudeGeometry(seal,{depth:.007,bevelEnabled:true,bevelSize:.003,bevelThickness:.003,bevelSegments:2}),navy);mark.position.set(.51,-.66,.095);p.add(mark);
      }
    }
    if(kind==='contact'){group.rotation.z=-.08;group.rotation.y=-.3;}
  } else if(kind==='compliance') {
    const outer=new THREE.Mesh(new THREE.TorusGeometry(1.25,.12,12,96),ivory); outer.castShadow=true;group.add(outer);
    const inner=new THREE.Mesh(new THREE.TorusGeometry(.93,.018,8,80),edge);group.add(inner);
    for(let i=0;i<12;i++){const a=i*Math.PI/6;add(panel(.055,i%3===0?.18:.1,.045,ivory,.01),Math.sin(a)*1.06,Math.cos(a)*1.06,.025,0,0,-a);}
    const hand=add(panel(.065,.85,.07,ivory),.2,.3,.08,0,0,-.6);hand.userData.hand=true;
    add(new THREE.Mesh(new THREE.SphereGeometry(.085,20,12),edge),0,0,.15);
    add(panel(.8,.68,.11,blue),.78,-.65,.3,0,0,-.05);
    for(let row=0;row<2;row++)for(let i=0;i<3;i++)add(panel(.065,.055,.025,navy,.008),.55+i*.21,-.57-row*.18,.415);
  } else if(kind==='pricing') {
    [navy,blue,ivory].forEach((m,i)=>add(panel(2.5,.19,1.6,m),0,-.65+i*.62,0,.06,0,0));
    group.rotation.y=-.12;
  } else if(kind==='resources') {
    for(let i=0;i<5;i++){const book=add(panel(.36,2.1-i*.08,1.3,i===2?blue:i%2?ivory:navy),-.9+i*.45,.03,0,0,0,i===4?-.13:0);for(let j=0;j<3;j++){const rule=panel(.18,.012,.008,i%2||i===2?navy:ivory,.002);rule.position.set(0,.57-j*.13,.71);book.add(rule);}const band=panel(.25,.025,.008,edge,.003);band.position.set(0,-.5,.71);book.add(band);}
  } else {
    [navy,blue,ivory].forEach((m,i)=>{const p=add(panel(2,1.65,.12,m),-.25+i*.26,-.1+i*.2,-.15+i*.2,0,0,-.14+i*.12);p.userData.layer=i;if(i===2){const curve=new THREE.CatmullRomCurve3([[-.28,.35,.14],[-.22,.56,.14],[.05,.63,.14],[.29,.47,.14],[.25,.25,.14],[.03,.1,.14],[0,-.12,.14]].map(v=>new THREE.Vector3(...v)));p.add(new THREE.Mesh(new THREE.TubeGeometry(curve,40,.035,8,false),navy));const dot=new THREE.Mesh(new THREE.SphereGeometry(.05,12,8),navy);dot.position.set(0,-.37,.14);p.add(dot);}});
  }
  return group;
}

async function setup(el) {
  const kind=el.dataset.scene;
  if(!forced&&(reduce.matches||navigator.connection?.saveData))return;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:forced});}catch{el.dataset.fallback='webgl';return;}
  const canvas=renderer.domElement;canvas.style.removeProperty('display');canvas.setAttribute('aria-hidden','true');canvas.tabIndex=-1;el.append(canvas);
  const mobile=innerWidth<700;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
  renderer.shadowMap.enabled=false;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,50);camera.position.set(3,2.3,7.1);camera.lookAt(0,.05,0);
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  const ivory=new THREE.MeshPhysicalMaterial({color:'#e9e7df',roughness:.23,metalness:.16,clearcoat:.4});
  const navy=new THREE.MeshStandardMaterial({color:'#073361',roughness:.23,metalness:.35});
  const blue=new THREE.MeshStandardMaterial({color:'#9fb8ce',roughness:.32,metalness:.3});
  const edge=new THREE.MeshStandardMaterial({color:'#c5b68d',roughness:.23,metalness:.7});
  const materials={ivory,navy,blue,edge};
  const object=makeObject(kind,materials);object.rotation.set(-.08,-.28,.07);scene.add(object);
  let editorialTexture;
  if(kind==='about'){
    try{editorialTexture=await new THREE.TextureLoader().loadAsync(new URL('assets/images/hero-entrepreneur-poster.webp',document.baseURI).href);editorialTexture.colorSpace=THREE.SRGBColorSpace;editorialTexture.repeat.set(.4,1);editorialTexture.offset.set(.6,0);const aperture=new THREE.Shape();[[-.69,-.8],[-.69,.67],[-.19,1.17],[-.19,-.3],[.9,-.3],[.4,-.8]].forEach(([x,y],i)=>i?aperture.lineTo(x,y):aperture.moveTo(x,y));aperture.closePath();const imageGeometry=new THREE.ShapeGeometry(aperture);const pos=imageGeometry.getAttribute('position'),uv=imageGeometry.getAttribute('uv');for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+.69)/1.59,(pos.getY(i)+.8)/1.97);const image=new THREE.Mesh(imageGeometry,new THREE.MeshBasicMaterial({map:editorialTexture,toneMapped:false}));image.position.z=.265;object.add(image);}catch{/* The sculptural portal remains usable if its editorial texture is unavailable. */}
  }
  let storyMode=false,storyProgress=0,targetStory=0;
  const storyLeft=kind==='home'?makeObject('registration',materials):null;
  const storyRight=kind==='home'?makeObject('compliance',{...materials,ivory:navy,navy:ivory}):null;
  if(storyLeft){scene.add(storyLeft,storyRight);storyLeft.visible=storyRight.visible=false;}
  const base={x:object.rotation.x,y:object.rotation.y,z:object.rotation.z};
  scene.add(new THREE.HemisphereLight(0xffffff,0x23364f,.85));
  const light=new THREE.DirectionalLight(0xffffff,2.8);light.position.set(-3,6,4);scene.add(light);
  const rim=new THREE.DirectionalLight(0xb4d4ff,2);rim.position.set(4,1,-2);scene.add(rim);
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;const ctx=shadowCanvas.getContext('2d');const gradient=ctx.createRadialGradient(64,64,4,64,64,64);gradient.addColorStop(0,'rgba(0,0,0,.32)');gradient.addColorStop(.5,'rgba(0,0,0,.12)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const shadowTexture=new THREE.CanvasTexture(shadowCanvas);const floor=new THREE.Mesh(new THREE.PlaneGeometry(5.8,4.2),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false,opacity:.7}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.55;scene.add(floor);
  let width=0,height=0,frame=0,visible=true,paused=false,disposed=false,interactionUntil=0,arrivalUntil=0;
  const pointer={x:0,y:0};let progress=0,targetProgress=0;
  const render=()=>renderer.render(scene,camera);
  const size=()=>{width=el.clientWidth;height=el.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=camera.aspect<.85?8.8:7.1;if(kind==='journey'){const wide=camera.aspect>2;camera.position.set(wide?1.2:.7,wide?2.5:1.9,wide?6.7:6.1);object.scale.setScalar(wide?1.5:1);object.children.forEach(child=>{if(child.userData.route!==undefined){const i=child.userData.route;child.position.x=(i-2)*(wide?1.38:.61);child.position.z=Math.abs(i-2)*(wide?.22:.4);child.rotation.y=wide?0:(i-2)*-.18;}if(child.userData.routePath)child.visible=wide;});camera.lookAt(0,0,0);}camera.updateProjectionMatrix();render();};
  const resize=new ResizeObserver(size);resize.observe(el);size();
  function applyStory(){
    const p=storyMode?storyProgress:0;
    const reveal=THREE.MathUtils.smoothstep(p,.25,.8);
    const remaining=1-THREE.MathUtils.smoothstep(p,0,.7);
    object.visible=remaining>.001;object.scale.setScalar(Math.max(.001,remaining));object.position.set(-p*.3,p*.2,-p*.5);
    object.children.forEach(child=>{if(child.userData.fold==='foot')child.rotation.x=-Math.sin(p*Math.PI)*1.1;if(child.userData.fold==='upright')child.rotation.y=Math.sin(p*Math.PI)*.55;});
    if(storyLeft){
      storyLeft.visible=storyRight.visible=reveal>.001;
      storyLeft.scale.setScalar(reveal*.83);storyRight.scale.setScalar(reveal*.9);
      storyLeft.position.set(-1.6*reveal,-.25+(1-reveal)*.4,0);storyRight.position.set(1.6*reveal,.12,0);
      storyLeft.rotation.set(-.08,-.38,-.14+(1-reveal)*.4);storyRight.rotation.set(-.08,-.25,.08-(1-reveal)*.3);
    }
    camera.position.x=3-p*2;camera.position.y=2.3-p*.7;camera.position.z=(camera.aspect<.85?8.8:7.1)+p*2.7;camera.lookAt(0,.05,0);camera.updateProjectionMatrix();
  }
  const tick=(now)=>{
    frame=0;if(disposed||!visible||document.hidden||paused||reduce.matches)return;
    progress+=(targetProgress-progress)*.09;
    storyProgress+=(targetStory-storyProgress)*.09;
    const targetY=base.y+pointer.x*.19+progress*.28;
    const targetX=base.x+pointer.y*.11;
    object.rotation.y+=(targetY-object.rotation.y)*.065;object.rotation.x+=(targetX-object.rotation.x)*.065;
    object.children.forEach((child)=>{if(child.userData.layer!==undefined){const i=child.userData.layer;child.position.x+=(child.userData.homeX+(i-1)*progress*.32-child.position.x)*.09;}});
    if(kind==='journey')object.children.forEach(child=>{if(child.userData.route!==undefined){const active=child.userData.route===Math.round(progress*4);child.position.y+=(child.userData.homeY+(active?.18:0)-child.position.y)*.1;}});
    if(kind==='home')applyStory();
    render();
    if(now<interactionUntil||now<arrivalUntil||Math.abs(targetProgress-progress)>.001||Math.abs(targetStory-storyProgress)>.001)frame=requestAnimationFrame(tick);
  };
  const wake=()=>{if(!frame&&!disposed&&visible&&!document.hidden&&!paused&&!reduce.matches)frame=requestAnimationFrame(tick);};
  object.children.forEach(child=>{child.userData.homeX=child.position.x;child.userData.homeY=child.position.y;});
  const move=(event)=>{if(!fine.matches)return;const rect=el.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width-.5;pointer.y=(event.clientY-rect.top)/rect.height-.5;interactionUntil=performance.now()+1400;wake();};
  const leave=()=>{pointer.x=0;pointer.y=0;interactionUntil=performance.now()+1400;wake();};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
  const onVisibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener('visibilitychange',onVisibility);
  const observe=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});observe.observe(el);
  const onPreference=()=>{if(reduce.matches){cancelAnimationFrame(frame);frame=0;canvas.style.opacity='0';}else{canvas.style.opacity='';render();wake();}};reduce.addEventListener('change',onPreference);
  canvas.addEventListener('webglcontextlost',(event)=>{event.preventDefault();el.classList.remove('scene-ready');paused=true;cancelAnimationFrame(frame);});
  el.classList.add('scene-ready');el.dataset.ready='true';
  const state={element:el,renderer,scene,camera,object,render,kind,setProgress(value){targetProgress=value;interactionUntil=performance.now()+600;wake();},setStoryProgress(value,immediate=false){storyMode=true;targetStory=value;if(immediate){storyProgress=value;applyStory();render();}else{interactionUntil=performance.now()+800;wake();}},setMode(mode){storyMode=mode==='story';if(!storyMode){targetStory=storyProgress=0;applyStory();render();}wake();},pause(value){paused=value;if(value){cancelAnimationFrame(frame);frame=0;}else wake();},reset(){object.rotation.set(base.x,base.y,base.z);pointer.x=pointer.y=0;targetProgress=progress=0;targetStory=storyProgress=0;object.children.forEach(child=>child.position.x=child.userData.homeX);if(kind==='home')applyStory();render();},dispose(){disposed=true;cancelAnimationFrame(frame);resize.disconnect();observe.disconnect();document.removeEventListener('visibilitychange',onVisibility);reduce.removeEventListener('change',onPreference);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);scene.traverse(node=>{node.geometry?.dispose();if(Array.isArray(node.material))node.material.forEach(m=>m.dispose());else node.material?.dispose();});editorialTexture?.dispose();environment.dispose();shadowTexture.dispose();renderer.dispose();}};
  scenes.set(kind,state);
  window.dispatchEvent(new CustomEvent('luma:scene-ready',{detail:kind}));
  if(!forced){arrivalUntil=performance.now()+1100;object.rotation.y=base.y-.1;wake();}
  el.closest('.scene-shell')?.querySelector('[data-scene-toggle]')?.addEventListener('click',event=>{state.pause(!paused);event.currentTarget.textContent=paused?'Enable interaction':'Pause interaction';event.currentTarget.setAttribute('aria-pressed',String(paused));});
}

document.querySelectorAll('[data-scene]').forEach(el=>setup(el).catch(()=>{el.dataset.fallback='error';}));
window.addEventListener('pagehide',event=>{if(!event.persisted){scenes.forEach(s=>s.dispose());scenes.clear();}});
window.addEventListener('pageshow',event=>{if(event.persisted)scenes.forEach(s=>s.render());});
