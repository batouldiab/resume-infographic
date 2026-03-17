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
// load default track
_music.src = _activeTrack;

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
  // highlight active button
  document.getElementById('trackMeditate').style.background = src === 'media/meditation.mp3' ? 'rgba(0,212,170,.2)' : 'none';
  document.getElementById('trackMeditate').style.color = src === 'media/meditation.mp3' ? 'var(--teal)' : '#4a6580';
  document.getElementById('trackMeditate').style.borderColor = src === 'media/meditation.mp3' ? 'rgba(0,212,170,.5)' : 'rgba(0,212,170,.2)';
  document.getElementById('trackVoice').style.background = src !== 'meditation.mp3' ? 'rgba(0,212,170,.2)' : 'none';
  document.getElementById('trackVoice').style.color = src !== 'meditation.mp3' ? 'var(--teal)' : '#4a6580';
  document.getElementById('trackVoice').style.borderColor = src !== 'meditation.mp3' ? 'rgba(0,212,170,.5)' : 'rgba(0,212,170,.2)';
  if (wasPlaying) toggleMusic();
}

function toggleMusic() {
  if (_musicPlaying) {
    _music.pause();
    document.getElementById('musicPlayBtn').textContent = '▶';
    document.getElementById('musicEq').classList.remove('active');
    _musicPlaying = false;
  } else {
    _music.volume = parseFloat(document.getElementById('musicVol').value);
    _music.play().then(function(){
      document.getElementById('musicPlayBtn').textContent = '⏸';
      document.getElementById('musicEq').classList.add('active');
      _musicPlaying = true;
    }).catch(function(e){
      console.warn('Music play failed:', e);
    });
  }
}

function setVolume(v) {
  _music.volume = parseFloat(v);
}
