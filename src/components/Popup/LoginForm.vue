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
    <MessageBoxes v-if="isShowMessageBox" :messageBoxProperties="messageBoxProperties" />
  </form>
</template>

<script>
import axios from "axios";
import { serverURL } from "../../config";
import { formMixin } from "../../mixins/formMixins";
import MessageBoxes from "../MessageBoxes";
import { messageBoxesMixins } from "../../mixins/messageBoxesMixin";

export default {
  name: "LoginForm",
  mixins: [formMixin, messageBoxesMixins],
  components: {
    MessageBoxes
  },
  methods: {
    userLogin: function() {
      const formData = this.getFormValues(this.$el);
      axios
        .get(`${serverURL}/users/authorization`, { params: formData })
        .then(response => {
          if (response.data) {
            window.sessionStorage.setItem(
              "user",
              JSON.stringify(response.data)
            );
            this.$store.commit("userSessionSetter", true);
            this.$emit("closePopup");
          }
        })
        .catch(err => {
          this.messageBoxPropertiesSetter(err.response.data);
        });
    }
  }
};
</script>