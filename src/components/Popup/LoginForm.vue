<template>
  <form class="login_form" role="login">
    <input type="email" name="email" placeholder="Email" required :key="'login_user_email'" />
    <input
      type="password"
      name="password"
      placeholder="Password"
      :key="'login_user_password'"
      required
    />
    <button type="submit" @click.prevent="userLogin">Enter</button>
  </form>
</template>

<script>
import axios from "axios";
import { serverURL } from "../../config";

export default {
  name: "LoginForm",
  methods: {
    userLogin: function() {
      const formData = {};
      Object.values(this.$el).forEach(obj => {
        if (obj.name) {
          formData[obj.name] = obj.value;
        }
      });
      axios
        .get(`${serverURL}/users/authorization`, { params: formData })
        .then(response => {
          if (response.data) {
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(response.data)
            );
            this.$store.commit("userSessionSetter", true);
          }
        });
    }
  }
};
</script>