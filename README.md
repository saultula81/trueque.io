# Plataforma de Trueque Premium

Una aplicación moderna y segura para intercambios, construida con **Node.js**, **Express** y **SQLite**. Cuenta con un diseño responsivo de alta calidad y sistema de verificación de usuarios mediante subida de identificación.

## 🚀 Características

*   **Registro Seguro**: Hashing de contraseñas con bcrypt.
*   **Verificación de Identidad**: Subida de imágenes de identificación (DNI/ID) requerida.
*   **Diseño Premium**: Interfaz moderna con efectos "Glassmorphism" y totalmente responsiva (Móvil/Desktop).
*   **Base de Datos Local**: SQLite para una gestión de datos rápida y sin configuraciones complejas.

## 📋 Requisitos Previos

*   [Node.js](https://nodejs.org/) (v14 o superior)
*   NPM (viene instalado con Node.js)

## 🛠️ Instalación y Uso

1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone <tu-url-del-repositorio>
    cd trueque
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor**:
    ```bash
    npm start
    ```

4.  **Acceder a la aplicación**:
    Abre tu navegador y ve a: `http://localhost:3000`

## 📂 Estructura del Proyecto

*   `server.js`: Servidor principal y rutas API.
*   `database.js`: Configuración de la base de datos SQLite.
*   `public/`: Archivos del frontend (HTML, CSS, JS).
*   `uploads/`: Carpeta donde se almacenan las imágenes de los usuarios (ignorada en git).

## ☁️ Despliegue

Esta aplicación está lista para ser desplegada en servicios como Railway, Render o Heroku.
*Nota*: Como usa SQLite (base de datos en archivo) y almacenamiento local de imágenes, en servicios "serverless" los datos podrían reiniciarse con cada despliegue. Para producción a gran escala, se recomienda migrar a PostgreSQL y almacenamiento en la nube S3 (AWS/Google Cloud).

---
Desarrollado con ❤️ para la comunidad de trueque.
