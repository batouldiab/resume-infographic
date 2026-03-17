/* Init runs directly — all required DOM nodes are already above this script tag.
   window 'load' is intentionally avoided: GAS HtmlService sandboxes pages in
   an iframe where the load event may never fire, silently killing all init code. */
(function() {

/* ─────────────────────────────────────────────────────────────
   NEEDLE GAUGES
   ───────────────────────────────────────────────────────────── */
const skillNames=['Python','ML / Deep Learning','NLP / Large Language Models','React / Next.js','R / Statistics','Data Engineering','MLOps / AWS','GIS / Google Earth Engine'];
const skills2020=[70,10,0,40,30,20,0,0];
const skills2026=[93,88,80,84,80,75,70,68];
function gaugeColor(pct){
  const v=pct/100;
  const stops=[
    {p:0.00,c:[239,68,68]},{p:0.20,c:[249,115,22]},{p:0.40,c:[250,204,21]},
    {p:0.60,c:[74,222,128]},{p:0.80,c:[56,189,248]},{p:1.00,c:[168,85,247]}
  ];
  let i=stops.length-2;
  for(let j=0;j<stops.length-1;j++){if(v<=stops[j+1].p){i=j;break;}}
  const a=stops[i],b=stops[i+1],t=(v-a.p)/(b.p-a.p);
  return`rgb(${Math.round(a.c[0]+(b.c[0]-a.c[0])*t)},${Math.round(a.c[1]+(b.c[1]-a.c[1])*t)},${Math.round(a.c[2]+(b.c[2]-a.c[2])*t)})`;
}
function makeGauge(skill){
  const W=164,H=52,cx=W/2,cy=H-7,R=36,ri=R-10;
  const gId='grd'+skill.name.replace(/[^a-z0-9]/gi,'');
  const nA=Math.PI-(skill.level/100)*Math.PI,col=gaugeColor(skill.level);
  const nx=cx+(R-5)*Math.cos(nA),ny=cy-(R-5)*Math.sin(nA);
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:52px;display:block">
    <defs><linearGradient id="${gId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#ef4444"/>
      <stop offset="20%"  stop-color="#f97316"/>
      <stop offset="40%"  stop-color="#facc15"/>
      <stop offset="60%"  stop-color="#4ade80"/>
      <stop offset="80%"  stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient></defs>
    <path d="M${cx-R},${cy} A${R},${R} 0 0,1 ${cx+R},${cy} L${cx+ri},${cy} A${ri},${ri} 0 0,0 ${cx-ri},${cy} Z" fill="url(#${gId})"/>
    <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${col}" stroke-width="2" stroke-linecap="round" style="filter:drop-shadow(0 0 3px ${col})"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="${col}" style="filter:drop-shadow(0 0 4px ${col})"/>
  </svg>`;
}
const stack=document.getElementById('gaugeStack');
function renderGauges(pct){
  const t=pct/100;
  document.getElementById('gaugeYear').textContent=Math.round(2020+t*6);
  stack.innerHTML='';
  skillNames.forEach((name,i)=>{
    const level=Math.round(skills2020[i]+(skills2026[i]-skills2020[i])*t);
    const col=gaugeColor(level),d=document.createElement('div');
    d.className='gauge-item';d.style.borderLeft=`3px solid ${col}`;
    d.innerHTML=`<div class="gauge-title">${name}</div>${makeGauge({name,level})}`;
    stack.appendChild(d);
  });
}
renderGauges(100);
document.getElementById('gaugeSlider').addEventListener('input',function(){renderGauges(+this.value);});

/* ─────────────────────────────────────────────────────────────
   SOFT SKILLS RADAR
   ───────────────────────────────────────────────────────────── */
(function(){
  function valColor(v){
    const stops=[
      {p:0.00,c:[239,68,68]},{p:0.20,c:[249,115,22]},{p:0.75,c:[250,204,21]},
      {p:0.85,c:[74,222,128]},{p:0.95,c:[56,189,248]},{p:1.00,c:[168,85,247]}
    ];
    let i=stops.length-2;
    for(let j=0;j<stops.length-1;j++){if(v<=stops[j+1].p){i=j;break;}}
    const a=stops[i],b=stops[i+1],t=(v-a.p)/(b.p-a.p);
    return`rgb(${Math.round(a.c[0]+(b.c[0]-a.c[0])*t)},${Math.round(a.c[1]+(b.c[1]-a.c[1])*t)},${Math.round(a.c[2]+(b.c[2]-a.c[2])*t)})`;
  }
  const v2020=[.60,.50,.55,.70,.40,.70,.80,.65];
  const v2026=[.90,.88,.80,.85,.73,.84,.90,.84];
  const labels=['Teaching','Mentoring','Research','Comm.','Leadership','Adaptability','Problem-Solving','Collaboration'];
  const svg=document.getElementById('radarSvg'),cx=100,cy=95,R=68,N=labels.length;
  const angs=labels.map((_,i)=>-Math.PI/2+i*2*Math.PI/N);

  // static grid + axis lines
  [.25,.5,.75,1].forEach(r=>{
    const p=angs.map(a=>`${cx+R*r*Math.cos(a)},${cy+R*r*Math.sin(a)}`).join(' ');
    const el=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    el.setAttribute('points',p);el.setAttribute('fill','none');el.setAttribute('stroke','#0d2040');el.setAttribute('stroke-width','1');svg.appendChild(el);
  });
  angs.forEach(a=>{
    const l=document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',cx);l.setAttribute('y1',cy);
    l.setAttribute('x2',cx+R*Math.cos(a));l.setAttribute('y2',cy+R*Math.sin(a));
    l.setAttribute('stroke','#0d2040');l.setAttribute('stroke-width','1');svg.appendChild(l);
  });

  // data polygon
  const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('fill','rgba(0,212,170,.1)');poly.setAttribute('stroke','rgba(0,212,170,.3)');poly.setAttribute('stroke-width','1');svg.appendChild(poly);

  // dots + labels
  const dots=labels.map((lbl,i)=>{
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('r','3.5');svg.appendChild(c);
    const t=document.createElementNS('http://www.w3.org/2000/svg','text');
    const lx=cx+(R+13)*Math.cos(angs[i]),ly=cy+(R+13)*Math.sin(angs[i]);
    t.setAttribute('x',lx);t.setAttribute('y',ly+3);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family',"'Exo 2',sans-serif");t.setAttribute('font-size','7');t.setAttribute('fill','#c8d8e8');t.textContent=lbl;svg.appendChild(t);
    return c;
  });

  function update(pct){
    const t=pct/100;
    const year=Math.round(2020+t*6);
    document.getElementById('radarYear').textContent=year;
    const pts=angs.map((a,i)=>{
      const v=v2020[i]+(v2026[i]-v2020[i])*t;
      return{vx:cx+R*v*Math.cos(a),vy:cy+R*v*Math.sin(a),v};
    });
    poly.setAttribute('points',pts.map(p=>`${p.vx},${p.vy}`).join(' '));
    pts.forEach((p,i)=>{
      const col=valColor(p.v);
      dots[i].setAttribute('cx',p.vx);dots[i].setAttribute('cy',p.vy);
      dots[i].setAttribute('fill',col);dots[i].style.filter=`drop-shadow(0 0 4px ${col})`;
    });
  }

  update(100);
  document.getElementById('radarSlider').addEventListener('input',function(){update(+this.value);});
})();

/* ─────────────────────────────────────────────────────────────
   2D TECHNOLOGY ECOSYSTEM NETWORK
   ───────────────────────────────────────────────────────────── */
(function(){
  const svg=document.getElementById('netSvg');
  const W=900,H=700;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);

  const nodes=[
    {id:0, shape:'circle',l:'BATOUL\nDIAB',   r:44, x:450, y:248, c:'#00d4aa', hub:true,  tip:'AI/ML Data Engineering Scientist · Beirut, Lebanon'},
    {id:1, shape:'circle',l:'Python',          r:30, x:285, y:193, c:'#00d4aa', tip:'Primary language: ML pipelines, REST APIs, data engineering, backend.'},
    {id:7, shape:'circle',l:'NLP',             r:30, x:478, y:96,  c:'#38bdf8', tip:'Natural Language Processing — classification, skills extraction, sentiment analysis.'},
    {id:8, shape:'circle',l:'LLMs',            r:28, x:578, y:86,  c:'#38bdf8', tip:'Large Language Models — core of UN pipelines and chatbot.'},
    {id:10,shape:'circle',l:'RAG',             r:25, x:662, y:168, c:'#38bdf8', tip:'Retrieval-Augmented Generation — Next.js + LangChain + OpenAI production chatbot.'},
    {id:14,shape:'circle',l:'MLOps',           r:27, x:388, y:378, c:'#a78bfa', tip:'End-to-end production ML pipeline management.'},
    {id:16,shape:'circle',l:'AWS',             r:26, x:505, y:398, c:'#a78bfa', tip:'Amazon Web Services: EC2, S3, ECR, IAM — cloud-native ML deployment.'},
    {id:20,shape:'circle',l:'Data\nEng',        r:27, x:298, y:76,  c:'#ffc93c', tip:'100s of TB fragmented human capital data — cleaned, structured, mart-ready.'},
    {id:23,shape:'circle',l:'GIS/GEE',         r:24, x:560, y:156, c:'#fb923c', tip:'Google Earth Engine — geospatial ETL, city-scale dashboards for UN ESCWA.'},
    {id:2, shape:'rect',  l:'TensorFlow',      rw:48,rh:20, x:188, y:273, c:'#86efac', tip:'Deep learning framework — brain age & bioinformatics models.'},
    {id:3, shape:'rect',  l:'PyTorch',         rw:38,rh:20, x:212, y:343, c:'#86efac', tip:'Custom neural network architectures and research experimentation.'},
    {id:4, shape:'rect',  l:'scikit-learn',    rw:50,rh:20, x:300, y:396, c:'#86efac', tip:'Classical ML: regression, classification, clustering, evaluation.'},
    {id:5, shape:'rect',  l:'GNN / GCN',       rw:46,rh:20, x:112, y:226, c:'#86efac', tip:'Graph Neural Networks + GCNs — brain age (fMRI) & UN labour forecasting.'},
    {id:6, shape:'rect',  l:'Keras',           rw:32,rh:20, x:142, y:143, c:'#86efac', tip:'High-level neural network API — rapid model prototyping.'},
    {id:21,shape:'rect',  l:'Polars / Pandas', rw:58,rh:20, x:195, y:60,  c:'#fde68a', tip:'High-performance Python dataframe libraries for large-scale pipelines.'},
    {id:22,shape:'rect',  l:'SQL / MongoDB',   rw:56,rh:20, x:400, y:40,  c:'#fde68a', tip:'Relational (SQL/MySQL/SQLite) and NoSQL (MongoDB) data modelling.'},
    {id:9, shape:'rect',  l:'LangChain',       rw:46,rh:20, x:662, y:103, c:'#7dd3fc', tip:'LLM orchestration framework — production RAG chatbot architecture.'},
    {id:11,shape:'rect',  l:'HuggingFace',     rw:52,rh:20, x:658, y:223, c:'#7dd3fc', tip:'Pre-trained transformer models — fine-tuning & embeddings.'},
    {id:24,shape:'rect',  l:'React / Next.js', rw:58,rh:20, x:658, y:313, c:'#ff5f6d', tip:'ReactJS dashboards + Next.js RAG chatbot frontend.'},
    {id:19,shape:'rect',  l:'FastAPI / Flask', rw:58,rh:20, x:658, y:370, c:'#c4b5fd', tip:'Python REST API frameworks for serving ML models in production.'},
    {id:13,shape:'rect',  l:'GPT / Gemini / Fanar',  rw:74,rh:20, x:792, y:168, c:'#7dd3fc', tip:'GPT (OpenAI) integrated into production RAG pipeline; Gemini (Google) + Fanar (Arabic LLM) — multilingual NLP at UN ESCWA.'},
    {id:25,shape:'rect',  l:'TypeScript',      rw:50,rh:20, x:792, y:263, c:'#fca5a5', tip:'Strongly-typed JS — GOVA Group backend services.'},
    {id:17,shape:'rect',  l:'CI / CD',         rw:34,rh:20, x:792, y:318, c:'#c4b5fd', tip:'Continuous Integration/Deployment via GitHub Actions.'},
    {id:15,shape:'rect',  l:'MLflow',          rw:38,rh:20, x:200, y:423, c:'#c4b5fd', tip:'Experiment tracking, model versioning, deployment lifecycle.'},
    {id:18,shape:'rect',  l:'DVC',             rw:26,rh:20, x:564, y:426, c:'#c4b5fd', tip:'Data Version Control — tracks datasets & models like Git.'},
  ];

  const links=[
    [0,1],[0,7],[0,14],[0,20],[0,23],[0,10],
    [1,2],[1,3],[1,4],[1,5],[1,6],[1,20],[1,14],
    [7,8],[7,9],[7,10],[7,23],[8,9],[8,10],[8,13],[9,10],[10,11],[10,13],
    [14,15],[14,16],[14,17],[14,18],[16,17],[16,19],[17,19],
    [20,21],[20,22],[20,7],[20,5],
    [24,25],[24,16],[24,19],[25,13],[23,20],[23,7],[5,3],
  ];

  const nodeMap={};nodes.forEach(n=>nodeMap[n.id]=n);

  function edgePt(n,tx,ty){
    const dx=tx-n.x,dy=ty-n.y,d=Math.sqrt(dx*dx+dy*dy)||1;
    if(n.shape==='circle'){return{x:n.x+dx/d*n.r,y:n.y+dy/d*n.r};}
    const hw=n.rw,hh=n.rh,sx=dx/d,sy=dy/d;
    const t=Math.min(sx!==0?hw/Math.abs(sx):Infinity, sy!==0?hh/Math.abs(sy):Infinity);
    return{x:n.x+sx*t,y:n.y+sy*t};
  }

  links.forEach(([a,b])=>{
    const na=nodeMap[a],nb=nodeMap[b];if(!na||!nb)return;
    const hub=a===0||b===0;
    const p1=edgePt(na,nb.x,nb.y),p2=edgePt(nb,na.x,na.y);
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',p1.x);line.setAttribute('y1',p1.y);line.setAttribute('x2',p2.x);line.setAttribute('y2',p2.y);
    line.setAttribute('stroke',hub?'rgba(0,212,170,.22)':'rgba(255,255,255,.07)');
    line.setAttribute('stroke-width',hub?'1.8':'0.9');
    if(!hub)line.setAttribute('stroke-dasharray','3 5');
    svg.appendChild(line);
  });

  const cards=[
    {x:10, y:458, w:274, h:240, bc:'#a78bfa', icon:'🧠', title:'AI × Health',
     sub:"<a href='https://doi.org/10.5281/zenodo.18890505' target='_blank' style='color:#6a7f95;text-decoration:underline'>Brain Age Prediction — Master's Thesis</a> (<a href='https://en.wikipedia.org/wiki/Tarbiat_Modares_University' target='_blank' style='color:#6a7f95;text-decoration:underline'>Tarbiat Modares University</a>)",
     body:'Multi-atlas ensemble fusing <b>GCNs with functional MRI (fMRI) regression</b> to predict biological brain age — a marker for Alzheimer\'s. <b>Domain knowledge + deep learning = results neither achieves alone.</b>',
     anchorId:5},
    {x:313, y:458, w:274, h:240, bc:'#ffc93c', icon:'🌍', title:'AI × Society',
     sub:"<a href='https://www.unescwa.org/' target='_blank' style='color:#6a7f95;text-decoration:underline'>UN ESCWA</a> — Geo-AI Pipelines for Policy",
     body:'End-to-end pipelines (Python, Polars, LLMs, GNNs) processing <b>100s of TB of fragmented human capital &amp; intellectual capacities data</b> from regions-in-transition. Geo-enabled dashboards for policymakers. <b>The biggest AI challenge is data fragmentation — defragmenting it empowers policy at every scale.</b>',
     anchorId:20},
    {x:616, y:458, w:274, h:240, bc:'#38bdf8', icon:'⚙️', title:'AI × Deployment',
     sub:"<a href='https://skillsmonitorfigures.onrender.com/' target='_blank' style='color:#6a7f95;text-decoration:underline'>Production MLOps</a> + <a href='https://batouldiab.streamlit.app/' target='_blank' style='color:#6a7f95;text-decoration:underline'>RAG Chatbot</a> + <a href='https://cities-skills-v2.streamlit.app/' target='_blank' style='color:#6a7f95;text-decoration:underline'>Full-Stack</a>",
     body:'Full production MLOps (MLflow, DVC, AWS, CI/CD) and a <b>Retrieval-Augmented Generation (RAG) chatbot (Next.js, LangChain, OpenAI)</b>. Research from whiteboard to production. Google Earth Engine (GEE) geospatial ETL + full-stack. <b>Thinks across every abstraction layer: data to interface.</b>',
     anchorId:10},
  ];

  cards.forEach(card=>{
    const anchor=nodeMap[card.anchorId];
    const ctX=card.x+card.w/2,ctY=card.y;
    const anY=anchor.shape==='circle'?anchor.y+anchor.r:anchor.y+anchor.rh;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M${ctX},${ctY} C${ctX},${ctY-60} ${anchor.x},${anY+60} ${anchor.x},${anY}`);
    path.setAttribute('fill','none');path.setAttribute('stroke',card.bc);
    path.setAttribute('stroke-width','1.4');path.setAttribute('stroke-dasharray','6 4');path.setAttribute('opacity','.5');
    svg.appendChild(path);
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('cx',ctX);dot.setAttribute('cy',ctY);dot.setAttribute('r','3.5');
    dot.setAttribute('fill',card.bc);dot.setAttribute('opacity','.85');svg.appendChild(dot);
  });

  cards.forEach(card=>{
    const fo=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
    fo.setAttribute('x',card.x);fo.setAttribute('y',card.y);fo.setAttribute('width',card.w);fo.setAttribute('height',card.h);
    fo.innerHTML=`<div xmlns="http://www.w3.org/1999/xhtml" style="background:rgba(6,10,20,.96);border:1px solid ${card.bc};border-top:2px solid ${card.bc};border-radius:9px;padding:11px 13px;height:100%;overflow:hidden;box-shadow:0 0 20px rgba(0,0,0,.6);font-family:'Exo 2',sans-serif">
      <div style="font-size:16px;font-weight:800;color:${card.bc};margin-bottom:6px">${card.icon} ${card.title}</div>
      <div style="font-size:11.5px;font-weight:600;color:#6a7f95;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #0d2040">${card.sub}</div>
      <div style="font-size:12.5px;color:#8a9fb8;line-height:1.7">${card.body}</div>
    </div>`;
    svg.appendChild(fo);
  });

  nodes.forEach(n=>{
    const g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('transform',`translate(${n.x},${n.y})`);

    if(n.shape==='circle'){
      const glow=document.createElementNS('http://www.w3.org/2000/svg','circle');
      glow.setAttribute('r',n.r+6);glow.setAttribute('fill','none');
      glow.setAttribute('stroke',n.c);glow.setAttribute('stroke-width','1.2');glow.setAttribute('opacity','.13');g.appendChild(glow);
      const body=document.createElementNS('http://www.w3.org/2000/svg','circle');
      body.setAttribute('r',n.r);body.setAttribute('fill',n.hub?'rgba(0,212,170,.18)':'rgba(4,8,15,.92)');
      body.setAttribute('stroke',n.c);body.setAttribute('stroke-width',n.hub?'3':'2');
      body.style.filter=`drop-shadow(0 0 ${n.hub?14:6}px ${n.c})`;body.style.transition='all .2s';g.appendChild(body);
      if(n.hub){
        // Clip image to circle
        const clipId='hubClip_'+n.id;
        const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
        const clipPath=document.createElementNS('http://www.w3.org/2000/svg','clipPath');
        clipPath.setAttribute('id',clipId);
        const clipCircle=document.createElementNS('http://www.w3.org/2000/svg','circle');
        clipCircle.setAttribute('cx','0');clipCircle.setAttribute('cy','0');clipCircle.setAttribute('r',n.r-2);
        clipPath.appendChild(clipCircle);defs.appendChild(clipPath);g.appendChild(defs);
        const bgCircle=document.createElementNS('http://www.w3.org/2000/svg','circle');
        bgCircle.setAttribute('cx','0');bgCircle.setAttribute('cy','0');bgCircle.setAttribute('r',n.r-2);
        bgCircle.setAttribute('fill','#000000');g.appendChild(bgCircle);
        const img=document.createElementNS('http://www.w3.org/2000/svg','image');
        img.setAttribute('href','media/graduate.png');
        img.setAttribute('x',-n.r+2);img.setAttribute('y',-n.r+2);
        img.setAttribute('width',(n.r-2)*2);img.setAttribute('height',(n.r-2)*2);
        img.setAttribute('preserveAspectRatio','xMidYMid slice');
        img.setAttribute('clip-path',`url(#${clipId})`);
        g.appendChild(img);
      } else {
        n.l.split('\n').forEach((p,pi,arr)=>{
          const t=document.createElementNS('http://www.w3.org/2000/svg','text');
          t.setAttribute('text-anchor','middle');t.setAttribute('dominant-baseline','middle');
          t.setAttribute('y',(pi-(arr.length-1)/2)*11);
          t.setAttribute('font-family',"'Exo 2',sans-serif");
          t.setAttribute('font-size',Math.max(9.5,n.r*.52));
          t.setAttribute('font-weight','800');t.setAttribute('fill',n.c);
          t.textContent=p;g.appendChild(t);
        });
      }
      g.addEventListener('mouseenter',()=>{body.style.filter=`drop-shadow(0 0 20px ${n.c})`;glow.setAttribute('opacity','.45');body.setAttribute('r',n.r+3);});
      g.addEventListener('mouseleave',()=>{body.style.filter=`drop-shadow(0 0 ${n.hub?14:6}px ${n.c})`;glow.setAttribute('opacity','.13');body.setAttribute('r',n.r);});
    } else {
      const hw=n.rw,hh=n.rh,rx=7;
      const glow=document.createElementNS('http://www.w3.org/2000/svg','rect');
      glow.setAttribute('x',-hw-4);glow.setAttribute('y',-hh-4);glow.setAttribute('width',(hw+4)*2);glow.setAttribute('height',(hh+4)*2);
      glow.setAttribute('rx',rx+3);glow.setAttribute('fill','none');
      glow.setAttribute('stroke',n.c);glow.setAttribute('stroke-width','1');glow.setAttribute('opacity','.12');g.appendChild(glow);
      const body=document.createElementNS('http://www.w3.org/2000/svg','rect');
      body.setAttribute('x',-hw);body.setAttribute('y',-hh);body.setAttribute('width',hw*2);body.setAttribute('height',hh*2);
      body.setAttribute('rx',rx);body.setAttribute('fill','rgba(4,8,15,.92)');
      body.setAttribute('stroke',n.c);body.setAttribute('stroke-width','1.5');
      body.style.filter=`drop-shadow(0 0 5px ${n.c})`;body.style.transition='all .2s';g.appendChild(body);
      const t=document.createElementNS('http://www.w3.org/2000/svg','text');
      t.setAttribute('text-anchor','middle');t.setAttribute('dominant-baseline','middle');
      t.setAttribute('font-family',"'Exo 2',sans-serif");t.setAttribute('font-size','9.5');
      t.setAttribute('font-weight','800');t.setAttribute('fill',n.c);t.textContent=n.l;g.appendChild(t);
      g.addEventListener('mouseenter',()=>{body.style.filter=`drop-shadow(0 0 12px ${n.c})`;glow.setAttribute('opacity','.4');});
      g.addEventListener('mouseleave',()=>{body.style.filter=`drop-shadow(0 0 5px ${n.c})`;glow.setAttribute('opacity','.12');});
    }
    if(n.tip){
      g.addEventListener('mousemove',ev=>showTip(ev,n.l.replace('\n',' '),n.tip,n.c));
      g.addEventListener('mouseleave',hideTip);
    }
    svg.appendChild(g);
  });
})();

/* ─────────────────────────────────────────────────────────────
   CAREER & ACADEMIC TIMELINE
   ───────────────────────────────────────────────────────────── */
(function(){
  const jobs=[
    {yr:'2014–17',role:'B.S. Comp Sci',org:'Lebanese Univ.',link:'https://ul.edu.lb/en/colleges-faculties-details/311/Faculty%20of%20Science',c:'#ffc93c',tip:'Foundation: algorithms, software, CS theory.'},
    {yr:'2017–18',role:'M.S.-1 Comp Sci',org:'Lebanese Univ.',link:'https://ul.edu.lb/en/colleges-faculties-details/311/Faculty%20of%20Science',c:'#fde68a',tip:'Advanced CS — Year 1 of Master of Science.'},
    {yr:'2020–23',role:'M.Eng. AI+Robotics',org:'TMU, Iran',link:'https://en.wikipedia.org/wiki/Tarbiat_Modares_University',c:'#a78bfa',tip:'Scholarship. Brain Age Prediction: Multi-Atlas Ensemble Deep Regression (fMRI + GCNs).'},
    {yr:'Feb 2022–Jan 2025',role:'AI/ML Contractor',org:'Independent',link:'https://www.linkedin.com/in/batoul96diab/',c:'#38bdf8',tip:'MLOps (MLflow, DVC, AWS CI/CD), RAG chatbot (LangChain+OpenAI).'},
    {yr:'Sep 2022–Sep 2025',role:'AI/ML Data Sci.',org:'Coding C',link:'https://www.linkedin.com/company/coding-c-lebanon',c:'#86efac',tip:'End-to-end data science: preprocessing, modelling, evaluation. Python & R.'},
    {yr:'Jan 2023+',role:'Full-Stack Dev',org:'GOVA Group',link:'https://gova-group.com/',c:'#ff5f6d',tip:'Lab, Financial & HR systems. ReactJS + TypeScript + MySQL.'},
    {yr:'Jan 2024–Aug 2025',role:'STEAM Tutor',org:'Adv. Tech Innov.',link:'https://www.linkedin.com/company/aticenter',c:'#fb923c',tip:'Robotics, AI tools & 3D-printing for children. Girls education.'},
    {yr:'Jul 2024+',role:'ML/Python Tutor',org:'Ghobeiry VTC',link:'https://www.ghobeiry.gov.lb/',c:'#f472b6',tip:'Python, ML & Prompt Engineering. Women in AI. Responsible AI.'},
    {yr:'Oct–Dec 2025',role:'ML Engineer (Consultant)',org:'UN ESCWA',link:'https://www.unescwa.org/',c:'#00d4aa',tip:'100s TB human capital pipelines, Geo-AI dashboards, GNN forecasting, LLM-NLP (Gemini/Fanar).'},
  ];
  const tl=document.getElementById('tlContainer');
  const gc=jobs.map(j=>j.c).join(',');
  let h=`<div style="position:relative"><div style="height:3px;background:linear-gradient(90deg,${gc});border-radius:2px;position:relative">`;
  jobs.forEach((j,i)=>{
    const pct=(i/(jobs.length-1)*100).toFixed(1);
    h+=`<div data-tip="${j.tip.replace(/"/g,'&quot;')}" data-label="${j.role} · ${j.org}" data-c="${j.c}" style="position:absolute;left:${pct}%;top:50%;transform:translate(-50%,-50%);width:11px;height:11px;border-radius:50%;background:${j.c};border:2px solid #04080f;box-shadow:0 0 6px ${j.c};cursor:default"></div>`;
  });
  h+=`</div><div style="display:grid;grid-template-columns:repeat(${jobs.length},1fr);gap:0;margin-top:7px">`;
  jobs.forEach((j,i)=>{
    h+=`<div style="padding:0 3px;text-align:center;${i>0?'border-left:1px dashed #0d2040':''}">
      <div style="font-family:'Share Tech Mono',monospace;font-size:.49rem;color:#4a6580;margin-bottom:1px">${j.yr}</div>
      <div style="font-size:.57rem;font-weight:700;color:${j.c};line-height:1.2">${j.role}</div>
      <div style="font-size:.52rem;color:#4a6580">${j.link?`<a href="${j.link}" target="_blank" style="color:${j.c};text-decoration:none">${j.org}</a>`:j.org}</div>
    </div>`;
  });
  h+=`</div></div>`;
  tl.innerHTML=h;
})();

  /* Tooltip delegation for timeline dots */
  document.addEventListener('mouseover',ev=>{
    const dot=ev.target.closest('[data-tip]');
    if(dot) showTip(ev,dot.dataset.label,dot.dataset.tip,dot.dataset.c);
  });
  document.addEventListener('mousemove',ev=>{
    const dot=ev.target.closest('[data-tip]');
    if(dot) moveTip(ev);
  });
  document.addEventListener('mouseout',ev=>{
    if(ev.target.closest('[data-tip]')) hideTip();
  });

})(); // end charts IIFE
