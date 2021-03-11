<template>
<div>
  <div class="footer">
    <router-link class="postingPageLink" to="/">Home</router-link>
    <br>
    <router-link class="postingPageLink" to="/posting">Add a Post</router-link>
    <br>
    <router-link class="postingPageLinkCurrent" to="/about">About</router-link>
  </div>

  <h1>About Posting Site</h1>
  <p>This site allows you to post your thoughts to the world!</p>
</div>
</template>

<script>
export default {
name: "About.vue"
}
</script>

<style scoped>

.postingPageLink {
  font-size: 14px;
  margin-left: -70px;
}

.postingPageLinkCurrent {
  font-size: 14px;
  margin-left: -70px;
  font-weight: bold;
  color:grey;
}

h1 {
  font-size: 64px;
  margin-left: -67px;
}

</style>