<template>
  <section class="users-list">
    <h2>List of users</h2>
    <UserListItem v-for="user in users" :key="user.id" :user="user" />
  </section>
</template>

<script>
import UserListItem from "./UserListItem";

export default {
  name: "usersList",
  components: {
    UserListItem
  },
  beforeCreate: function() {
    this.$store.dispatch("usersSetter");
  },
  computed: {
    users: function() {
      return this.$store.getters.users;
    }
  }
};
</script>