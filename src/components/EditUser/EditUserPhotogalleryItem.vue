<template>
  <div class="user-preview-image" :data-image-index="photo.index">
    <img :src="imageUrl" />
    <i class="fa fa-times" @click="$emit('deletePhoto', $event.target)"></i>
  </div>
</template>

<script>
import { serverURL } from "../../config";

export default {
  name: "editUserPhotogalleryItem",
  props: {
    photo: Object
  },
  data: function() {
    return {
      serverURL: serverURL
    };
  },
  computed: {
    imageUrl: function() {
      let url = "";
      if (this.photo.newImage) {
        url = window.URL.createObjectURL(this.photo.file);
      } else url = serverURL + "/" + this.photo.path;
      return url;
    }
  }
};
</script>