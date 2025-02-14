<template>
  <v-app>
    <v-main :class="!submittedCorrectAnswer ? 'anonymous-background' : 'love-background'" @click="playAudio">
      <v-img
          v-if="submittedCorrectAnswer"
          :src="loveInTheAirImage"
          :width="80"
          class="ml-4 mt-1"
        />
      <div class="container">
        <audio id="audioElement" loop ref="audioPlayer">
          <source :src="backgroundMusic" type="audio/mp3">
        </audio>
        <WelcomePage v-if="!submittedCorrectAnswer" @has-correct-answer="submitCorrectAnswer"/>
        <v-dialog v-model="showPopup" max-width="400px" height="400">
          <v-card height="300" class="heart-background">
            <v-card-title>Oh... Hi, Ms. Angel!!</v-card-title>
            <v-card-text>
              <h3>
                Welcome to my little world... ✨
              </h3>
              <h3 class="my-4">
                Are you ready to discover the surprises I’ve prepared just for you? 💖  
              </h3>
              <p class="bottom-right box-shadow">Closing in: {{ countdown }} seconds</p>
            </v-card-text>
          </v-card>
        </v-dialog>
        <FinalPage  v-if="submittedCorrectAnswer && !showPopup"></FinalPage>
        <v-img
          v-if="submittedCorrectAnswer"
          :src="allYouNeedIsLoveImage"
          :width="80"
          class="bottom-right"
        />
    </div>    
    </v-main>
  </v-app>
</template>

<script>
import FinalPage from './components/FinalPage.vue'
import WelcomePage from './components/WelcomePage.vue'
import loveInTheAirImage from './assets/Love In The Air SVG Cut File.svg';
import allYouNeedIsLoveImage from './assets/All You Need Is Love SVG Cut File.svg';
import anonymousImage from './assets/All You Need Is Love SVG Cut File.svg';
import popupImage from './assets/popup-background.avif';
import darkMusic from './assets/dark-music.mp3';
import loveMusic from './assets/love-song.mp3';


export default {
  name: 'App',

  components: {
    FinalPage,
    WelcomePage,
  },

  data: () => ({
    num: 0,
    loveInTheAirImage,
    allYouNeedIsLoveImage,
    anonymousImage,
    darkMusic,
    loveMusic,
    popupImage,
    showPopup: false,
    countdown: 10,
    submittedCorrectAnswer: false,
    //
  }),

  computed: {
    backgroundMusic() {
      if (this.submittedCorrectAnswer && this.showPopup) return;
      return !this.submittedCorrectAnswer ? this.darkMusic : this.loveMusic
    }
  },

  watch: {
    backgroundMusic(newMusic) {
      this.changeBackgroundMusic(newMusic);
    },
    showPopup(newValue) {
      if (newValue) {
        // Start countdown when the popup is shown
        this.startCountdown();
      }
    }
  },

  methods: {
    submitCorrectAnswer() {
      this.submittedCorrectAnswer = true;
      this.showPopup = true;
    },
    playAudio() {
      document.getElementById('audioElement').play();
    },
    changeBackgroundMusic(musicFile) {
      // Manually update the audio element's src
      const audioElement = this.$refs.audioPlayer;
      const sourceElement = audioElement.querySelector('source');
      sourceElement.src = musicFile;

      // Reload the audio element
      audioElement.load(); // This reloads the audio source
      audioElement.play(); // Starts playing the new audio
    },
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(interval);
          this.showPopup = false;  // Close the popup after countdown reaches 0
        }
      }, 1000); // Update countdown every second
    }
  }
}
</script>
<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  
}

.box-shadow {
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}

.anonymous-background {
  height: 100%;
  background: url('@/assets/Heart-Eyes-CS.jpg') bottom/cover no-repeat;
  background-color: black;
}

.love-background {
  height: 100%;
  background: url('@/assets/bg1.webp') bottom/cover no-repeat;
}

.heart-background {
  background: url('@/assets/popup-background.avif') bottom/cover no-repeat;
}

/* Mobile styles */
@media (max-width: 768px) {
  .anonymous-background {
    background-size: contain;
  }
}


/* Container to cover the whole screen */
.container {
  display: flex;
  justify-content: center;  /* Horizontal centering */
  align-items: center;      /* Vertical centering */
  height: 80vh;            /* Full viewport height */
  margin: 0;                /* Remove default margin */
}
</style>