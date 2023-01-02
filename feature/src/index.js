// import './drag'
// import './multiRequest'
// import './race'
import { http } from './fetch/http'

const requestId = Date.now()

http.get('http://localhost:8080/api/user/1', {}, requestId).then(
  (response) => {
    console.log(response.data)
  },
  (error) => {
    console.log(error)
  }
)

setTimeout(() => {
  http.cancel(requestId)
}, 1000)
