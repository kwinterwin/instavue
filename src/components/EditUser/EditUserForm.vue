<template>
  <form class="users-editable-form">
    <div
      class="avatar-block"
      @mouseover="isAvatarOverlayHidden = false"
      @mouseout="isAvatarOverlayHidden = true"
    >
      <div class="avatar">
        <img :src="userAvatar" />
      </div>
      <div class="avatar-overlay" :class="{'hidden-block': isAvatarOverlayHidden}">
        <div class="form-group">
          <label class="label">
            <i class="fa fa-camera"></i>
            <span class="title">Change avatar</span>
            <input type="file" accept="image/*" :key="'avatar_file'" />
          </label>
        </div>
      </div>
    </div>
    <label for="real_name">Real name</label>
    <input
      type="text"
      name="real_name"
      v-model="user.real_name"
      id="real_name"
      placeholder="Enter your real name"
      autocomplete="off"
      :key="'real_name'"
    />
    <label for="date_of_birth">Date of birth</label>
    <input
      type="date"
      name="date_of_birth"
      id="date_of_birth"
      autocomplete="off"
      :key="'date_of_birth'"
      v-model="user.date_of_birth"
    />
    <input type="file" accept="image/*" role="photogallery" multiple :key="'photogallery'" />
  </form>
</template>

<script>
import { serverURL } from "../../config";
export default {
  name: "editUserForm",
  data: function() {
    return {
      isAvatarOverlayHidden: true
    };
  },
  props: {
    user: Object
  },
  computed: {
    userAvatar: function() {
      return this.user.avatarFile
        ? serverURL + "/" + this.user.avatarFile
        : "https://i.stack.imgur.com/aLNNU.png";
    }
  }
};
</script>