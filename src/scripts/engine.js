const keys = document.querySelectorAll(".piano__key, .piano__animal");
const volumeSlider = document.getElementById('volume');
const showKeysCheckbox = document.getElementById('showKeys');
const audioElements = {};

keys.forEach((key) => {
  const audio = new Audio();
  audio.src = `src/tunes/${key.dataset.key}.wav`;
  audioElements[key.dataset.key] = audio;

  key.addEventListener("click", () => {
    const audio = audioElements[key.dataset.key];
    audio.currentTime = 0;
    audio.play();
    key.classList.add("active");
    setTimeout(() => {
      key.classList.remove("active");
    }, 150);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const isKeyFound = Array.from(keys).some((el) => el.dataset.key === key);
  if (isKeyFound) {
    const audio = audioElements[key];
    audio.currentTime = 0;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
      clickedKey.classList.remove("active");
    }, 150);
  }
});

const handleVolume = (e) => {
  Object.values(audioElements).forEach(audio => {
    audio.volume = e.target.value;
  });
};

volumeSlider.addEventListener("input", handleVolume);

const toggleKeyDisplay = () => {
  const pianoKeyLabels = document.querySelectorAll('.piano__key span');
  pianoKeyLabels.forEach(label => {
    label.style.display = showKeysCheckbox.checked ? 'block' : 'none';
  });
};

showKeysCheckbox.addEventListener('change', toggleKeyDisplay);
