<template>
  <div class="popup-overlay" :class="{'hidden-overlay' : isHidden}">
    <div class="popup">
      <div class="popup-header">
        <img src="../../assets/logo.png" alt="Logo" />
        <i class="fa fa-times" @click="$emit('closePopup')"></i>
      </div>
      <div class="popup-body">
        <div class="login_tabbar">
          <LoginTabbarItem
            v-for="item in tabs"
            :key="item.title"
            :title="item.title"
            @loginTabbarItemClick="loginTabbarItemClick"
            :class="{selected: currentTab == item.title}"
          />
        </div>
        <component v-bind:is="currentTabComponent" class="tab" @closePopup="$emit('closePopup')"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import LoginTabbarItem from "./LoginTabbarItem";

export default {
  name: "authorizationPopup",
  props: {
    isHidden: Boolean
  },
  components: {
    RegistrationForm,
    LoginForm,
    LoginTabbarItem
  },
  data: function() {
    return {
      currentTab: "Login",
      tabs: {
        Login: { title: "Login", component: LoginForm },
        Registration: {
          title: "Registration",
          component: RegistrationForm
        }
      }
    };
  },
  methods: {
    loginTabbarItemClick: function(title) {
      this.currentTab = title;
    }
  },
  computed: {
    currentTabComponent: function() {
      return this.tabs[this.currentTab].component;
    }
  }
};
</script>