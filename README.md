# **Registro Universitario - Sistema de Inscripción**

## 🌟 **Descripción**

Este proyecto es una **aplicación web** que permite a los estudiantes residentes en Estados Unidos realizar un **registro en línea** en una universidad española. El sistema está diseñado para gestionar la inscripción de los estudiantes en programas de créditos, asignación a materias, y visualización de su matrícula, incluyendo el valor en dólares y su conversión a euros con la tasa de cambio actual.

### **Funcionalidades Clave:**

- **Registro de Estudiantes:** Solo se permite el registro de estudiantes residentes en Estados Unidos.
- **Programas de Créditos:** Los estudiantes pueden adherirse a un programa de créditos universitarios.
- **Inscripción en Materias:** Los estudiantes pueden inscribirse en **3 materias** simultáneamente.
- **Profesores:** 5 profesores dictan **2 materias** cada uno.
- **Restricción de Profesores:** Un estudiante no puede tener clases con el mismo profesor.
- **Detalle de Inscripción:** Los estudiantes pueden ver sus materias inscritas y el valor de su matrícula en dólares y euros.
- **Conversión de Divisas:** Se utiliza la API de [Frankfurter API](https://api.frankfurter.app/latest?to=USD,EUR) para obtener la tasa de cambio entre USD y EUR.

---

## 🚀 **Tecnologías Usadas**

Este proyecto se desarrolló utilizando las siguientes tecnologías:

- **Node.js**: Plataforma de backend para la ejecución de JavaScript.
- **Express**: Framework minimalista para la creación de APIs RESTful.
- **MySQL**: Base de datos relacional para almacenar los registros de estudiantes, profesores, programas y materias.
- **Sequelize**: ORM para interactuar con la base de datos MySQL de manera sencilla.
- **Faker**: Librería para generar datos falsos de prueba.
- **Dotenv**: Para gestionar las variables de entorno y la configuración del proyecto.
- **Axios**: Para hacer peticiones HTTP a la API de tasas de cambio.
- **Morgan**: Middleware para registrar las solicitudes HTTP realizadas al servidor.

---

## 📥 **Instrucciones para Ejecutar el Proyecto**

### 1. Clonar el Repositorio

Para comenzar, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/CamilolIn/Registro-Universidad.git
cd Registro-Universidad
2. Instalar Dependencias
Ejecuta el siguiente comando para instalar las dependencias necesarias:

bash
Copy code
npm install
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

env
Copy code
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=universidad
DB_DIALECT=mysql
4. Crear Base de Datos
Accede a tu cliente de MySQL y crea la base de datos con el siguiente comando:

sql
Copy code
CREATE DATABASE universidad;
5. Ejecutar Migraciones
Para crear las tablas necesarias en la base de datos, ejecuta el siguiente comando:

bash
Copy code
npm run db:migrations
6. Ejecutar Seeders
A continuación, inserta los datos de prueba en la base de datos:

bash
Copy code
npm run db:seeders
7. Iniciar el Servidor
Finalmente, inicia el servidor con el siguiente comando:

bash
Copy code
npm start
El servidor estará corriendo en http://localhost:3000.

🔧 Estructura del Proyecto
La estructura del proyecto es la siguiente:

bash
Copy code
├── .env                    # Variables de entorno para la configuración de la base de datos
├── src/                    
│   ├── controllers/         # Controladores con la lógica de negocio (CRUD)
│   ├── models/              # Modelos de Sequelize para las tablas de la base de datos
│   ├── routes/              # Rutas que definen los endpoints de la API
│   ├── services/            # Servicios que interactúan con la base de datos
│   ├── sequelize/           # Archivos relacionados con la configuración de Sequelize
│   │   ├── migrations/      # Archivos de migración para las tablas
│   │   └── seeders/         # Archivos para insertar datos de prueba en la base de datos
│   ├── utils/               # Utilidades comunes (por ejemplo, para llamar a APIs externas)
│   ├── app.js               # Configuración principal de la aplicación (Express)
│   └── server.js            # Archivo que inicializa el servidor
├── package.json             # Configuración del proyecto y dependencias
└── README.md                # Este archivo
🧑‍🏫 Modelos y Relaciones
Estudiante
El modelo Estudiante tiene los siguientes atributos:

nombre: Nombre del estudiante (único, no nulo).
pais_residencia: País de residencia del estudiante (no nulo).
Materia
El modelo Materia tiene los siguientes atributos:

nombre: Nombre de la materia.
creditos: Número de créditos de la materia (3 créditos por materia).
profesorId: ID del profesor que dicta la materia.
Programa
El modelo Programa representa el programa de créditos al que puede adherirse un estudiante.

Profesor
El modelo Profesor tiene los siguientes atributos:

nombre: Nombre del profesor.
especialidad: Especialidades de los profesores, que están relacionadas con las materias que dictan.
Relaciones
Un Estudiante puede estar inscrito en varias Materias y un máximo de 3 materias simultáneamente.
Un Estudiante puede estar asociado a un Programa de créditos.
Un Profesor puede dictar varias Materias, pero un Estudiante no puede estar inscrito en más de una materia del mismo profesor.
💡 Notas Adicionales
Asegúrate de que la base de datos esté configurada correctamente en el archivo .env antes de ejecutar las migraciones.
Puedes modificar los seeders y migraciones si necesitas agregar o modificar datos de prueba.
Si tienes dudas sobre el sistema de conversiones de divisas, la API utilizada es Frankfurter API, que proporciona la tasa de cambio entre USD y EUR.
📞 Contacto
Autor: Camilo López
GitHub