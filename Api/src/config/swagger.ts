import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion des Utilisateurs',
      version: '1.0.0',
      description:
        'API pour la gestion des utilisateurs avec authentification Firebase',
      contact: {
        name: 'Pierre Le gulluche',
        email: 'votre.email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'firebase_id', 'email'],
          properties: {
            id: {
              type: 'string',
              description: "UUID auto-généré pour l'utilisateur"
            },
            firebase_id: {
              type: 'string',
              description: "ID Firebase unique de l'utilisateur"
            },
            email: {
              type: 'string',
              format: 'email',
              description: "Adresse email de l'utilisateur"
            },
            name: {
              type: 'string',
              description: "Nom de l'utilisateur (optionnel)"
            },
            firstname: {
              type: 'string',
              description: "Prénom de l'utilisateur (optionnel)"
            }
          }
        },
        CreateUserInput: {
          type: 'object',
          required: ['firebase_id', 'email'],
          properties: {
            firebase_id: {
              type: 'string',
              description: "ID Firebase unique de l'utilisateur"
            },
            email: {
              type: 'string',
              format: 'email',
              description: "Adresse email de l'utilisateur"
            }
          }
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: "Nouveau nom de l'utilisateur"
            },
            firstname: {
              type: 'string',
              description: "Nouveau prénom de l'utilisateur"
            },
            email: {
              type: 'string',
              format: 'email',
              description: "Nouvelle adresse email de l'utilisateur"
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'] // Chemin vers vos fichiers de routes
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
