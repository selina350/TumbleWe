import request from '../redux/request'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(request, { delayResponse: 300 })

mock.onGet('/api/users/me').reply(200, {
  id: 1, username: 'John Smith', email: 'demo@aa.io',
})

mock.onGet('/api/applications').reply(200, {
  applications: [
    {
      id: 1,
      name: 'demo',
      ownerId: 1,
    }],
})