<template>
  <div>
    <img :src="serverURL + '/' + photo.path" />
    <p>{{photo.user_id.email}}</p>
  </div>
</template>

<script>
import { serverURL } from "../config";
export default {
  name: "allPhotosItem",
  props: {
    photo: Object
  },
  data:function(){
    return {
      serverURL : serverURL
    }
  }
};
</script>