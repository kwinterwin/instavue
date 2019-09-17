<template>
  <div class="list-item">
    <div class="avatar">
      <img :src="userAvatar" />
    </div>
    <div class="user-information">
      <p>{{user.email || "unknown@mail.ru"}}</p>
      <p>{{user.real_name || "Unknown"}} - {{user.date_of_birth || "00.00.0000"}}</p>
    </div>
    <div class="user-edit-button">
      <router-link :to="`/editUser/${this.user.id}`">
        <button class="custom-button">
          <span>Change information</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {serverURL} from "../../config";
export default {
  name: "UserListItem",
  props: {
    user: Object
  },
  computed: {
    userAvatar: function() {
      return this.user.avatarFile
        ? `${serverURL}/${this.user.avatarFile}`
        : "https://i.stack.imgur.com/aLNNU.png";
    }
  }
};
</script>