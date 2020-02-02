<template lang="pug">
  .container
    .single-post(v-if="post")
      h1 {{post.title.rendered}}
      .post-content(v-html="post.content.rendered")
</template>
<script>
export default {
  data() {
    return {
      post: ''
    }
  },

  mounted() {
    this.$http.get('eventos?_embed&slug=' + this.$route.params.post)
      .then(res => {
        this.post = res.data[0]
      })
  }
}
</script>
<style lang="stylus" scoped>

</style>