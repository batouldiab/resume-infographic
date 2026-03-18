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

// Detect Opus support once — serve .opus to modern browsers, .mp3 as fallback
var _supportsOpus = (function(){
  var a = document.createElement('audio');
  var t = a.canPlayType('audio/ogg; codecs=opus');
  return t === 'probably' || t === 'maybe';
})();
function _toOpus(src){ return _supportsOpus ? src.replace('.mp3','.opus') : src; }

_music.addEventListener('waiting', function() {
  if (_musicPlaying) document.getElementById('musicPlayBtn').textContent = '⏳';
});
_music.addEventListener('playing', function() {
  document.getElementById('musicPlayBtn').textContent = '⏸';
});

function _updateTrackButtons(src) {
  var isMed = src === 'media/meditation.mp3';
  document.getElementById('trackMeditate').classList.toggle('active', isMed);
  document.getElementById('trackVoice').classList.toggle('active', !isMed);
}
_updateTrackButtons(_activeTrack);

function switchTrack(src, label) {
  var wasPlaying = _musicPlaying;
  if (_musicPlaying) {
    _music.pause();
    document.getElementById('musicPlayBtn').textContent = '▶';
    _musicPlaying = false;
  }
  _activeTrack = src;
  _music.src = _toOpus(src);
  _updateTrackButtons(src);
  document.getElementById('waTime').textContent = '0:00';
  document.querySelectorAll('#waWaveform .wa-bar').forEach(function(b){ b.classList.remove('played'); });
  if (wasPlaying) toggleMusic();
}

function toggleMusic() {
  if (_musicPlaying) {
    _music.pause();
    document.getElementById('musicPlayBtn').textContent = '▶';
    _musicPlaying = false;
  } else {
    if (!_music.src || _music.src === window.location.href) {
      _music.src = _toOpus(_activeTrack);
    }
    var btn = document.getElementById('musicPlayBtn');
    btn.textContent = '⏳';
    _music.play().then(function(){
      btn.textContent = '⏸';
      _musicPlaying = true;
    }).catch(function(e){
      btn.textContent = '▶';
      console.warn('Music play failed:', e);
    });
  }
}

/* ── Waveform ── */
var _waveHeights = [4,7,11,15,8,19,13,21,17,10,22,18,14,20,16,9,19,14,11,17,12,21,8,15,10,14,7,12,5,9];
var _waWaveform = document.getElementById('waWaveform');
_waveHeights.forEach(function(h) {
  var bar = document.createElement('div');
  bar.className = 'wa-bar';
  bar.style.height = h + 'px';
  _waWaveform.appendChild(bar);
});

function _formatTime(s) {
  s = Math.floor(s || 0);
  return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
}

function _updateWaveform() {
  var bars = _waWaveform.querySelectorAll('.wa-bar');
  var ratio = _music.duration ? _music.currentTime / _music.duration : 0;
  var played = Math.floor(ratio * bars.length);
  bars.forEach(function(b, i) { b.classList.toggle('played', i < played); });
  document.getElementById('waTime').textContent = _music.duration
    ? _formatTime(_music.currentTime) + ' / ' + _formatTime(_music.duration)
    : _formatTime(_music.currentTime);
}

_music.addEventListener('timeupdate', _updateWaveform);
_music.addEventListener('loadedmetadata', _updateWaveform);

_waWaveform.addEventListener('click', function(e) {
  if (!_music.duration) return;
  var rect = _waWaveform.getBoundingClientRect();
  _music.currentTime = ((e.clientX - rect.left) / rect.width) * _music.duration;
});

/* ── Playback speed ── */
var _speeds = [1, 1.5, 2];
var _speedIdx = 0;
function cycleSpeed() {
  _speedIdx = (_speedIdx + 1) % _speeds.length;
  var s = _speeds[_speedIdx];
  _music.playbackRate = s;
  document.getElementById('musicSpeed').textContent = s + '\xd7';
}
