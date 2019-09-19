<template>
  <div class="message-box" :class="`${messageBoxProperties.type}-message`">{{messageBoxProperties.text}}</div>
</template>

<script>
export default {
  name: "messageBox",
  props: {
    messageBoxProperties:Object
  }
};
</script>