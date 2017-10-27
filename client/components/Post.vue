<template >
  <article class="post">
    <header class="post__header">
      <div class="post__container">
        <img class="post__image-profile" :src="profile_img" alt="">
        <div>
          <p class="post__name">{{username}}</p>
          <span class="post__time">24 min</span>
        </div>
      </div>
      <i class="icon-angle-down"></i>
    </header>
    <div class="post__image">
      <img src="http://lorempixel.com/1000/1200" alt="">
    </div>
    <footer class="post__footer">
      <div class="post__actions">
        <i class="post__icon icon-heart"></i>
        <i class="post__icon icon-bubble"></i>
      </div>
      <div class="post__commentsBox">
        <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
        <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
        <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>
        <p class="post__name">{{username}} <span class="post__span">Lorem ipsum dolor sit.</span></p>

      </div>
      <div class="post__send">
        <form class="post__sendForm">
          <input class="post__input" placeholder="Add a comment" type="text">
        </form>
      </div>
    </footer>
  </article>
</template>

<script>
  export default {
    props:['username','profile_img'],
    data(){
      return{

      }
    }
  }
</script>
