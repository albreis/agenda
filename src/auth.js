import axios from 'axios'
import qs from 'qs'

/**
 * Inicializa o axios com a base da nossa API
 */
const instance = axios.create({
  baseURL: 'https://minhacliente.com.br/wp-json/jwt-auth/v1/'
})

/**
 * Intercepta quando algum request é feito
 * e exibe uma progress bar
 */
instance.interceptors.request.use(config => {


  config.data = qs.stringify(config.data)

  config.headers['content-type'] = 'application/x-www-form-urlencoded'

  if (sessionStorage.token) {
    config.headers['Authorization'] =  'Bearer ' + sessionStorage.token
  }

  NProgress.start()
  return config
})

/**
 * Quando a resposta é recebi para a execução 
 * da barra de progresso
 */
instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default instance