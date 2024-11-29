<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Universitario - Sistema de Inscripción</title>
</head>
<body>

    <h1><strong>Registro Universitario - Sistema de Inscripción</strong></h1>

    <h2>🌟 <strong>Descripción</strong></h2>
    <p>Este proyecto es una <strong>aplicación web</strong> que permite a los estudiantes residentes en Estados Unidos realizar un <strong>registro en línea</strong> en una universidad española. El sistema está diseñado para gestionar la inscripción de los estudiantes en programas de créditos, asignación a materias, y visualización de su matrícula, incluyendo el valor en dólares y su conversión a euros con la tasa de cambio actual.</p>

    <h3><strong>Funcionalidades Clave:</strong></h3>
    <ul>
        <li><strong>Registro de Estudiantes:</strong> Solo se permite el registro de estudiantes residentes en Estados Unidos.</li>
        <li><strong>Programas de Créditos:</strong> Los estudiantes pueden adherirse a un programa de créditos universitarios.</li>
        <li><strong>Inscripción en Materias:</strong> Los estudiantes pueden inscribirse en <strong>3 materias</strong> simultáneamente.</li>
        <li><strong>Profesores:</strong> 5 profesores dictan <strong>2 materias</strong> cada uno.</li>
        <li><strong>Restricción de Profesores:</strong> Un estudiante no puede tener clases con el mismo profesor.</li>
        <li><strong>Detalle de Inscripción:</strong> Los estudiantes pueden ver sus materias inscritas y el valor de su matrícula en dólares y euros.</li>
        <li><strong>Conversión de Divisas:</strong> Se utiliza la API de <a href="https://api.frankfurter.app/latest?to=USD,EUR" target="_blank">Frankfurter API</a> para obtener la tasa de cambio entre USD y EUR.</li>
    </ul>

    <hr>

    <h2>🚀 <strong>Tecnologías Usadas</strong></h2>
    <p>Este proyecto se desarrolló utilizando las siguientes tecnologías:</p>
    <ul>
        <li><strong>Node.js:</strong> Plataforma de backend para la ejecución de JavaScript.</li>
        <li><strong>Express:</strong> Framework minimalista para la creación de APIs RESTful.</li>
        <li><strong>MySQL:</strong> Base de datos relacional para almacenar los registros de estudiantes, profesores, programas y materias.</li>
        <li><strong>Sequelize:</strong> ORM para interactuar con la base de datos MySQL de manera sencilla.</li>
        <li><strong>Faker:</strong> Librería para generar datos falsos de prueba.</li>
        <li><strong>Dotenv:</strong> Para gestionar las variables de entorno y la configuración del proyecto.</li>
        <li><strong>Axios:</strong> Para hacer peticiones HTTP a la API de tasas de cambio.</li>
        <li><strong>Morgan:</strong> Middleware para registrar las solicitudes HTTP realizadas al servidor.</li>
    </ul>

    <hr>

    <h2>📥 <strong>Instrucciones para Ejecutar el Proyecto</strong></h2>
    <h3>1. Clonar el Repositorio</h3>
    <p>Para comenzar, clona el repositorio en tu máquina local:</p>
    <pre><code>git clone https://github.com/CamilolIn/Registro-Universidad.git
cd Registro-Universidad</code></pre>

    <h3>2. Instalar Dependencias</h3>
    <p>Ejecuta el siguiente comando para instalar las dependencias necesarias:</p>
    <pre><code>npm install</code></pre>

    <h3>3. Configurar Variables de Entorno</h3>
    <p>Crea un archivo <code>.env</code> en la raíz del proyecto con la siguiente configuración:</p>
    <pre><code>DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=universidad
DB_DIALECT=mysql</code></pre>

    <h3>4. Crear Base de Datos</h3>
    <p>Accede a tu cliente de MySQL y crea la base de datos con el siguiente comando:</p>
    <pre><code>CREATE DATABASE universidad;</code></pre>

    <h3>5. Ejecutar Migraciones</h3>
    <p>Para crear las tablas necesarias en la base de datos, ejecuta el siguiente comando:</p>
    <pre><code>npm run db:migrations</code></pre>

    <h3>6. Ejecutar Seeders</h3>
    <p>A continuación, inserta los datos de prueba en la base de datos:</p>
    <pre><code>npm run db:seeders</code></pre>

    <h3>7. Iniciar el Servidor</h3>
    <p>Finalmente, inicia el servidor con el siguiente comando:</p>
    <pre><code>npm start</code></pre>

    <p>El servidor estará corriendo en <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>

    <hr>

    <h2>🔧 <strong>Estructura del Proyecto</strong></h2>
    <p>La estructura del proyecto es la siguiente:</p>

    <pre><code>├── .env                    # Variables de entorno para la configuración de la base de datos
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
└── README.md                # Este archivo</code></pre>

    <hr>

    <h2>🧑‍🏫 <strong>Modelos y Relaciones</strong></h2>

    <h3><strong>Estudiante</strong></h3>
    <p>El modelo <code>Estudiante</code> tiene los siguientes atributos:</p>
    <ul>
        <li><strong>nombre</strong>: Nombre del estudiante (único, no nulo).</li>
        <li><strong>pais_residencia</strong>: País de residencia del estudiante (no nulo).</li>
    </ul>

    <h3><strong>Materia</strong></h3>
    <p>El modelo <code>Materia</code> tiene los siguientes atributos:</p>
    <ul>
        <li><strong>nombre</strong>: Nombre de la materia.</li>
        <li><strong>creditos</strong>: Número de créditos de la materia (3 créditos por materia).</li>
        <li><strong>profesorId</strong>: ID del profesor que dicta la materia.</li>
    </ul>

    <h3><strong>Programa</strong></h3>
    <p>El modelo <code>Programa</code> representa el programa de créditos al que puede adherirse un estudiante.</p>

    <h3><strong>Profesor</strong></h3>
    <p>El modelo <code>Profesor</code> tiene los siguientes atributos:</p>
    <ul>
        <li><strong>nombre</strong>: Nombre del profesor.</li>
        <li><strong>especialidad</strong>: Especialidades de los profesores, que están relacionadas con las materias que dictan.</li>
    </ul>

    <h3><strong>Relaciones</strong></h3>
    <ul>
        <li>Un <strong>Estudiante</strong> puede estar inscrito en varias <strong>Materias</strong> y un máximo de 3 materias simultáneamente.</li>
        <li>Un <strong>Estudiante</strong> puede estar asociado a un <strong>Programa</strong> de créditos.</li>
        <li>Un <strong>Profesor</strong> puede dictar varias <strong>Materias</strong>, pero un <strong>Estudiante</strong> no puede estar inscrito en más de una materia del mismo profesor.</li>
    </ul>

    <hr>

    <h2>💡 <strong>Notas Adicionales</strong></h2>
    <ul>
        <li>Asegúrate de que la base de datos esté configurada correctamente en el archivo <code>.
</body>