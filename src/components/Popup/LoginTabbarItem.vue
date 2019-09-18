<template>
  <div class="login_tabbar_item" @click="$emit('loginTabbarItemClick', title)">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>