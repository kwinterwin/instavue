<template>
  <div class="popup-overlay" >
      <!-- :class="{'hidden-overlay' : !isHidden}" -->
    <div class="popup">
      <div class="popup-header">
        <img src="../../assets/logo.png" alt="Logo" />
        <i class="fa fa-times" @click="closePopup"></i>
      </div>
      <div class="popup-body">
        <div class="login_tabbar">
          <div class="login_tabbar_item selected" role="login">Login</div>
          <div class="login_tabbar_item" role="registration">Registration</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "authorizationPopup",
//   data: function() {
//     return {
//       isHidden: true
//     };
//   },
  methods: {
    closePopup: function() {
    //   this.isHidden = true;
    }
  }
};
</script>