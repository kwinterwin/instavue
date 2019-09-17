<template>
  <div class="user-preview-image" :data-image-index="photoInfo.index">
    <img :src="serverURL + '/' + photoInfo.photo.path" />
    <i class="fa fa-times" @click="deletePhoto"></i>
  </div>
</template>

<script>
import { serverURL } from "../../config";

export default {
  name: "editUserPhotogalleryItem",
  props: {
    photoInfo: Object
  },
  data: function() {
    return {
      serverURL: serverURL
    };
  },
  methods:{
    deletePhoto:function(){
      // debugger
    }
  }
};
</script>