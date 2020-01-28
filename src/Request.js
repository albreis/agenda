import axios from 'axios'

/**
 * Inicializa o axios com a base da nossa API
 */
const instance = axios.create({
  baseURL: 'http://minhacliente.com.br/wp-json/wp/v2/'
})

/**
 * Intercepta quando algum request é feito
 * e exibe uma progress bar
 */
instance.interceptors.request.use(config => {
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