/* Three.js 3D Skill Universe — lazy-loaded on first openNet3d() call */
function init3DScene(){
'use strict';
const NODES=[
  {id:0, label:'BATOUL\nDIAB',       r:0.72,x:0.0,  y:0.0,  z:0.0,  color:'#00d4aa',hub:true, cat:'Hub / Core',      tip:'AI/ML Data Engineering Scientist · Beirut, Lebanon'},
  {id:1, label:'Python',             r:0.50,x:-1.5, y:0.5,  z:-1.0, color:'#00d4aa',          cat:'Hub / Core',      tip:'Primary language: ML pipelines, REST APIs, data engineering, backend.'},
  {id:2, label:'TensorFlow',         r:0.46,x:-2.5, y:1.5,  z:-0.5, color:'#86efac',          cat:'ML Frameworks',   tip:'Deep learning framework — brain age & bioinformatics models.'},
  {id:3, label:'PyTorch',            r:0.43,x:-2.5, y:2.0,  z:0.5,  color:'#86efac',          cat:'ML Frameworks',   tip:'Custom neural network architectures and research experimentation.'},
  {id:4, label:'scikit-learn',       r:0.46,x:-2.0, y:-0.5, z:-1.5, color:'#86efac',          cat:'ML Frameworks',   tip:'Classical ML: regression, classification, clustering, evaluation.'},
  {id:5, label:'GNN / GCN',          r:0.44,x:-2.5, y:2.5,  z:1.0,  color:'#86efac',          cat:'ML Frameworks',   tip:'Graph Neural Networks + GCNs — brain age (fMRI) & UN labour forecasting.'},
  {id:6, label:'Keras',              r:0.38,x:-2.0, y:1.5,  z:-1.5, color:'#86efac',          cat:'ML Frameworks',   tip:'High-level neural network API — rapid model prototyping.'},
  {id:7, label:'NLP',                r:0.50,x:1.5,  y:2.5,  z:0.5,  color:'#38bdf8',          cat:'NLP / AI Layer',  tip:'Natural Language Processing — classification, skills extraction, sentiment analysis.'},
  {id:8, label:'LLMs',               r:0.47,x:2.5,  y:3.0,  z:1.0,  color:'#38bdf8',          cat:'NLP / AI Layer',  tip:'Large Language Models — core of UN pipelines and chatbot.'},
  {id:9, label:'LangChain',          r:0.43,x:2.5,  y:2.0,  z:2.0,  color:'#7dd3fc',          cat:'NLP / AI Layer',  tip:'LLM orchestration framework — production RAG chatbot architecture.'},
  {id:10,label:'RAG',                r:0.44,x:3.0,  y:1.5,  z:2.5,  color:'#38bdf8',          cat:'NLP / AI Layer',  tip:'Retrieval-Augmented Generation — Next.js + LangChain + OpenAI production chatbot.'},
  {id:11,label:'HuggingFace',        r:0.44,x:2.0,  y:2.5,  z:2.0,  color:'#7dd3fc',          cat:'NLP / AI Layer',  tip:'Pre-trained transformer models — fine-tuning & embeddings.'},
  {id:13,label:'GPT/Gemini\n/Fanar', r:0.56,x:3.5,  y:3.0,  z:3.0,  color:'#7dd3fc',          cat:'NLP / AI Layer',  tip:'GPT (OpenAI) production RAG; Gemini + Fanar (Arabic LLM) — multilingual NLP at UN ESCWA.'},
  {id:20,label:'Data\nEng',          r:0.47,x:-2.0, y:1.0,  z:-2.0, color:'#ffc93c',          cat:'Data Engineering',tip:'100s of TB fragmented human capital data — cleaned, structured, mart-ready.'},
  {id:21,label:'Polars/\nPandas',    r:0.46,x:-3.0, y:0.0,  z:-2.0, color:'#fde68a',          cat:'Data Engineering',tip:'High-performance Python dataframe libraries for large-scale pipelines.'},
  {id:22,label:'SQL/\nMongoDB',      r:0.46,x:-3.0, y:-0.5, z:-1.5, color:'#fde68a',          cat:'Data Engineering',tip:'Relational (SQL/MySQL/SQLite) and NoSQL (MongoDB) data modelling.'},
  {id:14,label:'MLOps',              r:0.46,x:1.0,  y:-2.0, z:0.0,  color:'#a78bfa',          cat:'MLOps / Infra',   tip:'End-to-end production ML pipeline management.'},
  {id:15,label:'MLflow',             r:0.38,x:0.5,  y:-2.5, z:-0.5, color:'#c4b5fd',          cat:'MLOps / Infra',   tip:'Experiment tracking, model versioning, deployment lifecycle.'},
  {id:16,label:'AWS',                r:0.43,x:2.0,  y:-2.5, z:1.0,  color:'#a78bfa',          cat:'MLOps / Infra',   tip:'Amazon Web Services: EC2, S3, ECR, IAM — cloud-native ML deployment.'},
  {id:17,label:'CI / CD',            r:0.38,x:1.5,  y:-3.0, z:0.5,  color:'#c4b5fd',          cat:'MLOps / Infra',   tip:'Continuous Integration/Deployment via GitHub Actions.'},
  {id:18,label:'DVC',                r:0.34,x:1.5,  y:-2.0, z:2.0,  color:'#c4b5fd',          cat:'MLOps / Infra',   tip:'Data Version Control — tracks datasets & models like Git.'},
  {id:19,label:'FastAPI/\nFlask',    r:0.44,x:2.5,  y:-1.5, z:1.5,  color:'#c4b5fd',          cat:'MLOps / Infra',   tip:'Python REST API frameworks for serving ML models in production.'},
  {id:23,label:'GIS/GEE',            r:0.40,x:0.0,  y:2.5,  z:2.0,  color:'#fb923c',          cat:'Application Layer',tip:'Google Earth Engine — geospatial ETL, city-scale dashboards for UN ESCWA.'},
  {id:24,label:'React/\nNext.js',    r:0.46,x:3.5,  y:-0.5, z:2.0,  color:'#ff5f6d',          cat:'Application Layer',tip:'ReactJS dashboards + Next.js RAG chatbot frontend.'},
  {id:25,label:'TypeScript',         r:0.42,x:4.0,  y:-1.0, z:2.5,  color:'#fca5a5',          cat:'Application Layer',tip:'Strongly-typed JS — GOVA Group backend services.'},
];
const LINKS=[[0,1],[0,7],[0,14],[0,20],[0,23],[0,10],[1,2],[1,3],[1,4],[1,5],[1,6],[1,20],[1,14],[7,8],[7,9],[7,10],[7,23],[8,9],[8,10],[8,13],[9,10],[10,11],[10,13],[14,15],[14,16],[14,17],[14,18],[16,17],[16,19],[17,19],[20,21],[20,22],[20,7],[20,5],[24,25],[24,16],[24,19],[25,13],[23,20],[23,7],[5,3]];
const BRIDGES=[[20,7],[5,8],[1,10],[14,16],[23,20]];
const BRIDGE_SET=new Set(BRIDGES.map(([a,b])=>`${Math.min(a,b)}-${Math.max(a,b)}`));
const HUB_IDS=new Set([0,1,7,8,20,14]);

// Position-based colours
function hslToHex(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return l-a*Math.max(Math.min(k-3,9-k,1),-1)},hex=x=>Math.round(x*255).toString(16).padStart(2,'0');return`#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;}
(function(){const yMin=-3,yMax=3;NODES.forEach(n=>{const hue=((Math.atan2(n.z,n.x)*180/Math.PI)+360)%360,hueS=(hue+(n.y*12)+360)%360,normY=(n.y-yMin)/(yMax-yMin),lig=44+normY*30,dist=Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z),sat=72+Math.min(dist/5,1)*20;n.color=n.id===0?'#ffffff':hslToHex(hueS,sat,lig);});})();

const cvs=document.getElementById('threeCanvas');
const wrap=cvs.parentElement;
const renderer=new THREE.WebGLRenderer({canvas:cvs,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setClearColor(0x000000,0);
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x04080f,0.032);
const camera=new THREE.PerspectiveCamera(48,1,0.1,200);
camera.position.set(7.5,5,9.5);
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=0.06;controls.minDistance=3;controls.maxDistance=32;controls.autoRotate=true;controls.autoRotateSpeed=1.2;
scene.add(new THREE.AmbientLight(0x182040,1.5));
const dL1=new THREE.DirectionalLight(0x00d4aa,0.9);dL1.position.set(6,10,6);scene.add(dL1);
const dL2=new THREE.DirectionalLight(0xffc93c,0.45);dL2.position.set(-6,4,-6);scene.add(dL2);
const pLight=new THREE.PointLight(0x38bdf8,0.7,22);pLight.position.set(3,3,3);scene.add(pLight);
const grid=new THREE.GridHelper(16,16,0x1a2d4a,0x0d1f35);grid.position.y=-4.2;scene.add(grid);

function hexToRgb(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function makeOrbBloom(hexColor,opacity){const sz=256,c=document.createElement('canvas');c.width=c.height=sz;const ctx=c.getContext('2d'),half=sz/2,[r,g,b]=hexToRgb(hexColor),gr=ctx.createRadialGradient(half,half,0,half,half,half);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(0.04,`rgba(255,255,255,${Math.min(opacity*1.8,1).toFixed(3)})`);gr.addColorStop(0.12,`rgba(${r},${g},${b},${Math.min(opacity*1.4,1).toFixed(3)})`);gr.addColorStop(0.35,`rgba(${r},${g},${b},${(opacity*0.7).toFixed(3)})`);gr.addColorStop(0.65,`rgba(${r},${g},${b},${(opacity*0.25).toFixed(3)})`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);ctx.fillStyle=gr;ctx.fillRect(0,0,sz,sz);const tex=new THREE.CanvasTexture(c);return new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));}
function makeOrbAura(hexColor,opacity){const sz=256,c=document.createElement('canvas');c.width=c.height=sz;const ctx=c.getContext('2d'),half=sz/2,[r,g,b]=hexToRgb(hexColor),gr=ctx.createRadialGradient(half,half,0,half,half,half);gr.addColorStop(0,`rgba(${r},${g},${b},${opacity.toFixed(3)})`);gr.addColorStop(0.25,`rgba(${r},${g},${b},${(opacity*0.65).toFixed(3)})`);gr.addColorStop(0.55,`rgba(${r},${g},${b},${(opacity*0.22).toFixed(3)})`);gr.addColorStop(0.80,`rgba(${r},${g},${b},${(opacity*0.06).toFixed(3)})`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);ctx.fillStyle=gr;ctx.fillRect(0,0,sz,sz);const tex=new THREE.CanvasTexture(c);return new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));}
function makeLabel(text,color){const lines=text.split('\n'),maxLen=Math.max(...lines.map(l=>l.length)),W=Math.max(128,maxLen*13+24),H=lines.length*20+12,c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d');ctx.font=`600 ${lines.length>1?11:12}px "Exo 2",sans-serif`;ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';lines.forEach((ln,i)=>ctx.fillText(ln,W/2,H/2+(i-(lines.length-1)/2)*18));const tex=new THREE.CanvasTexture(c);const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,opacity:0.85,depthWrite:false}));spr.scale.set((W/H)*0.48,0.48,1);return spr;}

const nodeMap={};NODES.forEach(n=>nodeMap[n.id]=n);
const meshObjects=[];
NODES.forEach(n=>{
  const col=new THREE.Color(n.color),s=n.r,sr=n.id===0?s*0.55:0.22;
  const geo=new THREE.SphereGeometry(sr,28,18);
  const mat=new THREE.MeshPhongMaterial({color:col,emissive:col,emissiveIntensity:HUB_IDS.has(n.id)?0.35:0.18,shininess:90,transparent:true,opacity:0.90,specular:new THREE.Color(0x334455)});
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(n.x,n.y,n.z);mesh.userData={node:n,baseEI:HUB_IDS.has(n.id)?0.35:0.12};
  scene.add(mesh);meshObjects.push(mesh);n._mesh=mesh;
  const isCenter=n.id===0,isHub=HUB_IDS.has(n.id);
  const bSz=isCenter?3.2:(isHub?1.4:0.95),bOp=isCenter?0.90:(isHub?0.60:0.42);
  const bloom=makeOrbBloom(n.color,bOp);bloom.scale.setScalar(bSz);bloom.position.set(n.x,n.y,n.z);scene.add(bloom);n._glow=bloom;n._glowBase=bSz;
  const aSz=isCenter?8.5:(isHub?3.6:2.4),aOp=isCenter?0.38:(isHub?0.22:0.14);
  const aura=makeOrbAura(n.color,aOp);aura.scale.setScalar(aSz);aura.position.set(n.x,n.y,n.z);scene.add(aura);n._aura=aura;n._auraBase=aSz;
  if(n.id===0){const wG=new THREE.TorusGeometry(s*1.6,0.025,8,40),wM=new THREE.MeshBasicMaterial({color:0x00d4aa,transparent:true,opacity:0.3}),tor=new THREE.Mesh(wG,wM);tor.rotation.x=Math.PI/2;mesh.add(tor);n._torus=tor;}
  const lbl=makeLabel(n.label,n.color);lbl.position.set(n.x,n.y+sr+0.18,n.z);scene.add(lbl);
});
LINKS.forEach(([a,b])=>{const na=nodeMap[a],nb=nodeMap[b];if(!na||!nb)return;const key=`${Math.min(a,b)}-${Math.max(a,b)}`,isHub=a===0||b===0,isBridge=BRIDGE_SET.has(key);const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(na.x,na.y,na.z),new THREE.Vector3(nb.x,nb.y,nb.z)]);let color,opacity;if(isHub){color=0x00d4aa;opacity=0.38;}else if(isBridge){color=0xfb923c;opacity=0.55;}else{color=0x4a6580;opacity=0.18;}scene.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity})));});
const pSystems=[];
BRIDGES.forEach(([a,b])=>{const na=nodeMap[a],nb=nodeMap[b];if(!na||!nb)return;const COUNT=8,pos=new Float32Array(COUNT*3),geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0xfb923c,size:0.09,transparent:true,opacity:0.9,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(pts);pSystems.push({geo,pts,A:new THREE.Vector3(na.x,na.y,na.z),B:new THREE.Vector3(nb.x,nb.y,nb.z),t:Array.from({length:COUNT},(_,i)=>i/COUNT),count:COUNT});});
(function(){const count=400,pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-0.5)*60;pos[i*3+1]=(Math.random()-0.5)*60;pos[i*3+2]=(Math.random()-0.5)*60;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));scene.add(new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:0.04,transparent:true,opacity:0.25})));})();

const tt=document.getElementById('n3dTooltip'),ttName=document.getElementById('n3dttName'),ttDesc=document.getElementById('n3dttDesc'),ttBadge=document.getElementById('n3dttBadge'),ttCoords=document.getElementById('n3dttCoords');
const raycaster=new THREE.Raycaster();const mouse=new THREE.Vector2(-9999,-9999);let hoveredMesh=null;
function onPM(e){const rc=wrap.getBoundingClientRect(),cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;mouse.x=((cx-rc.left)/rc.width)*2-1;mouse.y=-((cy-rc.top)/rc.height)*2+1;raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(meshObjects);if(hits.length){const h=hits[0].object;if(hoveredMesh!==h){if(hoveredMesh){hoveredMesh.material.emissiveIntensity=hoveredMesh.userData.baseEI;hoveredMesh.scale.setScalar(1);}hoveredMesh=h;h.material.emissiveIntensity=0.75;h.scale.setScalar(1.18);}const n=h.userData.node;ttName.textContent=n.label.replace('\n',' ');ttName.style.color=n.color;ttDesc.textContent=n.tip;ttBadge.textContent=n.cat;ttBadge.style.color=n.color;ttBadge.style.borderColor=n.color+'55';ttBadge.style.background=n.color+'14';ttCoords.textContent=`x ${n.x.toFixed(1)} · y ${n.y.toFixed(1)} · z ${n.z.toFixed(1)}`;tt.style.left=(cx+16)+'px';tt.style.top=(cy-16)+'px';tt.classList.add('vis');}else{if(hoveredMesh){hoveredMesh.material.emissiveIntensity=hoveredMesh.userData.baseEI;hoveredMesh.scale.setScalar(1);hoveredMesh=null;}tt.classList.remove('vis');}}
renderer.domElement.addEventListener('mousemove',onPM,{passive:true});
renderer.domElement.addEventListener('touchmove',onPM,{passive:true});
renderer.domElement.addEventListener('mouseleave',()=>{tt.classList.remove('vis');});

const RP=new THREE.Vector3(7.5,5,9.5),RT=new THREE.Vector3(0,0,0);
function toCam(dp,dt,dur=900){const s0=camera.position.clone(),t0=controls.target.clone(),start=performance.now();function step(now){const raw=(now-start)/dur,ease=raw<0.5?2*raw*raw:-1+(4-2*raw)*raw,e=Math.min(ease,1);camera.position.lerpVectors(s0,dp,e);controls.target.lerpVectors(t0,dt,e);controls.update();if(raw<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
document.getElementById('n3dBtnTop').onclick=()=>toCam(new THREE.Vector3(0,13,0.001),RT.clone());
document.getElementById('n3dBtnSide').onclick=()=>toCam(new THREE.Vector3(13,0,0.001),RT.clone());
document.getElementById('n3dBtnFront').onclick=()=>toCam(new THREE.Vector3(0.001,0,13),RT.clone());
document.getElementById('n3dBtnReset').onclick=()=>toCam(RP.clone(),RT.clone());
const btnRot=document.getElementById('n3dBtnRotate');
btnRot.classList.add('rot-on');btnRot.textContent='⏹ Stop Rotate';btnRot.onclick=function(){controls.autoRotate=!controls.autoRotate;this.classList.toggle('rot-on',controls.autoRotate);this.textContent=controls.autoRotate?'⏹ Stop Rotate':'⟳ Auto-Rotate';};
function zoomCamera(f){const dir=new THREE.Vector3();camera.getWorldDirection(dir);const dist=camera.position.distanceTo(controls.target),newPos=camera.position.clone().addScaledVector(dir,dist*(1-f));if(newPos.distanceTo(controls.target)<controls.minDistance||newPos.distanceTo(controls.target)>controls.maxDistance)return;toCam(newPos,controls.target.clone(),300);}
document.getElementById('n3dBtnZoomIn').onclick=()=>zoomCamera(0.75);
document.getElementById('n3dBtnZoomOut').onclick=()=>zoomCamera(1.33);

function onResize(){const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
window._n3dOnResize=onResize;
window.addEventListener('resize',onResize);
onResize();

let clock=0;
(function animate(){requestAnimationFrame(animate);clock+=0.014;
NODES.forEach(n=>{if(!n._mesh)return;const isCenter=n.id===0,isHub=HUB_IDS.has(n.id),base=isCenter?0.28:(isHub?0.22:0.10),amp=isCenter?0.24:(isHub?0.18:0.11),speed=isCenter?1.6:(isHub?1.8:1.3),phase=n.id*0.85,wave=Math.sin(clock*speed+phase);if(n._mesh!==hoveredMesh)n._mesh.material.emissiveIntensity=base+amp*wave;if(n._glow){const bAmp=isCenter?0.50:(isHub?0.28:0.18);n._glow.scale.setScalar(n._glowBase+bAmp*wave);}if(n._aura){const aAmp=isCenter?1.40:(isHub?0.55:0.35),aW=Math.sin(clock*speed*0.55+phase+1.8);n._aura.scale.setScalar(n._auraBase+aAmp*aW);}});
if(nodeMap[0]._torus)nodeMap[0]._torus.rotation.z+=0.008;
pSystems.forEach(ps=>{const arr=ps.geo.attributes.position.array;ps.t=ps.t.map(v=>(v+0.006)%1);for(let i=0;i<ps.count;i++){const f=ps.t[i];arr[i*3]=ps.A.x+(ps.B.x-ps.A.x)*f;arr[i*3+1]=ps.A.y+(ps.B.y-ps.A.y)*f;arr[i*3+2]=ps.A.z+(ps.B.z-ps.A.z)*f;}ps.geo.attributes.position.needsUpdate=true;});
pLight.position.x=3+Math.sin(clock*0.38)*2;pLight.position.z=3+Math.cos(clock*0.28)*2;
controls.update();renderer.render(scene,camera);})();
}
