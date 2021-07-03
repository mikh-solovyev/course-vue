<template lang="pug">
  .user-component
    .user
      avatar(:size="2.7" :src="userPic").user__avatar
      .user__name Соловьёв Михаил
</template>

<script>
  import avatar from "../avatar";
  export default {
    components: {
      avatar
    },
    computed: {
      userPic() {
        return require("../../../images/content/user.jpg").default;
      }
    }
  }
</script>

<style lang="postcss" scoped src="./user.pcss"></style>
