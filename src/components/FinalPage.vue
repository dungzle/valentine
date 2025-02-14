<template>
  <v-container fluid  align="center">
    <div class="my-6">
      <h1>Hi Ms. Claudia Zhou</h1>
      <h2>How was your day?</h2>
      <h3 class="my-12">I know this gift is not 5w cash, but I hope it can still make you smile</h3>
      <div class="my-12">
        <h1>HAPPY VALENTINE's DAY!!</h1>
        <h1>🌹🌹🌹</h1>
      </div>
      <h3>There’s something else I’d like to share with you. Click the button below to find out.</h3>
      <v-btn class="mt-8" color="primary" @click="click">Click here please!!!</v-btn>

      <v-dialog v-model="showPopup" max-width="400px" height="300" persistent>
        <v-card>
          <v-card-text class="px-4 py-4">
            <template v-if="!isYesClicked">
              <h1 align="center">Would you be my Valentine?</h1>
              <v-row justify="space-around" class="mt-8" no-gutters>
                <v-col cols="6" class="d-flex justify-center"> 
                  <v-btn 
                    :style="{ transform: yesSize }" 
                    color="success" 
                    @click="chooseYes"
                  >
                    Yes
                  </v-btn>
                </v-col>
                <v-col cols="6" class="d-flex justify-center"> 
                  <v-btn 
                    :style="{ transform: noSize }" 
                    color="error" 
                    @click="chooseNo"
                  >
                    No
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="noTextMessage" justify="space-around" class="mt-8" no-gutters>
                <v-col cols="6" class="d-flex justify-center"> 
                </v-col>
                <v-col cols="6" class="d-flex justify-center"> 
                  <div>{{ noTextMessage }}</div>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <h2>Great choice! 😊</h2>
              <h3 class="mt-12">By the way, there’s a little surprise waiting for you at your door. Could you go out and get it? 💕</h3>
            </template>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      showPopup: false,
      yesScale: 1,
      noScale: 1,
      numberOfTrials: 0,
      isYesClicked: false,
    };
  },
  computed: {
    yesSize(){
      return `scale(${this.yesScale})`
    },
    noSize(){
      return `scale(${this.noScale})`
    },
    noTextMessage() {
      switch (this.numberOfTrials) {
        case 0:
          return '';
        case 1:
          return 'Oh no.... 😟';
        case 2:
          return 'Are you sure?? 🤔';
        case 3:
          return 'What can make you change your mind? 🥺';
        case 4:
          return 'Come on... please? 🥹';
        default:
          return 'I guess you have no other choice now... 😈';
      }
    },
    
  },
  methods: {
    click() {
      this.showPopup = true;
    },
    chooseYes() {
      this.isYesClicked = true;
    },
    chooseNo() {
      this.yesScale += 0.2;
      this.noScale -= 0.2;
      this.numberOfTrials += 1;
    },
  },
};
</script>

<style scoped>

</style>
