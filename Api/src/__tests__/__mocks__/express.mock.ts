import { getMockReq, getMockRes } from '@jest-mock/express'

export const mockRequest = getMockReq
export const mockResponse = getMockRes

describe('Express Mock', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
