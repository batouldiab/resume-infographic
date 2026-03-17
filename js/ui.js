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
  document.getElementById('galImg').src = _galleryImgs[_galIdx];
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
  document.getElementById('drawImg').src = _drawImgs[_drawIdx];
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

/* --- Section Modal --- */
var _accData = {
  vol: {
    icon: '🏅',
    title: 'Volunteering & Certifications',
    color: '#00d4aa',
    items: [
      {dot:'#00d4aa', html:'🏅 Judge — <a href="https://www.robogeex.com/ai-challenge-2025" target="_blank">AI Challenge 2025: AI for Well-Being</a>'},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://wro-association.org/" target="_blank">World Robot Olympiad 2024</a>'},
      {dot:'#00d4aa', html:'🤖 Team Coach — <a href="https://wro-association.org/" target="_blank">World Robot Olympiad 2025</a>'},
      {dot:'#00d4aa', html:'🔬 Team Coach — <a href="https://ifia.com/lebanon-nasr/" target="_blank">National Science Competition 2024</a>'},
      {dot:'#00d4aa', html:'⚙️ Team Coach — <a href="https://arclebanon.org/" target="_blank">Annual Robotics Competition — Lebanon</a>'},
      {dot:'#00d4aa', html:'🖥️ Member — <a href="https://scsl.org.lb/" target="_blank">Syndicate of Computer Sciences in Lebanon</a> (Beirut)'},
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
      var hrefMatch = it.html.match(/href="([^"]+)"/);
      if (hrefMatch) {
        row.style.cursor = 'pointer';
        row.classList.add('acc-item-link');
        (function(url) {
          row.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') window.open(url, '_blank', 'noopener,noreferrer');
          });
        })(hrefMatch[1]);
      }
      body.appendChild(row);
    });
  }
  document.getElementById('accModal').classList.add('open');
}
function closeAccModal() {
  document.getElementById('accModal').classList.remove('open');
}
