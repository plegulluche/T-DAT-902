import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../config/database'

jest.mock('mongodb')

describe('Database Connection', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should connect successfully to the database', async () => {
    const mockDb = { collection: jest.fn() }
    const mockClient = {
      db: jest.fn().mockReturnValue(mockDb),
    }
    ;(MongoClient.connect as jest.Mock).mockResolvedValue(mockClient)

    const consoleSpy = jest.spyOn(console, 'log')

    const result = await connectToDatabase()

    expect(MongoClient.connect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://')
    )
    expect(consoleSpy).toHaveBeenCalledWith('Connected successfully to MongoDB')
    expect(result).toBe(mockDb)
  })

  it('should handle connection failure', async () => {
    const mockError = new Error('Connection failed')
    ;(MongoClient.connect as jest.Mock).mockRejectedValue(mockError)

    const consoleErrorSpy = jest.spyOn(console, 'error')

    await expect(connectToDatabase()).rejects.toThrow('Connection failed')

    expect(MongoClient.connect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://')
    )
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Could not connect to MongoDB',
      mockError
    )
  })
})
