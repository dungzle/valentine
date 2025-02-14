<template>
  <v-container fluid  align="center">
    <div class="text-white my-6">
      <h1>WHO ARE YOU???</h1>
      <h2 class="my-2">You are accessing a top-secret website</h2>
      <h3>Please answer the question below to identify your identity.</h3>
    </div>
    <div class="text-white pt-6">
      <h1>Who is the most amazing girl in Canada?</h1>
      <v-text-field 
        v-model="userAnswer" 
        type="text" 
        maxlength="7"
        max-width="350"
        :hint="hint"
        :persistent-hint="hint != ''"
        class="custom-hint"
        @keydown="handleEvent"
      />

      <template v-if="showHeartEyes">
        <v-img
          :src="heartEyesGif"
          :width="80"
          class="mt-2"
        />
        <p class="mt-2">{{ feedbackMessage }}</p>
      </template>
      
    </div>
    <v-btn class="mt-4" @click="submit">{{showHeartEyes ? 'Try Again' : 'Submit'}}</v-btn>
  
  </v-container>
</template>

<script>
import heartEyesGif from '.././assets/smiling-heart-eyes.gif';

export default {
  emit: ['hasCorrectAnswer'],
  data() {
    return {
      heartEyesGif,
      // The correct answer
      correctAnswer: 'Luoguan Zhou',

      // User's answer input
      userAnswer: '____________',
      defaultAnswer: '____________',
      numberOfTrials: 0,

      // Feedback message
      feedbackMessage: '',
      showHeartEyes: false,

      maxLength: 12,
    };
  },
  computed: {
    // Placeholder with dashes
    isCorrectAnswer() {
      return this.userAnswer?.trim()?.toLowerCase() === this.correctAnswer?.toLowerCase();
    },
    hint() {
      switch (this.numberOfTrials) {
        case 0:
          return '';
        case 1:
          return 'Let’s start with a little hint... I bet you already know who she is. 💖';
        case 2:
          return 'You’re getting closer! She has the most beautiful smile, and it’s probably the first thing you notice about her 😊';
        case 3:
          return 'Here’s another one... When you think of kindness and beauty, you think of her 🥰';        
        case 4:
          return 'Okay, okay... here’s another: her name starts with "L" 😉';
        case 5:
          return 'Alright, ready for the final hint? Her name ends with "U", and she lights up every room she walks into ✨!';
        default:
          return 'The answer is "LUOGUAN ZHOU"... Yes, it’s YOU! Of course, who else could it be? ❤️';
      }
    },
  },
  methods: {
    submit() {
      this.numberOfTrials += 1;
      if (this.isCorrectAnswer) {
        this.showHeartEyes = false;
        this.$emit('hasCorrectAnswer');
      } else {
        this.feedbackMessage = 'Oops! That’s not it! Try again or Heart Eyes will come looking for you!'; // Reset feedback when not correct
        this.showHeartEyes = true;
        this.userAnswer = this.defaultAnswer;
      }
    },
    handleEvent(event) {
      event.preventDefault();
      this.showHeartEyes = false;
      if (event.key === 'Backspace') {
        this.handleBackspace();
      } else if (event.key.length === 1) { // character event
        const index = [...this.userAnswer].findIndex(char => char === '_');
        if (index !== -1) {
          this.userAnswer = this.userAnswer.slice(0, index) + event.key;
        }
      }
      this.refillHyphen();
    },
    handleBackspace() {
      // Remove last character that is not '-'
      const index = [...this.userAnswer].findLastIndex(char => char !== '_');
      if (index !== -1) {
        this.userAnswer = this.userAnswer.slice(0, index) + this.userAnswer.slice(index + 1);
      } else {
        this.userAnswer = this.defaultAnswer;
      }
    },
    refillHyphen() {
      if (this.maxLength <= this.userAnswer.length) return;
      this.userAnswer += '_'.repeat(this.maxLength - this.userAnswer.length);
    }

  },
};
</script>
<style scoped>
:deep(.v-field__input) {
  text-align: center;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
}

:deep(.v-messages__message) {
  font-size: 14px !important; /* Hint text size */
  opacity: 1 !important;      /* Remove transparency */
  font-weight: bold !important;
  color: white !important;
  padding-bottom: 8px;
  line-height: 1.3;
}
</style>
