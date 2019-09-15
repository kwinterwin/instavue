<template>
  <div id="app" class="page">
    <header>
      <img src="" alt="Logo" />
      <button class="authorization-button custom-button" role="login">Login</button>
    </header>
    <article>
      <aside></aside>
      <main>
        <router-view></router-view>
      </main>
      <aside></aside>
    </article>
    <footer>
      <router-link to="/about">About us</router-link>
      <router-link to="/allPhotos">All photos</router-link>
      <a>Information</a>
      <a>Companies</a>
    </footer>
  </div>
</template>