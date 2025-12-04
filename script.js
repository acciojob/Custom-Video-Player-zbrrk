// Select Elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeControl = document.querySelector('input[name="volume"]');
const speedControl = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

// ---- Functions ----

// Toggle play & pause
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

// Update play/pause button when video state changes
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar width
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Scrub (seek) when clicking progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip forward/backward
function skip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime = Math.min(Math.max(0, video.currentTime + skipValue), video.duration);
}

// Set volume and playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Graceful load error handling
video.addEventListener('error', function () {
  document.querySelector('.player').innerHTML = "<p style='color:red;'>Video failed to load.</p>";
});

// ---- Event Listeners ----
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);

skipButtons.forEach(button => button.addEventListener('click', skip));

volumeControl.addEventListener('input', handleRangeUpdate);
speedControl.addEventListener('input', handleRangeUpdate);
