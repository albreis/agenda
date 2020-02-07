<template lang="pug">
  .page-signup
    .form
      h1 Cadastro
      br
      form(@submit="signup")
        .form-field
          label E-mail
          input(v-model="email")
        .form-field
          label Senha
          input(v-model="password" type="password")
        .form-field
          label Confirma a senha
          input(v-model="password_confirm" type="password")
        button(type="submit") Criar conta
        br
        br
        br
        div(v-if="userid") Cadastro concluído! Agora você pode 
          router-link(to="/login") FAZER LOGIN
</template>
<script>
import { EventBus } from '../event-bus.js'
export default {
  data() {
    return {
        email: '',
        password: '',
        password_confirm: '',
        userid: ''
    }
  },

  methods: {
    signup(e) {
      e.preventDefault()
      if(!this.email) { alert('O e-mail é obrigatório'); return false; }
      if(!this.password) { alert('A senha é obrigatória'); return false; }
      if(!this.password_confirm) { alert('Confirme sua senha'); return false; }
      this.$http.post('users/register', {email: this.email, password: this.password})
      .then(res => {
        this.userid = res.data
        EventBus.$emit('userSignup')
      }).catch(err => {
        console.log('Error', err)
        alert(err.message)
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