<template>
<div id="app">
  <div class="header">
<!--    <router-link to="/">-->
<!--      <div class="logo">-->
<!--        <img src="/ordinary.png">-->
<!--      </div>-->
<!--    </router-link>-->
    <div class="date">
      <h1>Posting Website</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}



.date {
  margin-top: 5px;
}

.date h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}


body {
  font-family: "Roboto", Arial, sans-serif;
  min-height: 100vh;
  background-color: #101010;
  font-size: 16px;
  padding: 0px;
  margin: 0px;
}

.header {
  display: flex;
  padding: 10px 50px 0px 50px;
  background-color: green;
  color: #1C454F;
}

h1 {
  font-size: calc(2.8em + 2.6vw);
  font-weight: 700;
  letter-spacing: .01em;
  padding: 5rem 0 0 4.5rem;
  text-shadow: .022em .022em .022em #111;
  color: #fff;
}

p {
  font-size: calc(2em + .25vw);
  font-weight: 400;
  line-height: 2;
  margin-bottom: 1.5em;
  color: #fcfcfc;
}

</style>
