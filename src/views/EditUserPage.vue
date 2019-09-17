<template>
  <section class="users-editable-section">
    <router-link to="/">
      <h2>User information</h2>
    </router-link>
    <i class="fa fa-check" role="save" title="Save information" @click="saveUserInformation">Save</i>
    <EditUserForm :user="user" @avatarFileChange="avatarFileChange" />
    <section class="user-photogallery">
      <EditUserPhotogalleryItem
        v-for="(photo, index) in userPhotos"
        :key="index"
        :photoInfo="{photo:photo, index:index}"
      />
    </section>
  </section>
</template>

<script>
import EditUserForm from "../components/EditUser/EditUserForm";
import EditUserPhotogalleryItem from "../components/EditUser/EditUserPhotogalleryItem";
import axios from "axios";
import { serverURL } from "../config";
export default {
  name: "editUserPage",
  components: { EditUserForm, EditUserPhotogalleryItem },
  data: function() {
    return {
      userPhotos: [],
      user: {
        currentAvatar: null
      },
      userId: ""
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
        this.userPhotos = this.user.photos;
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
          debugger;
          this.putUserInformation();
        });
        isUserInformationChanged = true;
      }
      if (true) {
        //TODO: проверка на изменение фотографий
        // return;
      }
      if (!isUserInformationChanged) {
        this.putUserInformation();
      }
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