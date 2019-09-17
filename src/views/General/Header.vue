<template>
  <!-- <div> -->
    <header>
      <img src="../../assets/logo.png" alt="Logo" />
      <button
        class="authorization-button custom-button"
        role="login"
        @click="authorizationButtonClick"
      >Login</button>
    </header>
    <!-- <PopupOverlay v-if="!isPopupHidden" /> -->
  <!-- </div> -->
</template>

<script>
// import PopupOverlay from "../../components/Popup/PopupOverlay";

export default {
  name: "headerVue",
  methods: {
    authorizationButtonClick: function() {
      this.isPopupHidden = false;
    }
  },
  components: {
    // PopupOverlay
  },
  data: function() {
    return {
      isPopupHidden: true
    };
  }
};
</script>