# API REST clinic
## Requisitos.

* Mongo 6.0
* Node v14

## Instalación.
1. Clonar repositorio.
2. Ubicarse en la raiz del repositorio.
3. Usar <code>npm install</code> para instalación de dependencias.
4. Ejecutar <code>npm run start:dev</code> para compilar typescript y levantar el servidor.
5. ¡Listos!, el servidor estara disponible en localhost:3000

## Ejecución del server.
> El servidor estara disponible de manera local, para ver el index debemos abrir las paginas que estan en el directorio **public**, solo abriend la pagina **index.html** podremos tener acceso a formularios, ya que este cuenta con botones que nos permiten redireccionar a estos.

### ¿Que se puede hacer?
  1. De manera inicial esta vacia nuestra base de datos, lo primero que haremos sera craer <code>especialidades</code> 
  2. Posterior, procedemos a crear Doctores.
  3. Como siguiente paso podemos ya crear el paciente.
  4. El ultimo paso es crear las citas medicas, en este punto solo con el numero de documento del paciente podemos agendar la cita medica.

### Endpoints

| endpoint                                   | metodo | parametros                                                |
| ------------------------------------------ | ------ | --------------------------------------------------------- |
| http://localhost:3000/api/specialities     | GET    | NA                                                        |
| http://localhost:3000/api/specialities     | POST   | ``` name ```                                              |
| http://localhost:3000/api/specialities/:id | PUT    | ``` name ```                                              |
| http://localhost:3000/api/specialities/:id | DELETE | NA                                                        |
| http://localhost:3000/api/doctors          | GET    | NA                                                        |
| http://localhost:3000/api/doctors/:id      | GET    | NA                                                        |
| http://localhost:3000/api/doctors          | POST   | ``` name, lastName, office, contactEmail, specialities``` |
| http://localhost:3000/api/doctors/:id      | PUT    | ``` name, lastName, office, contactEmail, specialities``` |
| http://localhost:3000/api/patients         | GET    | NA                                                        |
| http://localhost:3000/api/patients/:id     | GET    | NA                                                        |
| http://localhost:3000/api/patients         | POST   | ``` name, documentId, lastName, age, phone```             |
| http://localhost:3000/api/patients/:id     | PUT    | ``` name, documentId, lastName, age, phone```             |
| http://localhost:3000/api/appointments     | GET    | NA                                                        |
| http://localhost:3000/api/appointments/:id | GET    | NA                                                        |
| http://localhost:3000/api/appointments     | POST   | ``` patient,speciality,doctor,date,time ```               |
| http://localhost:3000/api/appointments/:id | PUT    | ``` patient,speciality,doctor,date,time ```               |
| http://localhost:3000/api/appointments/:id | DELETE | NA                                                        |

## Colección postman.
* En la base raiz del proyecto puede encontrar <code>Pruebas api.postman_collection.json</code> es una colección que puede importar usar para probar la API.

## Formularios.
* A continuación podra ver el flujo en formularios para el uso de la api.
  ![flow](/src/public/static/ezgif.com-resize.gif)

## BD para cargar a mongo
* En la raiz encontraras otros JSON que tiene información lista para cargar y usar en mongo,los encuentras en 
  <code>/seeds/..</code>

Si tienes alguna duda contactame 😃

![see you soon bro](https://media.giphy.com/media/l1J3CbFgn5o7DGRuE/giphy.gif)
