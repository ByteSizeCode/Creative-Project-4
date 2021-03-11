<template>
  <div class="home">
    <div class="footer">
      <router-link class="postingPageLinkCurrent" to="/">Home</router-link>
      <br>
      <router-link class="postingPageLink" to="/posting">Add a Post</router-link>
      <br>
      <router-link class="postingPageLink" to="/about">About</router-link>
      <br>
    </div>
<!--    <section class="footer">-->
    <div v-if="items.length === 0">
      <br>
      <br>
      <p class="noPostsMessage">No posts here! Add some at "Add a Post" above.</p>
    </div>
<!--    </section>-->

    <section class="posts">

      <div class="image" v-for="item in items" :key="item.id">


        <div class="fancy-box">
<!--          <p class="fancy-heading">AnonymousPost</p>-->
          <p class="fancy-heading">{{item.content}}</p>
          <p class="fancy-subheading-super-mini">-Posted {{item.date}}</p>
          <p class="fancy-subheading-mini">Likes: {{item.likeCount}}</p>
          <p class="fancy-subheading-mini">Dislikes: {{item.dislikeCount}}</p>
          <button class="button2" @click="increaseLikeCount(item)">Like</button>
          <button class="button2" @click="increaseDislikeCount(item)">Dislike</button>
          <button class="fancy-button" @click="deletePost(item)">Delete Post</button>
          <button class="fancy-button" @click="showEditField = !showEditField">Edit</button>


          <div class="field">
            <a class="sns-btn sns-btn--twitter">
              <i class="sns-btn__icon fab fa-twitter"></i>
            </a>
            <a class="sns-btn sns-btn--facebook">
              <i class="sns-btn__icon fab fa-facebook-f"></i>
            </a>
            <a class="sns-btn sns-btn--instagram">
              <i class="sns-btn__icon fab fa-instagram"></i>
            </a>
          </div>


        </div>

        <div v-if="showEditField === true">
<!--          <div v-if="showEditField === true">-->

            <textarea v-model="item.content">
            </textarea>
            <button @click="editPost(item)">Save Edits</button>

<!--          </div>-->
        </div>

<!--        <section class="box">-->
<!--        <h2>{{item.date}}</h2>-->
<!--        </section>-->
<!--&lt;!&ndash;        <img :src="item.path" />&ndash;&gt;-->
<!--        <section class="box">-->
<!--        <h3>{{item.content}}</h3>-->

<!--        <h5>Likes: {{item.likeCount}}</h5>-->
<!--        <h5>Dislikes: {{item.dislikeCount}}</h5>-->
<!--        </section>-->
<!--        <div id="vue-counter">-->
<!--          <button @click="increaseLikeCount(item)">Increase Like Count</button>-->
<!--          <button @click="increaseDislikeCount(item)">Increase Dislike Count</button>-->
<!--&lt;!&ndash;          <button type="button" v-on:click="increaseCount(item)">Increase By 1</button> <button type="button" v-on:click="decrease">Decrease By 1</button> <button type="button" v-on:click="reset">Reset Counter</button>&ndash;&gt;-->
<!--        </div>-->

      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      items: [],
      showEditField: false,
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async editPost(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          date: item.date,
          content: item.content,
          likeCount: item.likeCount,
          dislikeCount: item.dislikeCount,
        });
        this.findItem = null;
        this.getItems();
        this.showEditField = !this.showEditField //Make edit field disappear
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async increaseLikeCount(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          date: item.date,
          content: item.content,
          likeCount: item.likeCount + 1,
          dislikeCount: item.dislikeCount,
        });
        this.item = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async increaseDislikeCount(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          date: item.date,
          content: item.content,
          likeCount: item.likeCount,
          dislikeCount: item.dislikeCount + 1,
        });
        this.item = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
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

p {
margin-top: -20px;
}

.image h2 {
  font-style: italic;
}

.image h3 {
  font-size: 15px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.posts {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

.posts {
  box-shadow: -10px -10px 30px 4px rgba(0,0,0,0.1),
  10px 10px 30px 4px rgba(45,78,255,0.15);
}

.box {
  border: 1px solid green ;
}



.fancy-box {
  background: #666;
  color: #fff;
  text-align: center;
  border: 5px solid #444;
  border-radius: 5px;
  padding: 10px;
  margin: 1em 0;
}
.fancy-box .fancy-heading {
  font-family: Arial;
  font-size: 32px;
  color: white;
  margin-bottom: 10px;
  font-style: italic;
  /*font-style: oblique;*/
  overflow-wrap: break-word;
}

.fancy-box .fancy-subheading {
  font-family: Arial;
  font-size: 20px;
}

.fancy-box .fancy-subheading-mini {
  font-family: Arial;
  font-size: 15px;
  margin-top: -24px;
}

.fancy-box .fancy-subheading-super-mini {
  font-family: Arial;
  font-size: 12px;
}

.fancy-box .fancy-button {
  background: #fff;
  color: #666;
  padding: 1.5em;
}

.button2 {
  background-color: black;
  color: #fff;
  /*border-radius: 0px;*/
  /*box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);*/

  padding: 0.25em 0.75em;
  min-width: 10ch;
  min-height: 44px;
}


/*.fancy-box :hover {*/
/*   transform: scale(1.01);*/
/*   box-shadow: none;*/
/* }*/



.noPostsMessage {
  box-shadow: -10px -10px 30px 4px rgba(0,0,0,0.1),
  10px 10px 30px 4px rgba(45,78,255,0.15);
  color: gray;
  background-color: white;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .posts {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .posts {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .posts {
    column-count: 2;
  }
}
</style>
