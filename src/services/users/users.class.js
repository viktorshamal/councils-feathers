import 'isomorphic-fetch';

export default class UserService {
  async get(id, params) {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
      headers: new Headers({
        'Authorization': `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`
      })
    })
    return await response.json()
  }
}
