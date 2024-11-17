import request from 'supertest'
import app from '../../src/app'

describe('POST auth/register', () => {
  jest.setTimeout(15000) // 15 seconds for all tests in this block

  // Test cases can be of two types 1.Happy Path 2. Sad Path
  // Happy paths are the test cases which fulfills all the required conditions/payload, which means when everything is ok what should be the response

  describe('Given all fields', () => {
    it('Should return 201 status code', async () => {
      // use AAA rule
      // Arrange -  Prepare the data like payload or fields
      const userData = {
        firstname: 'Savi',
        lastname: 'Singh',
        email: '1@gmail.com',
        password: 'jjdsjd8878',
      }

      // Act -  Trigger the actual logic like call the api endpoint

      const response = await request(app).post('/auth/register').send(userData)

      // Assert - Match the expected out i.e check whether it return 201 status code or not

      expect(response.statusCode).toBe(201)
    })

    it('Should return valid JSON response', async () => {
      const userData = {
        firstname: 'Savi',
        lastname: 'Singh',
        email: '1@gmail.com',
        password: 'jjdsjd8878',
      }

      const response = await request(app).post('/auth/register').send(userData)

      expect(
        (response.headers as Record<string, string>)['content-type'],
      ).toEqual(expect.stringContaining('json'))
    })
  })

  // Sad paths are test cases when spme fields or payloads are missing which didn't make the output Okay

  describe('Fields are missing', () => {
    it('should return 400 for invalid payload', async () => {
      const response = await request(app).post('/auth/register').send()
      expect(response.status).toBe(400)
      expect(
        (response.headers as Record<string, string>)['content-type'],
      ).toEqual(expect.stringContaining('json'))
    })
  })
})