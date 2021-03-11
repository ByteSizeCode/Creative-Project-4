<template>
<div class="posting">
  <div class="footer">
    <router-link class="postingPageLink" to="/">Home</router-link>
    <br>
    <router-link class="postingPageLinkCurrent" to="/posting">Add a Post</router-link>
    <br>
    <router-link class="postingPageLink" to="/about">About</router-link>
  </div>

  <h4>Write a post!</h4>
  <div class="add">
    <div class="form">
      <p class = "date">{{date}}</p>
      <textarea class = "textbox" v-model="content">
        </textarea>
      <p></p>
      <button @click="post">Post</button>
    </div>
    <div class="hasPosted" v-if="addItem">


      <router-link to="/" style="height: 50%; margin: 0 auto;" class="doneMessage"> Done! Click here to go back</router-link>
    </div>
  </div>

</div>

</template>


<style scoped>

.date {
  margin-top:-60px;
}

.textbox {
  margin-top:-60px;
}

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

.add {
  display: flex;
}



.doneMessage:before {
  content:'\2713';
  display:inline-block;
  color:gray;
  padding:0 6px 0 0;
}
.doneMessage {
  color:gray;
}



/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

h4 {
  font-size: 65px;
  color: white;
  /*padding-left: 00px;*/
}

.hasPosted {
  margin-left: 100px;
}


/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.heading {
  background-color: white;
}

.edit {
  background-color: white;
}


</style>

<script>
import axios from 'axios';
export default {
  name: 'Posting',
  data() {
    return {
      date: new Date().toLocaleString(),
      content: "",
      // file: null,
      addItem: null,
      items: [],
      finddate: "",
      findItem: null,
      likeCount: 0,
      dislikeCount: 0,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.date.toLowerCase().startsWith(this.finddate.toLowerCase()));
      return items.sort((a, b) => a.date > b.date);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          date: this.findItem.date,
          content: this.findItem.content,
          likeCount: this.findItem.likeCount,
          dislikeCount: this.findItem.dislikeCount,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.finddate = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // fileChanged(event) {
    //   this.file = event.target.files[0]
    // },
    async post() {
      try {
        // const formData = new FormData();
        // formData.append('photo', this.file, this.file.name)
        // let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          date: this.date,
          content: this.content,
          likeCount: 0, //start likeCount at 0
          dislikeCount: 0, //start dislikeCount at 0
          // path: r1.data.path
        });
        this.addItem = r2.data;
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