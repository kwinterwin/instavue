<template>
  <div id="app" class="page">
    <Header @authorizationButtonClick="authorizationButtonClick" />
    <article>
      <aside></aside>
      <main>
        <router-view></router-view>
      </main>
      <aside></aside>
    </article>
    <Footer />
    <PopupOverlay :isHidden="isHidden" @closePopup="closePopup" />
  </div>
</template>

<script>
import Header from "./views/General/Header";
import Footer from "./views/General/Footer";
import PopupOverlay from "./components/Popup/PopupOverlay";

export default {
  components: {
    Header,
    Footer,
    PopupOverlay
  },
  data: function() {
    return {
      isHidden: true
    };
  },
  methods: {
    authorizationButtonClick: function() {
      this.isHidden = false;
    },
    closePopup: function() {
      this.isHidden = true;
    }
  }
};
</script>