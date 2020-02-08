<template lang="pug">
  .page-login
    .form
      h1 Login
      br
      form(@submit="login")
        .form-field
          label E-mail
          input(v-model="email")
        .form-field
          label Senha
          input(v-model="password" type="password")
        button(type="submit") Entrar
        br
        p Não possui conta? 
          router-link(to="/criar-conta") 
            strong CADASTRE-SE
</template>
<script>
import { EventBus } from '../event-bus.js'
export default {
  data() {
    return {
        email: '',
        password: ''
    }
  },

  methods: {
    login(e) {
      e.preventDefault()
      this.$auth.post('token', {username: this.email, password: this.password}).then(res => {
        sessionStorage.token = res.data.token  
        EventBus.$emit('userLogin')
        this.$router.push('/')   
      }).catch(err => {
        console.log('Error', err)
      })
      return false;
    }
  }
}
</script>
<style lang="stylus" scoped>
.form
  max-width 500px
  display block
  margin 50px auto
  a, a:hover, a:visited
    color #000
  .form-field
    margin-bottom 15px
  label
    display block
    font-weight bold
  input
    padding 0 15px
    height 40px
    border-radius 6px
    border 1px solid #ddd
    width 100%
  button
    background #f43
    width 100%
    border none
    color #fff
    padding 10px 30px
    margin 0
    border-radius 6px
    font-weight bold
    font-size 18px
    text-transform uppercase
    cursor pointer
</style>