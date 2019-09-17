<template>
  <div id="app" class="page">
    <Header />
    <article>
      <aside></aside>
      <main>
        <router-view></router-view>
      </main>
      <aside></aside>
    </article>
    <Footer />
    <!-- <PopupOverlay /> -->
  </div>
</template>

<script>
import Header from "./views/General/Header";
import Footer from "./views/General/Footer";
// import PopupOverlay from "./components/Popup/PopupOverlay";

export default {
  components: {
    Header,
    Footer,
    // PopupOverlay
  }
};
</script>