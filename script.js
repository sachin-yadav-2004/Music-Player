// ================= ELEMENTS =================
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.querySelector(".controls button:nth-child(1)");
const nextBtn = document.querySelector(".controls button:nth-child(3)");
const seekBar = document.querySelector(".seekbar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songTitle = document.querySelector(".song-title");
const songMeta = document.querySelector(".song-meta");
const coverImage = document.getElementById("coverImage");

const playlistElements = document.querySelector(".playlist-container .elements");
const searchInput = document.querySelector(".search-song input");

// ================= SONG DATA =================
const songs = [
  {
    title: "Bliss",
    artist: "Luke Bergs",
    src: "songs/Luke-Bergs-Bliss(chosic.com).mp3"
  },
  {
    title: "High Vibration",
    artist: "Luke Bergs",
    src: "songs/Luke-Bergs-High-Vibration(chosic.com).mp3"
  },
  {
    title: "Samurai Sake Showdown",
    artist: "Chosic",
    src: "songs/Samurai-Sake-Showdown(chosic.com).mp3"
  },
  {
    title: "Swing Machine",
    artist: "Chosic",
    src: "songs/Swing-Machine-chosic.com_.mp3"
  }
];

let currentSongIndex = 0;
let isPlaying = false;


// ================= LOAD SONG =================
function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  songMeta.textContent = song.artist;
  audio.src = song.src;
  coverImage.src = "images/disk.png";
}



// ================= PLAY / PAUSE =================
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
}


// ================= NEXT / PREV =================
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸";
  isPlaying = true;
}

function prevSong() {
  currentSongIndex =
    (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseBtn.textContent = "⏸";
  isPlaying = true;
}

// ================= TIME FORMAT =================
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// ================= PROGRESS =================
audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration || 0);
});

seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

// ================= PLAYLIST RENDER =================
function renderPlaylist(filteredSongs = songs) {
  playlistElements.innerHTML = "";

  if (filteredSongs.length === 0) {
    playlistElements.innerHTML = `<p style="color:#999">No songs found</p>`;
    return;
  }

  filteredSongs.forEach((song) => {
    const index = songs.indexOf(song);

    const div = document.createElement("div");
    div.className = "playlist-item flex";
    div.innerHTML = `
      <span><img class="invert" width="30px" src="images/music logo.png" alt="">${song.title} – ${song.artist}   <button class="play-btn-list flex">▶</button></span>
   
    `;

    div.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(index);
      audio.play();
      playPauseBtn.textContent = "⏸";
      isPlaying = true;
    });

    playlistElements.appendChild(div);
  });
}



// ================= SEARCH =================
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );

  renderPlaylist(filtered);
});

// ================= EVENTS =================
playPauseBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// ================= INIT =================
loadSong(currentSongIndex);
renderPlaylist();




// ================= VOLUME ICON & MUTE CONTROL ================= 

const volumeBtn = document.querySelector(".volumeBTN");
const volumeSlider = document.querySelector(".volumebar input");
volumeSlider.style.background = `
  linear-gradient(
    to right,
    #4f46e5 0%,
    #4f46e5 ${volumeSlider.value}%,
    #ffffff ${volumeSlider.value}%,
    #ffffff 100%
  )
`;

// SVG icons
const volumeOnIcon = `
<svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>
`;

const muteIcon = `
<svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>
`;

// Default icon
volumeBtn.innerHTML = volumeOnIcon;

// Toggle mute on icon click
volumeBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  volumeBtn.innerHTML = audio.muted ? muteIcon : volumeOnIcon;
});

// Volume slider control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;

  if (audio.volume === 0) {
    audio.muted = true;
    volumeBtn.innerHTML = muteIcon;
  } else {
    audio.muted = false;
    volumeBtn.innerHTML = volumeOnIcon;
  }
});

