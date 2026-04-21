/* ── Global tooltip helpers ── */
const _tt=document.getElementById('gtooltip');
const _ttLabel=_tt.querySelector('.tt-label');
const _ttBody=_tt.querySelector('.tt-body');
let _ttColor='#00d4aa';
function showTip(ev,label,body,color){
  _ttColor=color||'#00d4aa';
  _ttLabel.style.color=_ttColor;
  _ttLabel.textContent=label;
  _ttBody.textContent=body;
  _tt.style.borderColor=_ttColor+'44';
  _tt.style.boxShadow=`0 8px 32px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.04),0 0 18px ${_ttColor}22`;
  moveTip(ev);
  _tt.classList.add('visible');
}
function moveTip(ev){
  const pad=14,tw=_tt.offsetWidth||260,th=_tt.offsetHeight||60;
  let x=ev.clientX+pad, y=ev.clientY+pad;
  if(x+tw>window.innerWidth) x=ev.clientX-tw-pad;
  if(y+th>window.innerHeight) y=ev.clientY-th-pad;
  _tt.style.left=x+'px';
  _tt.style.top=y+'px';
}
function hideTip(){
  _tt.classList.remove('visible');
}

/* ── Modal overlay fade helpers ── */
function _modalOpen(el){
  el.style.opacity='0';
  el.classList.add('open');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      el.style.transition='opacity .2s ease';
      el.style.opacity='1';
    });
  });
  el.addEventListener('transitionend',function(){ el.style.transition=''; },{once:true});
}
function _modalClose(el,onDone){
  el.style.transition='opacity .2s ease';
  el.style.opacity='0';
  el.addEventListener('transitionend',function(){
    el.classList.remove('open');
    el.style.opacity='';
    el.style.transition='';
    if(onDone) onDone();
  },{once:true});
}

/* ── Gallery image render with guaranteed crossfade ── */
function _renderImg(img,src){
  img.style.opacity='0';
  img.onload=null;
  img.src=src;
  if(img.complete&&img.naturalWidth){
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ img.style.opacity='1'; }); });
  } else {
    img.onload=function(){ img.style.opacity='1'; };
  }
}

/* --- Gallery carousel --- */
const _galleryImgs = ['media/teaching1.webp','media/teaching2.webp','media/teaching3.webp'];
let _galIdx = 0;
function openGallery(){
  _galIdx = 0;
  _galRender();
  var m=document.getElementById('galleryModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.remove('entering','closing');
  _modalOpen(m);
  requestAnimationFrame(function(){
    void inner.offsetWidth;
    inner.classList.add('entering');
  });
}
function closeGallery(){
  var m=document.getElementById('galleryModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.add('closing');
  _modalClose(m,function(){ inner.classList.remove('entering','closing'); });
}
function _galRender(){
  var img=document.getElementById('galImg');
  _renderImg(img,_galleryImgs[_galIdx]);
  document.querySelectorAll('.gm-dot').forEach(function(d,i){ d.classList.toggle('active',i===_galIdx); });
  [(_galIdx+1)%_galleryImgs.length,(_galIdx-1+_galleryImgs.length)%_galleryImgs.length]
    .forEach(function(i){ new Image().src=_galleryImgs[i]; });
}
function galPrev(){_galIdx=(_galIdx-1+_galleryImgs.length)%_galleryImgs.length;_galRender();}
function galNext(){_galIdx=(_galIdx+1)%_galleryImgs.length;_galRender();}
document.addEventListener('keydown',function(e){
  var m=document.getElementById('galleryModal');
  if(!m.classList.contains('open'))return;
  if(e.key==='ArrowLeft')galPrev();
  else if(e.key==='ArrowRight')galNext();
  else if(e.key==='Escape')closeGallery();
});

/* --- Drawings gallery carousel --- */
const _drawImgs = ['media/drawing1.webp','media/drawing2.webp','media/drawing3.webp','media/drawing4.webp'];
let _drawIdx = 0;
function openDrawingsGallery(){
  _drawIdx = 0;
  _drawRender();
  var m=document.getElementById('drawingsModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.remove('entering','closing');
  _modalOpen(m);
  requestAnimationFrame(function(){
    void inner.offsetWidth;
    inner.classList.add('entering');
  });
}
function closeDrawingsGallery(){
  var m=document.getElementById('drawingsModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.add('closing');
  _modalClose(m,function(){ inner.classList.remove('entering','closing'); });
}
function _drawRender(){
  var img=document.getElementById('drawImg');
  _renderImg(img,_drawImgs[_drawIdx]);
  document.querySelectorAll('.dm-dot').forEach(function(d,i){ d.classList.toggle('active',i===_drawIdx); });
  [(_drawIdx+1)%_drawImgs.length,(_drawIdx-1+_drawImgs.length)%_drawImgs.length]
    .forEach(function(i){ new Image().src=_drawImgs[i]; });
}
function drawPrev(){_drawIdx=(_drawIdx-1+_drawImgs.length)%_drawImgs.length;_drawRender();}
function drawNext(){_drawIdx=(_drawIdx+1)%_drawImgs.length;_drawRender();}
document.addEventListener('keydown',function(e){
  var m=document.getElementById('drawingsModal');
  if(!m.classList.contains('open'))return;
  if(e.key==='ArrowLeft')drawPrev();
  else if(e.key==='ArrowRight')drawNext();
  else if(e.key==='Escape')closeDrawingsGallery();
});

/* --- Vol item photo gallery --- */
var _volGalImgs = [];
var _volGalIdx = 0;
function openVolGallery(imgs) {
  _volGalImgs = imgs;
  _volGalIdx = 0;
  _volGalRender();
  var m=document.getElementById('volGalleryModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.remove('entering','closing');
  _modalOpen(m);
  requestAnimationFrame(function(){
    void inner.offsetWidth;
    inner.classList.add('entering');
  });
}
function closeVolGallery() {
  var m=document.getElementById('volGalleryModal');
  var inner=m.querySelector('.gm-inner');
  inner.classList.add('closing');
  _modalClose(m,function(){ inner.classList.remove('entering','closing'); });
}
function _volGalRender() {
  var img = document.getElementById('volGalImg');
  _renderImg(img,_volGalImgs[_volGalIdx]);
  [(_volGalIdx+1)%_volGalImgs.length,(_volGalIdx-1+_volGalImgs.length)%_volGalImgs.length]
    .forEach(function(i){ new Image().src=_volGalImgs[i]; });
  var dotsEl = document.getElementById('volGalDots');
  dotsEl.innerHTML = '';
  _volGalImgs.forEach(function(_, i) {
    var b = document.createElement('button');
    b.className = 'gm-dot' + (i === _volGalIdx ? ' active' : '');
    (function(idx){ b.addEventListener('click', function(){ _volGalIdx = idx; _volGalRender(); }); })(i);
    dotsEl.appendChild(b);
  });
}
function volGalPrev() { _volGalIdx = (_volGalIdx - 1 + _volGalImgs.length) % _volGalImgs.length; _volGalRender(); }
function volGalNext() { _volGalIdx = (_volGalIdx + 1) % _volGalImgs.length; _volGalRender(); }
document.addEventListener('keydown', function(e) {
  var m = document.getElementById('volGalleryModal');
  if (!m.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') volGalPrev();
  else if (e.key === 'ArrowRight') volGalNext();
  else if (e.key === 'Escape') closeVolGallery();
});

/* --- Section Modal --- */
var _accData = {
  vol: {
    icon: '🏅',
    title: 'Volunteering & Certifications',
    color: '#00d4aa',
    items: [
      {dot:'#00d4aa', html:'🏅 Judge — <a href="https://www.robogeex.com/ai-challenge-2025" target="_blank">AI Challenge 2025: AI for Well-Being</a>', photos:['media/ai_judge.webp']},
      {dot:'#00d4aa', html:'⚙️ Team Coach — <a href="https://arclebanon.org/" target="_blank">Annual Robotics Competition — Lebanon 2025</a>', photos:['media/arc1.webp','media/arc2.webp']},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://wro-association.org/competition/2025-season/" target="_blank">World Robot Olympiad 2025</a>', photos:['media/wro2025_1.webp','media/wro2025_2.webp']},
      {dot:'#00d4aa', html:'🤖 Team Coach (3 teams) — <a href="https://wro-association.org/competition/2024-season/" target="_blank">World Robot Olympiad 2024</a>', photos:['media/wro2024_1.webp','media/wro2024_2.webp','media/wro2024_3.webp','media/wro2024_4.webp']},
      {dot:'#00d4aa', html:'🔬 Team Coach — <a href="https://ifia.com/lebanon-nasr/" target="_blank">National Science Competition — Lebanon 2024</a>', photos:['media/nsc1.webp','media/nsc2.webp']},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://ictd-lb.com/?page=item&ItemId=292" target="_blank">National Robotics Competition — Lebanon 2024</a>', photos:['media/nrc_1.webp','media/nrc_2.webp']},
      {dot:'#00d4aa', html:'🖥️ Member — <a href="https://scsl.org.lb/" target="_blank">Syndicate of Computer Sciences in Lebanon</a> (Beirut)', photos:['media/syndicate1.webp','media/syndicate2.webp','media/syndicate3.webp']},
      {dot:'#00d4aa', html:'📜 Certificate — <a href="https://learningnetwork.cisco.com/s/ccna" target="_blank">CCNA Routing &amp; Switching: Introduction to Networks</a> · Cisco'},
      {dot:'#00d4aa', html:'🎤 Conference Presenter — <em>Data Acquisition &amp; Preprocessing: Brain Imaging Data as an Example</em> · <a href="https://www.facebook.com/Ektidar.Center/" target="_blank">Ektidar</a> Medical Research Applications'},
      {dot:'#00d4aa', html:'🌍 Volunteer — Leading Migration Statistics for People Impacted during the 2024 War on Lebanon'}
    ]
  },
  hobbies: {
    icon: '🎨',
    title: 'Hobbies',
    color: '#a78bfa',
    hobby: true
  }
};
function openAccModal(type) {
  var d = _accData[type];
  var header = document.getElementById('accModalHeader');
  var inner = document.getElementById('accModalInner');
  document.getElementById('accModalIcon').textContent = d.icon;
  document.getElementById('accModalTitle').textContent = d.title;
  document.getElementById('accModalTitle').style.color = d.color;
  header.style.borderBottomColor = d.color + '44';
  inner.style.borderColor = d.color + '55';
  inner.style.boxShadow = '0 20px 60px rgba(0,0,0,.7), 0 0 0 1px ' + d.color + '22';
  var body = document.getElementById('accModalBody');
  body.innerHTML = '';
  if (d.hobby) {
    var a = document.createElement('a');
    a.href = 'https://t.me/batouldiabbot';
    a.target = '_blank';
    a.className = 'acc-htag';
    a.innerHTML = '🎨 Painting · ✍️ Poetry · 📝 Writing';
    body.style.flexDirection = 'row';
    body.style.flexWrap = 'wrap';
    body.appendChild(a);
  } else {
    body.style.flexDirection = 'column';
    body.style.flexWrap = '';
    d.items.forEach(function(it, idx) {
      var row = document.createElement('div');
      row.className = 'acc-item';
      row.style.setProperty('--i', idx);
      row.innerHTML = '<div class="acc-dot" style="color:' + it.dot + ';background:' + it.dot + '"></div><span>' + it.html + '</span>';
      if (it.photos && it.photos.length) {
        var btn = document.createElement('button');
        btn.className = 'acc-photo-btn';
        btn.title = 'View photos';
        btn.textContent = '📷';
        (function(imgs) {
          btn.addEventListener('click', function(e) { e.stopPropagation(); openVolGallery(imgs); });
        })(it.photos);
        row.appendChild(btn);
      }
      body.appendChild(row);
    });
  }
  inner.classList.remove('closing');
  _modalOpen(document.getElementById('accModal'));
}
function closeAccModal() {
  var modal = document.getElementById('accModal');
  var inner = document.getElementById('accModalInner');
  inner.classList.add('closing');
  _modalClose(modal, function(){ inner.classList.remove('closing'); });
}

/* ── Email chip copy with animated state swap ── */
function copyEmail(el) {
  navigator.clipboard.writeText('batouldiab@outlook.com').then(function(){
    var orig = el.textContent;
    el.classList.add('chip-flash');
    setTimeout(function(){
      el.textContent = '✓ Email Copied';
      el.classList.remove('chip-flash');
      setTimeout(function(){
        el.classList.add('chip-flash');
        setTimeout(function(){
          el.textContent = orig;
          el.classList.remove('chip-flash');
        }, 140);
      }, 2000);
    }, 140);
  }).catch(function(){ window.location.href = 'mailto:batouldiab@outlook.com'; });
}

/* ── Panel reveal on scroll (IntersectionObserver) ── */
(function(){
  if (!('IntersectionObserver' in window)) return;
  var panels = document.querySelectorAll('.panel, .pcard');
  panels.forEach(function(p, i){
    p.style.setProperty('--reveal-delay', (i * 28) + 'ms');
    p.classList.add('panel-reveal');
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  panels.forEach(function(p){ io.observe(p); });
})();
