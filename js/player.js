// Backdrop listeners (galleryModal and drawingsModal exist in DOM above this script)
document.getElementById('galleryModal').addEventListener('click',function(e){if(e.target===this)closeGallery();});
document.getElementById('drawingsModal').addEventListener('click',function(e){if(e.target===this)closeDrawingsGallery();});

// Section modal wiring
document.getElementById('btnVol').addEventListener('click', function() { openAccModal('vol'); });
document.getElementById('accModal').addEventListener('click', function(e) { if(e.target===this) closeAccModal(); });

// Global Escape key handler (accModal + net3dModal)
document.addEventListener('keydown', function(e) {
  if(e.key==='Escape' && document.getElementById('accModal').classList.contains('open')) closeAccModal();
  if(e.key==='Escape' && document.getElementById('net3dModal').classList.contains('open')) closeNet3d();
});

/* ── 3D Network modal ── */
var _net3dLoaded = false;
function openNet3d() {
  document.getElementById('net3dModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!_net3dLoaded) { _net3dLoaded = true; init3DScene(); }
  else if (window._n3dOnResize) window._n3dOnResize();
}
function closeNet3d() {
  document.getElementById('net3dModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('net3dModal').addEventListener('click', function(e) { if(e.target===this) closeNet3d(); });

/* ── Music Player ── */
var _music = document.getElementById('bgMusic');
var _musicPlaying = false;
var _activeTrack = 'media/meditation.mp3';
// src is intentionally NOT set here — load lazily on first play to avoid
// downloading 9 MB on page load. preload="none" in HTML is also required.

// Show ⏳ while the browser is buffering, restore ⏸ once playing resumes
_music.addEventListener('waiting', function() {
  if (_musicPlaying) document.getElementById('musicPlayBtn').textContent = '⏳';
});
_music.addEventListener('playing', function() {
  document.getElementById('musicPlayBtn').textContent = '⏸';
});

function _updateTrackButtons(src) {
  var isMed = src === 'media/meditation.mp3';
  document.getElementById('trackMeditate').style.background    = isMed  ? 'rgba(0,212,170,.2)' : 'none';
  document.getElementById('trackMeditate').style.color         = isMed  ? 'var(--teal)' : '#4a6580';
  document.getElementById('trackMeditate').style.borderColor   = isMed  ? 'rgba(0,212,170,.5)' : 'rgba(0,212,170,.2)';
  document.getElementById('trackVoice').style.background       = !isMed ? 'rgba(0,212,170,.2)' : 'none';
  document.getElementById('trackVoice').style.color            = !isMed ? 'var(--teal)' : '#4a6580';
  document.getElementById('trackVoice').style.borderColor      = !isMed ? 'rgba(0,212,170,.5)' : 'rgba(0,212,170,.2)';
}

function switchTrack(src, label) {
  var wasPlaying = _musicPlaying;
  if (_musicPlaying) {
    _music.pause();
    document.getElementById('musicPlayBtn').textContent = '▶';
    document.getElementById('musicEq').classList.remove('active');
    _musicPlaying = false;
  }
  _activeTrack = src;
  _music.src = src;
  _updateTrackButtons(src);
  if (wasPlaying) toggleMusic();
}

function toggleMusic() {
  if (_musicPlaying) {
    _music.pause();
    document.getElementById('musicPlayBtn').textContent = '▶';
    document.getElementById('musicEq').classList.remove('active');
    _musicPlaying = false;
  } else {
    // Lazy-load: set src only on first play (avoids page-load network fetch)
    if (!_music.src || _music.src === window.location.href) {
      _music.src = _activeTrack;
    }
    var btn = document.getElementById('musicPlayBtn');
    btn.textContent = '⏳';
    _music.volume = parseFloat(document.getElementById('musicVol').value);
    _music.play().then(function(){
      btn.textContent = '⏸';
      document.getElementById('musicEq').classList.add('active');
      _musicPlaying = true;
    }).catch(function(e){
      btn.textContent = '▶';
      console.warn('Music play failed:', e);
    });
  }
}

function setVolume(v) {
  _music.volume = parseFloat(v);
}
