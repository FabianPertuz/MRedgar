 Gestor de Tareas CLI con MongoDB

Este proyecto es la versión mejorada del taller de Don Edgar.  
Ahora la persistencia de datos se realiza en **MongoDB** en lugar de archivos locales.

## 🚀 Requisitos

- **Node.js** 18 o superior
- **npm** o **yarn**
- Una base de datos **MongoDB** en tu equipo o en la nube (Atlas, etc.)

## 📂 Instalación

1. **Clona este repositorio**  
   ```bash
   git clone <URL-de-tu-repo>
   cd <nombre-de-la-carpeta>
   ```

2. **Instala dependencias**  
   ```bash
   npm install
   ```
   Esto instalará:
   - `mongodb`
   - `dotenv`
   - `inquirer`
   - `chalk`
   - `lodash`
   - `nanoid`

3. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto (donde está `main.js`) con el contenido:

   ```
   MONGO_URI=mongodb://localhost:27017/tareasdb
   ```

   - Si usas MongoDB Atlas, pon tu cadena de conexión en `MONGO_URI`.

## ▶️ Ejecución

Desde la carpeta raíz del proyecto (donde está `main.js`):

```bash
node main.js
```

Verás el menú interactivo en consola para:
- Crear una tarea
- Listar todas, completadas o pendientes
- Marcar tareas como completadas
- Eliminar tareas

## 🗂 Estructura del proyecto

```
.
├─ controllers/
│  └─ taskscontrollers.js
├─ helpers/
│  ├─ menu.js
│  └─ validators.js
├─ models/
│  └─ Task.js
├─ utils/
│  ├─ mongo.js
│  └─ (otros utilitarios)
├─ .env
├─ package.json
└─ main.js
```


## 👥 Autores

Fabian Pertuz y Carlos Villamizar.