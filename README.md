<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>📚 Proyecto de Registro Universitario</h1>
  <p>Este proyecto consiste en la creación de una aplicación web para el registro y gestión de estudiantes en una universidad española para personas que residen en Estados Unidos. La aplicación permite a los estudiantes inscribirse en cursos, ver detalles de sus clases y gestionar su inscripción. La información está almacenada en una base de datos MySQL y la aplicación está desarrollada usando <strong>Node.js</strong> con <strong>Express</strong>, <strong>Sequelize</strong>, y varias otras herramientas.</p>

  <h2>🚀 Tecnologías Utilizadas</h2>
  <ul>
    <li><strong>Node.js</strong>: Entorno de ejecución JavaScript.</li>
    <li><strong>Express.js</strong>: Framework para la creación de aplicaciones web.</li>
    <li><strong>MySQL</strong>: Sistema de gestión de bases de datos relacional.</li>
    <li><strong>Sequelize</strong>: ORM para trabajar con MySQL desde Node.js.</li>
    <li><strong>Axios</strong>: Cliente HTTP para hacer peticiones a APIs externas.</li>
    <li><strong>Faker</strong>: Librería para generar datos falsos para pruebas y desarrollo.</li>
    <li><strong>dotenv</strong>: Para manejar variables de entorno.</li>
    <li><strong>Morgan</strong>: Middleware para el registro de solicitudes HTTP.</li>
  </ul>

  <h2>🛠️ Arquitectura de la APP</h2>
    <p>La arquitectura del proyecto es Hexagonal</p>
        <pre>
Registro-Universidad
├── src/
│   ├── application/                 # Capa de aplicación
│   ├── domain/                      # Capa de dominio
│   └── infrastructure/              # Capa de infraestructura
|   |── seeders/
|   ├── migrations/
├── .env                             # Variables de entorno
├── .gitignore
├── package.json
└── README.md
  </pre>

  <h2>🧩 Funcionalidades Principales</h2>
  <ul>
    <li><strong>Registro de estudiantes</strong>: Los estudiantes pueden registrarse proporcionando sus datos personales.</li>
    <li><strong>Inscripción en materias</strong>: Los estudiantes pueden inscribirse hasta en 3 materias simultáneamente, siempre que no tengan clases con el mismo profesor.</li>
    <li><strong>Visualización de clases y compañeros</strong>: Los estudiantes pueden ver a los demás estudiantes que compartirán cada clase.</li>
    <li><strong>Cálculo de créditos</strong>: Cada materia tiene un valor de 3 créditos, y cada crédito equivale a $150 USD. El valor total de la inscripción se muestra en dólares y su conversión a euros (utilizando la tasa de cambio actual de Frankfurter API).</li>
  </ul>

  <h2>🛠️ Variables de entorno</h2>
    <p>En la raiz del proyecto crea un archovo .env ncon este formato, recuerda llenar los datos de usuario y contraseña con los tuyos</p>
    <p>La base de datos debe llamarse universidad</p>
    <pre>
        DB_HOST=localhost
        DB_USERNAME=root
        DB_PASSWORD=
        DB_NAME=universidad
        DB_DIALECT=mysql
    </pre>


  <h2>🛠️ Instalación y Configuración</h2>

  <h3>Paso 1: Clonar el repositorio</h3>
  <pre><code>git clone https://github.com/CamilolIn/Registro-Universidad.git
cd Registro-Universidad</code></pre>

  <h3>Paso 2: Instalar dependencias</h3>
  <pre><code>npm install</code></pre>

  <h3>Paso 3: Crear la base de datos</h3>
  <p>Entra en un cliente MySQL y crea la base de datos llamada <code>universidad</code>:</p>
  <pre><code>CREATE DATABASE universidad;</code></pre>

  <h3>Paso 4: Ejecutar migraciones</h3>
  <p>Ejecuta las migraciones para crear las tablas en la base de datos:</p>
  <pre><code>npm run db:migrations</code></pre>

  <h3>Paso 5: Ejecutar los seeders</h3>
  <p>Ejecuta los seeders para insertar datos de prueba (profesores, estudiantes, materias, etc.):</p>
  <pre><code>npm run db:seeders</code></pre>

  <h3>Paso 6: Iniciar el servidor</h3>
  <p>Ejecuta el siguiente comando para iniciar el servidor:</p>
  <pre><code>npm start</code></pre>
  <p>El servidor estará disponible en <code>http://localhost:3000</code>.</p>

  <h2>🛠️ Desarrollo</h2>

  <h3>Comandos Útiles</h3>
  <ul>
    <li><strong>Iniciar el servidor en modo desarrollo</strong>:
      <pre><code>npm start</code></pre>
    </li>
    <li><strong>Ejecutar migraciones</strong>:
      <pre><code>npm run db:migrations</code></pre>
    </li>
    <li><strong>Ejecutar seeders</strong>:
      <pre><code>npm run db:seeders</code></pre>
    </li>
  </ul>

  
  <h2>📊 Listado de Tablas</h2>
  <p><strong> (Estudiantes) 👨‍🎓</strong></p>


  <p><strong> (Materias) 📚</strong></p>


  <p><strong> (Profesores) 👩‍🏫</strong></p>


  <p><strong> (Programas) 📅</strong></p>


<h2>📜 Licencia</h2>
  <p>Este proyecto está bajo la Licencia MIT. Consulta el archivo <code>LICENSE</code> para más detalles.</p>
</body>
</html>
