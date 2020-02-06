import axios from 'axios'

/**
 * Inicializa o axios com a base da nossa API
 */
const instance = axios.create({
  baseURL: 'https://minhacliente.com.br/wp-json/wp/v2/'
})

/**
 * Intercepta quando algum request é feito
 * e exibe uma progress bar
 */
instance.interceptors.request.use(config => {
  console.log(config)
  var cidade = sessionStorage.cidade
  var estado = sessionStorage.estado
  if(!config.params) {
    config.params = {}
  }
  if(cidade) config.params.cidade = cidade
  if(estado) config.params.estado = estado
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