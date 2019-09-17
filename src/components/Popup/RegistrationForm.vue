<template>
  <form class="registration_form hidden-block" role="registration">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <input
      type="password"
      name="confirm_password"
      id="confirm_password"
      placeholder="Confirm password"
      required
    />
    <button type="submit">Enter</button>
  </form>
</template>