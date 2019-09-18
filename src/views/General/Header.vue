<template>
  <!-- <div> -->
    <header>
      <img src="../../assets/logo.png" alt="Logo" />
      <button
        class="authorization-button custom-button"
        role="login"
        @click="$emit('authorizationButtonClick')"
      >Login</button>
    </header>
</template>

<script>
export default {
  name: "headerVue",
  data: function() {
    return {
      isPopupHidden: true
    };
  }
};
</script>