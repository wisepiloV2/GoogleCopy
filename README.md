# Buscador Web basado en Google

Un proyecto creado para establecer las bases de una arquitectura Full Stack con un backend en Java y un frontend en React. Abarca el desarrollo y consumo de una API REST, junto con el despliegue en contenedores utilizando Docker y Docker Compose.

** Estado del proyecto (En desarrollo)**
Actualmente, el backend responde a las consultas utilizando un JSON estático con datos simulados. El próximo paso en el roadmap es integrar un motor de búsqueda web real para procesar las peticiones.

## Tecnologías utilizadas

- **Backend:** Java 21, Spring Boot, Maven, Spring Data JPA, Spring Security (Sin Lombok).
- **Frontend:** React, Vite.
- **Base de Datos:** MySQL 8.0.
- **Infraestructura:** Docker y Docker Compose.

## Estructura del Proyecto
```
GoogleCopy/
├── Backend/                 # Código fuente del backend (Spring Boot)
│   ├── src/
│   ├── init.sql             # Script de inicialización de la base de datos
│   └── Dockerfile
├── Frontend/                # Código fuente del frontend (React/Vite)
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml       # Orquestación de los contenedores
└── README.md                # Documentación del general del proyecto
```

## Prerrequisitos

Para ejecutar este proyecto localmente, solo necesitas tener instalado lo siguiente en tu máquina:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalación y Ejecución

Sigue estos pasos para levantar todo el entorno con un solo comando:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/wisepiloV2/GoogleCopy.git
   cd GoogleCopy
   ```
2. **Levanta los contenedores:**
   ```bash
   docker-compose up -d --build
   ```
> **Nota:** Si la ejecución falla, usa "sudo"

## Acceso a la Aplicación
Una vez que los contenedores estén levantados, puedes acceder a los servicios desde tu navegador:

- **Frontend (Interfaz de usuario):** http://localhost
- **Backend (API):** http://localhost:8080
- **Base de Datos:** Expuesta en el puerto 3307. Las credenciales son root / contrasena123.
