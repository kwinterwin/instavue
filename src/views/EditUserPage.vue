<template>
  <section class="users-editable-section">
    <router-link to="/">
      <h2>User information</h2>
    </router-link>
    <i class="fa fa-check" role="save" title="Save information">Save</i>
    <EditUserForm :user="user" />
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
      user: {},
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
        this.user = response.data;
        this.userPhotos = this.user.photos;
      });
    }
  }
};
</script>