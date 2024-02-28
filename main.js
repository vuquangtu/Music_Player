const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $(".cd");
const audio = $("#audio");
const player = $(".player");
const heading = $("h2");
const cdThumb = $(".cd-thumb");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevSong = $(".btn-prev");
const progressElenemt = $(".progress");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const volume = $("#volume");

let isPlaying = false;
let isRandom = false;
let isRepeat = false;

const app = {
  currentIndex: 0,

  songs: [
    {
      name: "Two Flower",
      singer: "vanguard sound",
      path: "./music/song 1.mp3",
      image: "./img/ảnh 1.jpeg",
    },
    {
      name: "al higuchi",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./music/song 2.mp3",
      image: "./img/ảnh 2.jpeg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "./music/song 3.mp3",
      image: "./img/ảnh 3.jpeg",
    },
    {
      name: "still here",
      singer: "LOL",
      path: "./music/song 4.mp3",
      image: "./img/ảnh 4.jpeg",
    },
    {
      name: "Hiroyuki Sawano",
      singer: "vanguard sound",
      path: "./music/song 5.mp3",
      image: "./img/ảnh 5.jpeg",
    },
    {
      name: "Haiiro no Saga",
      singer: "ChouCho",
      path: "./music/song 6.mp3",
      image: "./img/ảnh 6.jpeg",
    },
    {
      name: "Two Flower",
      singer: "vanguard sound",
      path: "./music/song 1.mp3",
      image: "./img/ảnh 1.jpeg",
    },
    {
      name: "al higuchi",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./music/song 2.mp3",
      image: "./img/ảnh 2.jpeg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "./music/song 3.mp3",
      image: "./img/ảnh 3.jpeg",
    },
    {
      name: "still here",
      singer: "LOL",
      path: "./music/song 4.mp3",
      image: "./img/ảnh 4.jpeg",
    },
    {
      name: "Hiroyuki Sawano",
      singer: "vanguard sound",
      path: "./music/song 5.mp3",
      image: "./img/ảnh 5.jpeg",
    },
    {
      name: "Haiiro no Saga",
      singer: "ChouCho",
      path: "./music/song 6.mp3",
      image: "./img/ảnh 6.jpeg",
    },
    {
      name: "Two Flower",
      singer: "vanguard sound",
      path: "./music/song 1.mp3",
      image: "./img/ảnh 1.jpeg",
    },
    {
      name: "al higuchi",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./music/song 2.mp3",
      image: "./img/ảnh 2.jpeg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "./music/song 3.mp3",
      image: "./img/ảnh 3.jpeg",
    },
    {
      name: "still here",
      singer: "LOL",
      path: "./music/song 4.mp3",
      image: "./img/ảnh 4.jpeg",
    },
    {
      name: "Hiroyuki Sawano",
      singer: "vanguard sound",
      path: "./music/song 5.mp3",
      image: "./img/ảnh 5.jpeg",
    },
    {
      name: "Haiiro no Saga",
      singer: "ChouCho",
      path: "./music/song 6.mp3",
      image: "./img/ảnh 6.jpeg",
    },
    {
      name: "Two Flower",
      singer: "vanguard sound",
      path: "./music/song 1.mp3",
      image: "./img/ảnh 1.jpeg",
    },
    {
      name: "al higuchi",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "./music/song 2.mp3",
      image: "./img/ảnh 2.jpeg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "./music/song 3.mp3",
      image: "./img/ảnh 3.jpeg",
    },
    {
      name: "still here",
      singer: "LOL",
      path: "./music/song 4.mp3",
      image: "./img/ảnh 4.jpeg",
    },
    {
      name: "Hiroyuki Sawano",
      singer: "vanguard sound",
      path: "./music/song 5.mp3",
      image: "./img/ảnh 5.jpeg",
    },
    {
      name: "Haiiro no Saga",
      singer: "ChouCho",
      path: "./music/song 6.mp3",
      image: "./img/ảnh 6.jpeg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        this.currentIndex === index ? "active" : ""
      }" data-index = '${index}' >
               <div class="thumb" style='background-image: url("${
                 song.image
               }")'></div>
               <div class="body">
                   <h3 class='title'>${song.name}</h3>
                   <p class='author'>${song.singer}</p>
               </div>
               <div class="option">...</div>
        </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    let _this = this;
    const songs = $$(".song");

    // event khi scroll

    const cdWidth = $(".cd").offsetWidth;

    document.onscroll = function () {
      const scrollTop = window.scrollY;
      const newCdwidth = cdWidth - scrollTop;

      cd.style.width = newCdwidth > 0 ? newCdwidth + "px" : "0px";
      cd.style.opacity = newCdwidth / cdWidth;
    };

    // event khi ấn nút play
    playBtn.onclick = function () {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // khi bài đang được play

    audio.onplaying = function () {
      _this.scrollToActiveSong();
      cdThumbimage.play();
      isPlaying = true;
      player.classList.add("playing");
    };

    audio.onpause = function () {
      _this.scrollToActiveSong();
      cdThumbimage.pause();
      isPlaying = false;
      player.classList.remove("playing");
    };

    // Quay đĩa than
    const cdThumbimage = cdThumb.animate(
      { transform: "rotate(360deg)" },
      { duration: 10000, iterations: Infinity }
    );

    cdThumbimage.pause();

    //  khi next bài :

    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
    };

    //  khi prev bài :

    prevSong.onclick = function () {
      _this.prevSong();
      audio.play();
    };

    // khi thay đổi tiến trình bài hát và volume

    audio.ontimeupdate = function () {
      var progress = (audio.currentTime / audio.duration) * 100;
      progressElenemt.value = progress;

      volume.onchange = function () {
        audio.volume = volume.value / 100;
      };
    };

    progressElenemt.onchange = function () {
      audio.currentTime = (progressElenemt.value * audio.duration) / 100;
    };
    // khi kết thúc một bài
    audio.onended = function () {
      nextBtn.click();
    };

    // khi nhấn nút random
    randomBtn.onclick = function () {
      isRandom = !isRandom;
      randomBtn.classList.toggle("active", isRandom);
      if (isRepeat) {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle("active", isRepeat);
      }
    };

    // khi nhấn nút repeat

    repeatBtn.onclick = function () {
      isRepeat = !isRepeat;
      repeatBtn.classList.toggle("active", isRepeat);
      if (isRandom) {
        isRandom = !isRandom;
        randomBtn.classList.toggle("active", isRandom);
      }
    };

    // khi click vào bài hát
    playList.ondblclick = function (e) {
      const songActive = e.target.closest(".song");
      if (songActive) {
        if (
          _this.currentIndex == Number(songActive.getAttribute("data-index"))
        ) {
          playBtn.click();
        } else {
          _this.currentIndex = Number(songActive.getAttribute("data-index"));
          _this.loadCurrentsong();
          _this.render();
          audio.play();
        }
      }
    };
    playList.onclick = function (e) {
      if (e.target.closest(".option")) {
        console.log("opiton");
      }
    };
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
  },

  nextSong: function () {
    if (!isRandom) {
      if (isRepeat) {
        this.currentIndex = this.currentIndex;
      } else {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
          this.currentIndex = 0;
        }
      }
    } else {
      let oldCurrenIndex = this.currentIndex;
      do {
        this.currentIndex = Math.floor(Math.random() * this.songs.length);
      } while (this.currentIndex == oldCurrenIndex);
    }
    this.loadCurrentsong();
    this.render();
  },

  prevSong: function () {
    if (!isRandom) {
      if (isRepeat) {
        this.currentIndex = this.currentIndex;
      } else {
        this.currentIndex--;
        if (this.currentIndex < 0) {
          this.currentIndex = this.songs.length - 1;
        }
      }
    } else {
      let oldCurrenIndex = this.currentIndex;
      do {
        this.currentIndex = Math.floor(Math.random() * this.songs.length);
      } while (this.currentIndex == oldCurrenIndex);
    }
    this.loadCurrentsong();
    this.render();
  },

  loadCurrentsong: function () {
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    this.render();

    this.defineProperties();
    this.loadCurrentsong();
    this.handleEvent();
  },
};
app.start();
