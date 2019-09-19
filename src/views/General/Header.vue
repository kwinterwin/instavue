<template>
  <header>
    <img src="../../assets/logo.png" alt="Logo" />
    <button
      class="authorization-button custom-button"
      role="login"
      @click="$emit('authorizationButtonClick', userSession)"
    >{{buttonTabs[userSession]}}</button>
  </header>
</template>

<script>
export default {
  name: "headerVue",
  data: function() {
    return {
      buttonTabs: {
        true: "Logout",
        false: "Login"
      }
    };
  },
  computed:{
    userSession:function(){
      return this.$store.getters.userSession;
    }
  }
};
</script>