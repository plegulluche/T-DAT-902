import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../config/database'

// Simulation du module mongodb pour les tests
jest.mock('mongodb')

// Groupe de tests pour la connexion à la base de données
describe('Database Connection', () => {
  // Avant chaque test, réinitialiser tous les mocks
  beforeEach(() => {
    jest.resetAllMocks()
  })

  // Test pour vérifier une connexion réussie à la base de données
  it('should connect successfully to the database', async () => {
    // Création d'un mock pour la base de données
    const mockDb = { collection: jest.fn() }
    // Création d'un mock pour le client MongoDB
    const mockClient = {
      db: jest.fn().mockReturnValue(mockDb),
    }
    // Configuration du mock pour MongoClient.connect pour simuler une connexion réussie
    ;(MongoClient.connect as jest.Mock).mockResolvedValue(mockClient)

    // Espionnage de la méthode console.log pour vérifier les messages
    const consoleSpy = jest.spyOn(console, 'log')

    // Appel de la fonction à tester
    const result = await connectToDatabase()

    // Vérification que MongoClient.connect a été appelé avec une URL MongoDB
    expect(MongoClient.connect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://')
    )
    // Vérification que le message de succès a été loggé
    expect(consoleSpy).toHaveBeenCalledWith('Connected successfully to MongoDB')
    // Vérification que la fonction retourne l'objet de base de données mockée
    expect(result).toBe(mockDb)
  })

  // Test pour vérifier la gestion d'un échec de connexion
  it('should handle connection failure', async () => {
    // Création d'une erreur simulée
    const mockError = new Error('Connection failed')
    // Configuration du mock pour MongoClient.connect pour simuler un échec de connexion
    ;(MongoClient.connect as jest.Mock).mockRejectedValue(mockError)

    // Espionnage de la méthode console.error pour vérifier les messages d'erreur
    const consoleErrorSpy = jest.spyOn(console, 'error')

    // Vérification que la fonction lance bien une erreur en cas d'échec
    await expect(connectToDatabase()).rejects.toThrow('Connection failed')

    // Vérification que MongoClient.connect a été appelé avec une URL MongoDB
    expect(MongoClient.connect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://')
    )
    // Vérification que le message d'erreur a été loggé correctement
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Could not connect to MongoDB',
      mockError
    )
  })
})
