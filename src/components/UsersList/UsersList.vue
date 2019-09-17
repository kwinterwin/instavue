<template>
  <section class="users-list">
    <h2>List of users</h2>
    <UserListItem v-for="user in users" :key="user.id" :user="user" />
  </section>
</template>

<script>
import UserListItem from "./UserListItem";
import axios from "axios";
import {serverURL} from "../../config";

export default {
  name: "usersList",
  components: {
    UserListItem
  },
  data: function() {
    return {
      users: []
    };
  },
  beforeCreate: function() {
    axios
      .get(`${serverURL}/users`)
      .then(response => (this.users = response.data));
  }
};
</script>