<template>
  <div>
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
              <input
                type="file"
                accept="image/*"
                :key="'avatar_file'"
                @change="$emit('avatarFileChange', $event.target.files[0])"
              />
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
      <input
        type="file"
        accept="image/*"
        role="photogallery"
        multiple
        :key="'photogallery'"
        @change="photogalleryInputChange"
      />
    </form>
    <section class="user-photogallery">
      <EditUserPhotogalleryItem
        v-for="(photo, index) in userPhotos"
        :key="index"
        :photo="photo"
        @deletePhoto="deletePhotoIntoPhotogallery"
      />
    </section>
  </div>
</template>

<script>
import { serverURL } from "../../config";
import EditUserPhotogalleryItem from "./EditUserPhotogalleryItem";
export default {
  name: "editUserForm",
  components: {
    EditUserPhotogalleryItem
  },
  data: function() {
    return {
      isAvatarOverlayHidden: true,
      lastMapKey: 0
    };
  },
  props: {
    user: Object,
    deletedMap: Map,
    userPhotos: Array,
    isPhotogalleryChanged: Boolean
  },
  computed: {
    userAvatar: function() {
      if (this.user.currentAvatar) {
        return this.user.currentAvatar;
      }
      return this.user.avatarFile
        ? serverURL + "/" + this.user.avatarFile
        : "https://i.stack.imgur.com/aLNNU.png";
    }
  },
  methods: {
    photogalleryInputChange: function(event) {
      const files = event.target.files;
      let lastIndex = 0;
      if (this.userPhotos.length) {
        lastIndex = this.userPhotos[this.userPhotos.length - 1].index + 1;
      }
      for (let i = 0; i < files.length; i++) {
        this.userPhotos.push({
          file: files[i],
          index: lastIndex,
          newImage: true
        });
        lastIndex++;
      }
      this.$parent.isPhotogalleryChanged = true;
    },
    deletePhotoIntoPhotogallery: function(element) {
      const imageIndex = Number(
        element.parentElement.getAttribute("data-image-index")
      );
      const arrayIndex = this.userPhotos.findIndex(element => {
        return element.index == imageIndex;
      });
      const imageObject = this.userPhotos[arrayIndex];
      if (!imageObject.hasOwnProperty("newImage")) {
        this.deletedMap.set(imageIndex, imageObject);
        this.userPhotos.splice(arrayIndex, 1);
      } else {
        this.userPhotos.splice(arrayIndex, 1);
      }
      this.$parent.isPhotogalleryChanged = true;
    }
  }
};
</script>