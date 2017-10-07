<template >
  <div v-if="isShow" class="flash flash--error">
    <div class="container">
      <p>
        {{message}}
      </p>
      <span @click.prevent="close()">&times;</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:['message','isError'],
    data(){
      return{
          isShow:this.isError || false
      }
    },
    methods:{
      close(){
        this.$emit('myEvent');
      }
    }
  }
</script>
