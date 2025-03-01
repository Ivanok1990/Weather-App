# Weather App

Esta es una aplicación móvil desarrollada con **React Native** que permite a los usuarios registrarse, ver el clima actual, compartir su ubicación y gestionar su perfil. La aplicación incluye un sistema de navegación intuitivo y funcionalidades personalizadas para una experiencia de usuario fluida.

---

## Capturas de Pantalla

### Pantalla de Perfil
![Profile Screen](https://private-user-images.githubusercontent.com/79412536/418310269-7e306bb7-5912-4713-abda-8989743959e2.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDA4NzA4ODIsIm5iZiI6MTc0MDg3MDU4MiwicGF0aCI6Ii83OTQxMjUzNi80MTgzMTAyNjktN2UzMDZiYjctNTkxMi00NzEzLWFiZGEtODk4OTc0Mzk1OWUyLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzAxVDIzMDk0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFmZGNiMTMyOGRiZWE4ZTA0NDEzZDUyODgxZGEyN2U0MzNiNDgxYjc4MjYzODk5OTMzMzg5MTkyOTdiNTBlNzkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.E14Bk51jkOLtT6D94o_w83outnYnYlmLq9bNomlOZSI)

En la pantalla de perfil, los usuarios pueden:
- Ver y cambiar su foto de perfil.
- Editar su biografía.
- Cambiar la imagen de fondo de su perfil.
- Cerrar sesión.

---

### Pantalla de Registro
![Register Screen](https://private-user-images.githubusercontent.com/79412536/418310312-dfc7e787-afd9-43ff-9386-176a67ac7ab6.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDA4NzA5NTAsIm5iZiI6MTc0MDg3MDY1MCwicGF0aCI6Ii83OTQxMjUzNi80MTgzMTAzMTItZGZjN2U3ODctYWZkOS00M2ZmLTkzODYtMTc2YTY3YWM3YWI2LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzAxVDIzMTA1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZmNDEzNmY4NzI4MzBmYTU2MjU4NWQxZDE0ZTI3YWM4OTcwMTNjZjA0YTA2YzI5MGRkZWU3M2FiMjhkMWNhNWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ke9awPZSsf7YpVga1MhdepEJ4gIWbhRI1EUWh8_aZkQ)

En la pantalla de registro, los usuarios pueden:
- Registrarse proporcionando su nombre, apellido, correo electrónico, contraseña y una breve biografía.
- Ver el tiempo de la última sesión (si está disponible).

---

### Pantalla de Inicio (Home)
![Home Screen](https://private-user-images.githubusercontent.com/79412536/418310288-6563a5f9-3607-4b82-a17a-c9d661196aab.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDA4NzA5MTUsIm5iZiI6MTc0MDg3MDYxNSwicGF0aCI6Ii83OTQxMjUzNi80MTgzMTAyODgtNjU2M2E1ZjktMzYwNy00YjgyLWExN2EtYzlkNjYxMTk2YWFiLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzAxVDIzMTAxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI1NTVjZDUyMDllNDRhNTcwNGRiMjkwZTNkZjFmNTljNDE5MmU4NGQ1ZTk0MTI5ZGEyNmFhODNiNzdkNDJkZTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.N_ONKiiE9hFZ7cJc0ja6CN4JiloWDQnBbCpdcdkQZ54)

En la pantalla de inicio, los usuarios pueden:
- Ver la temperatura actual y las condiciones climáticas.
- Ver su ubicación en un mapa interactivo.
- Compartir su ubicación actual.
- Ver el tiempo transcurrido de la sesión actual.

---

## Características Principales

### Registro y Autenticación
- Formulario de registro con validaciones.
- Almacenamiento seguro de datos del usuario usando `AsyncStorage`.
- Visualización del tiempo de la última sesión.

### Perfil de Usuario
- Edición de la biografía.
- Cambio de foto de perfil (desde la galería o la cámara).
- Cambio de imagen de fondo del perfil.

### Información del Clima
- Obtención de la temperatura y condiciones climáticas actuales basadas en la ubicación del usuario.
- Uso de la API de **OpenWeatherMap** para datos meteorológicos.

### Mapa y Ubicación
- Visualización de la ubicación actual del usuario en un mapa interactivo.
- Compartir la ubicación actual mediante un enlace de Google Maps.

### Temporizador de Sesión
- Temporizador que muestra el tiempo transcurrido durante la sesión actual.
- Almacenamiento del tiempo de sesión para su visualización posterior.

### Navegación
- Navegación intuitiva usando **Drawer Navigator** para moverse entre las pantallas de **Home** y **Profile**.

---

## Tecnologías Utilizadas

- **React Native**: Framework para el desarrollo de aplicaciones móviles multiplataforma.
- **Expo**: Herramienta para simplificar el desarrollo y despliegue de aplicaciones.
- **React Navigation**: Biblioteca para la navegación entre pantallas.
- **OpenWeatherMap API**: API para obtener datos meteorológicos.
- **AsyncStorage**: Almacenamiento local para datos del usuario y tiempo de sesión.
- **Expo Image Picker**: Para la selección de imágenes desde la galería o la cámara.

---

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Ivanok1990/Weather-App.git
