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

mock.onGet('/api/steps').reply(200, {
  "steps": [
    {
      "applicationId": 1,
      "id": 1,
      "innerHTML": null,
      "name": "step1",
      "order": null,
      "selector": "selector",
      "type": "input",
      "url": "step"
    },
    {
      "applicationId": 1,
      "id": 2,
      "innerHTML": null,
      "name": "step2",
      "order": null,
      "selector": "selector",
      "type": "buttonClick",
      "url": "step"
    }
  ]
})

