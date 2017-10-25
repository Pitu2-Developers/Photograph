<template >
  <div v-if="condition" class="modal">
    <ModalContainer>
      <slot></slot>
    </ModalContainer>
  </div>
</template>

<script>
  import ModalContainer from './ModalContainer.vue';

  export default {
      props:['condition'],
      components:{ModalContainer},
      data(){
        return{
          show:this.condition
        }
      }
  }
</script>
