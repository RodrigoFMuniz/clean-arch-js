class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
      return {
        statuscode: 400
      }
    }
  }
}

describe('Login Router', () => {
  it('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_pass'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statuscode).toBe(400)
  })
})
