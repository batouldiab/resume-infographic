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

/* --- Gallery carousel --- */
const _galleryImgs = ['media/teaching1.jpg','media/teaching2.jpg','media/teaching3.jpg'];
let _galIdx = 0;
function openGallery(){
  _galIdx = 0;
  _galRender();
  document.getElementById('galleryModal').classList.add('open');
}
function closeGallery(){
  document.getElementById('galleryModal').classList.remove('open');
}
function _galRender(){
  const img = document.getElementById('galImg');
  const src = _galleryImgs[_galIdx];
  img.style.opacity = '0';
  img.onload = function(){ img.style.opacity = '1'; };
  img.src = src;
  document.querySelectorAll('.gm-dot').forEach((d,i)=>d.classList.toggle('active',i===_galIdx));
}
function galPrev(){_galIdx=(_galIdx-1+_galleryImgs.length)%_galleryImgs.length;_galRender();}
function galNext(){_galIdx=(_galIdx+1)%_galleryImgs.length;_galRender();}
document.addEventListener('keydown',function(e){
  const m=document.getElementById('galleryModal');
  if(!m.classList.contains('open'))return;
  if(e.key==='ArrowLeft')galPrev();
  else if(e.key==='ArrowRight')galNext();
  else if(e.key==='Escape')closeGallery();
});

/* --- Drawings gallery carousel --- */
const _drawImgs = ['media/drawing1.jpg','media/drawing2.jpg','media/drawing3.jpg','media/drawing4.jpg'];
let _drawIdx = 0;
function openDrawingsGallery(){
  _drawIdx = 0;
  _drawRender();
  document.getElementById('drawingsModal').classList.add('open');
}
function closeDrawingsGallery(){
  document.getElementById('drawingsModal').classList.remove('open');
}
function _drawRender(){
  const img = document.getElementById('drawImg');
  const src = _drawImgs[_drawIdx];
  img.style.opacity = '0';
  img.onload = function(){ img.style.opacity = '1'; };
  img.src = src;
  document.querySelectorAll('.dm-dot').forEach((d,i)=>d.classList.toggle('active',i===_drawIdx));
}
function drawPrev(){_drawIdx=(_drawIdx-1+_drawImgs.length)%_drawImgs.length;_drawRender();}
function drawNext(){_drawIdx=(_drawIdx+1)%_drawImgs.length;_drawRender();}
document.addEventListener('keydown',function(e){
  const m=document.getElementById('drawingsModal');
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
  document.getElementById('volGalleryModal').classList.add('open');
}
function closeVolGallery() {
  document.getElementById('volGalleryModal').classList.remove('open');
}
function _volGalRender() {
  const img = document.getElementById('volGalImg');
  const src = _volGalImgs[_volGalIdx];
  img.style.opacity = '0';
  img.onload = function(){ img.style.opacity = '1'; };
  img.src = src;
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
      {dot:'#00d4aa', html:'🏅 Judge — <a href="https://www.robogeex.com/ai-challenge-2025" target="_blank">AI Challenge 2025: AI for Well-Being</a>', photos:['media/ai_judge.jpg']},
      {dot:'#00d4aa', html:'⚙️ Team Coach — <a href="https://arclebanon.org/" target="_blank">Annual Robotics Competition — Lebanon 2025</a>', photos:['media/arc1.jpg','media/arc2.jpg']},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://wro-association.org/" target="_blank">World Robot Olympiad 2025</a>', photos:['media/wro2025_1.jpg','media/wro2025_2.jpg']},
      {dot:'#00d4aa', html:'🤖 Team Coach (3 teams) — <a href="https://wro-association.org/" target="_blank">World Robot Olympiad 2024</a>', photos:['media/wro2024_1.jpg','media/wro2024_2.jpg','media/wro2024_3.jpg','media/wro2024_4.jpg']},
      {dot:'#00d4aa', html:'🔬 Team Coach — <a href="https://ifia.com/lebanon-nasr/" target="_blank">National Science Competition — Lebanon 2024</a>', photos:['media/nsc1.jpg','media/nsc2.jpg']},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://ictd-lb.com/?page=item&ItemId=292" target="_blank">National Robotics Competition — Lebanon 2024</a>', photos:['media/nrc_1.jpg','media/nrc_2.jpg']},
      {dot:'#00d4aa', html:'🖥️ Member — <a href="https://scsl.org.lb/" target="_blank">Syndicate of Computer Sciences in Lebanon</a> (Beirut)', photos:['media/syndicate1.jpg','media/syndicate2.png','media/syndicate3.jpg']},
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
    d.items.forEach(function(it) {
      var row = document.createElement('div');
      row.className = 'acc-item';
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
  document.getElementById('accModal').classList.add('open');
}
function closeAccModal() {
  document.getElementById('accModal').classList.remove('open');
}
