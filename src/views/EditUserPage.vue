<template>
  <section class="users-editable-section">
    <router-link to="/">
      <h2>User information</h2>
    </router-link>
    <i class="fa fa-check" role="save" title="Save information" @click="saveUserInformation">Save</i>
    <EditUserForm
      :user="user"
      @avatarFileChange="avatarFileChange"
      :deletedMap="deletedMap"
      :userPhotos="user.photos"
      :isPhotogalleryChanged="isPhotogalleryChanged"
    />
  </section>
</template>

<script>
import EditUserForm from "../components/EditUser/EditUserForm";
import axios from "axios";
import { serverURL } from "../config";

export default {
  name: "editUserPage",
  components: { EditUserForm },
  data: function() {
    return {
      user: {
        currentAvatar: null
      },
      userId: "",
      deletedMap: new Map(),
      isPhotogalleryChanged: false
    };
  },
  created: function() {
    this.userId = this.$route.params.id;
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      axios.get(`${serverURL}/users/${this.userId}`).then(response => {
        this.user = Object.assign({}, response.data, this.user);
        this.user.photos.forEach((photo, index) => {
          photo.index = index;
        });
      });
    },
    saveUserInformation: function() {
      let formData,
        isUserInformationChanged = false;
      if (this.user.currentAvatar) {
        formData = new FormData();
        formData.append("file", this.user.avatarFile);
        this.user.currentAvatar = null;
        this.user.avatarFile = null;
        axios.post(`${serverURL}/avatarImg`, formData).then(response => {
          this.user.avatarFile = response.data.filename;
          this.putUserInformation();
        });
        isUserInformationChanged = true;
      }
      if (this.isPhotogalleryChanged) {
        const images = new FormData();
        for (let i = 0; i < this.user.photos.length; ) {
          const item = this.user.photos[i];
          if (item.file && item.hasOwnProperty("newImage")) {
            this.user.photos.splice(i, 1);
            images.append("img", item.file);
          } else i++;
        }
        this.deletedMap.forEach(item => {
          images.append("deletedImages", item._id);
        });
        images.append("user_id", this.userId);
        axios.post(`${serverURL}/userimages`, images).then(files => {
          if (files.data && files.data.length) {
            files.data.forEach(file => {
              this.user.photos.push(file);
            });
          }
          this.putUserInformation();
        });
        isUserInformationChanged = true;
      }
      if (!isUserInformationChanged) {
        this.putUserInformation();
      }
      this.$router.push({ path: "/" });
    },
    avatarFileChange: function(file) {
      this.user.currentAvatar = window.URL.createObjectURL(file);
      this.user.avatarFile = file;
    },
    putUserInformation: function() {
      axios
        .put(`${serverURL}/users/${this.userId}`, this.user)
        .then(response => {
          this.user = response.data;
        });
    }
  }
};
</script>