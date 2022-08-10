import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({

    authEndpoint: `${process.env.APP_URL}/api/v1/broadcasting/auth`,
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true,
    auth: {
      headers: {
        'X-AUTH-TOKEN': process.env.API_AUTH_TOKEN
      }
    },
    broadcaster: 'pusher',
    key: 'local', // .env
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
  })

  inject('echo', echo)
}