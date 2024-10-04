[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Ihjz_szg)
# Consultemos el clima

Este proyecto consiste en un reto de desarrollo backend en el que debes crear una API REST utilizando el framework Express.js. El objetivo principal es que implementes un sistema de autenticación mediante token de sesión y un endpoint que consulte la API externa de Open Meteo para obtener la temperatura basándose en coordenadas geográficas.

## Contexto

En este reto, debes crear un servidor Express.js que exponga dos endpoints principales:
- `/login`: donde se autentican las credenciales de usuario y se devuelve un token de sesión válido.
- `/weather`: que recibe las coordenadas de **latitud** y **longitud** como **query parameters**, consulta la API de Open Meteo, y devuelve la temperatura en la ubicación especificada. Este endpoint debe estar asegurado y solo puede accederse si se proporciona un token de sesión válido.

## Seguridad de Endpoints en Backend

### Objetivo
Crear endpoints seguros en el backend utilizando un sistema basado en tokens de sesión. Debes exponer un endpoint para el inicio de sesión que valide las credenciales del usuario y devuelva un token de sesión, que luego será utilizado para asegurar el acceso a otros endpoints.

### Credenciales del usuario:
-  Email: `admin@admin.com`
-  Contraseña `admin`
  
```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

## Endpoints a implementar
- **login:**
  - Crear un endpoint para iniciar sesión con correo y contraseña en la ruta `/login`.
  - Si las credenciales son correctas, devolver un token de sesión.
 
- **Weather:**
  - Crear un endpoint asegurado que permita consultar la temperatura en función de la **latitud** y **longitud** proporcionadas.
  - Este endpoint debe recibir los parámetros **latitude** y **longitude** a través de query parameters. **ES IMPORTANTE QUE ASÍ SE NOMBREN LOS QUERY PARAMS**
  - Hacer una petición a la API externa de Open Meteo para obtener la temperatura actual.
  - El endpoint solo debe ser accesible si se proporciona un token de sesión válido.
 
## Requisitos Técnicos
- Crear un servidor Express.js básico que corra en el puerto 3000 (o cualquier otro puerto de tu preferencia).
- Utilizar express.Router() para organizar los endpoints en módulos separados si lo consideras necesario.
- Implementar la lógica de autenticación utilizando tokens de sesión.
- Hacer la petición HTTP a la API de Open Meteo (https://open-meteo.com/) desde el backend utilizando los valores de latitud y longitud recibidos.
- Asegurar que el endpoint /weather solo sea accesible si se proporciona un token de sesión válido.
- Manejar errores para rutas no definidas y peticiones sin token o con token inválido.
- El servidor debe estar **desplegado y funcionando**

### Rúbrica de evaluación

| Aspecto                                              | Puntuación |
| ---------------------------------------------------- | ---------- |
| El endpoint `/login` está correctamente implementado | 1.5        |
| El endpoint `/weather` está asegurado y funcionando   | 2.0        |
| Validación de entradas y manejo de errores            | 0.5        |
| Buenas prácticas en la organización del código        | 0.5        |
| El repositorio está desplegado      | 0.5        |
| Total                                                | 5.0        |

## Casos especiales
- El endpoint `/weather` debe devolver un error **403** si se intenta acceder sin un token válido de sesión, o con un token vencido/incorrecto.
- Debes asegurarte de manejar correctamente los errores devueltos por la API de Open Meteo, devolviendo un mensaje claro al usuario en caso de fallo.

## Links de interés
- https://open-meteo.com/
