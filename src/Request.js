import axios from 'axios'
import qs from 'qs'
import settings  from '../app.settings.json'

/**
 * Inicializa o axios com a base da nossa API
 */
const instance = axios.create({
  baseURL: settings.BASE_URL
})

/**
 * Intercepta quando algum request é feito
 * e exibe uma progress bar
 */
instance.interceptors.request.use(config => {

  config.data = qs.stringify(config.data)

  config.headers['content-type'] = 'application/x-www-form-urlencoded'
  config.headers['Origin-Token'] = settings.API_SECRET_KEY

  if (sessionStorage.token) {
      config.headers['Authorization'] =  'Bearer ' + sessionStorage.token
  }

  var cidade = sessionStorage.cidade
  var estado = sessionStorage.estado
  if(!config.params) {
    config.params = {}
  }
  config.params.cidade = config.params.cidade||cidade
  config.params.estado = config.params.estado||estado
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