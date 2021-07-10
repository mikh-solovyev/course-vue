<template lang="pug">
  .header-component
    headline(title="Панель администрирования")
      user
    navigation
</template>

<script>
import headline from "../../components/headline";
import user from "../../components/user";
import navigation from "../../components/navigation";

export default {
  components: {
    headline, user, navigation
  }
}
</script>
