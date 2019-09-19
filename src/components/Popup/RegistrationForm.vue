<template>
  <form class="registration_form" role="registration">
    <input type="email" name="email" placeholder="Email" :key="'reg_user_email'" required />
    <input
      type="password"
      name="password"
      placeholder="Password"
      :key="'reg_user_password'"
      required
    />
    <input
      type="password"
      name="confirm_password"
      id="confirm_password"
      placeholder="Confirm password"
      required
      :key="'reg_user_confirm_password'"
    />
    <button type="submit" @click.prevent="userRegistration">Enter</button>
    <MessageBoxes v-if="isShowMessageBox" :messageBoxProperties="messageBoxProperties" />
  </form>
</template>

<script>
import axios from "axios";
import { serverURL, messagesText } from "../../config";
import { formMixin } from "../../mixins/formMixins";
import MessageBoxes from "../MessageBoxes";
import { messageBoxesMixins } from "../../mixins/messageBoxesMixin";

export default {
  name: "RegistrationForm",
  mixins: [formMixin, messageBoxesMixins],
  components: {
    MessageBoxes
  },
  methods: {
    userRegistration: function() {
      const formData = this.getFormValues(this.$el);
      if (formData.confirm_password === formData.password) {
        axios
          .post(`${serverURL}/users`, formData)
          .then(response => {
            if (response.data && response.data.type === "success") {
              this.$store.dispatch("usersSetter");
              this.$emit("closePopup");
              this.messageBoxPropertiesSetter(response.data);
            }
          })
          .catch(err => {
            this.messageBoxPropertiesSetter(err.response.data);
          });
      }
      else {
        this.messageBoxPropertiesSetter(messagesText.incorrectConfirmMessage);
      }
    }
  }
};
</script>