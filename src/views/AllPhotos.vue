<template>
  <section class="allPhotos">
    <router-link to="/">
      <h2>All Photos</h2>
    </router-link>
    <div class="photogallery">
      <AllPhotosItem v-for="photo in photos" :key="photo.id" :photo="photo" />
    </div>
  </section>
</template>

<script>
import AllPhotosItem from "../components/AllPhotosItem";
import axios from "axios";
import {serverURL} from "../config";

export default {
  name: "allPhotos",
  components: {
    AllPhotosItem
  },
  data: function() {
    return {
      photos: []
    };
  },
  beforeCreate: function() {
    axios
      .get(`${serverURL}/userimages`)
      .then(response => (this.photos = response.data));
  }
};
</script>