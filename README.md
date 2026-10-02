# Trident · entrada

Rediseño de la entrada de Trident (https://trident.dialoga.io), de Dialoga Group. Es un sitio estático de **una sola pantalla**: no necesita compilación ni dependencias.

Reproduce la estructura de la entrada actual (logotipo y lemas arriba; descargas, acceso y Dialoga en una fila) con el mismo fondo (`bgLogin.jpg`), el recuadro de acceso oscuro con desenfoque, el botón verde y la transición desde el trident animado de carga.

El formulario de acceso conserva los identificadores de la página actual (`div-login`, `loginTridentLogo`, `loginLabel1`, `loginLabel2`, `userID`, `userPassword`, `user_language`, `remindMe`, `login-button`, `google-button`, `microsoft-button`, `capsLockWarning`, `buttonsDownload`, `whiteDialogaLogo`), de modo que el código de inicio de sesión existente puede engancharse sin cambios.

## Paquetes

| Columna | Paquetes |
| --- | --- |
| Trident | Android (Google Play), iPhone y iPad (App Store), Windows (instalador), Mac (imagen de disco) |
| Musa | Android (Google Play), iPhone y iPad (App Store), Windows (instalador), Mac (Mac App Store) |

## Estructura

| Archivo | Función |
| --- | --- |
| `index.html` | Marcado de la entrada |
| `paquetes.js` | **Catálogo de paquetes**: versiones, fechas, requisitos y enlaces |
| `assets/app.js` | Pinta las filas de descarga, el aviso de mayúsculas y la transición de carga |
| `assets/styles.css` | Estilos (tipografía Lato, fondo y colores de la entrada actual) |
| `assets/ima/` | Fondo, animación de carga, logotipos e insignias oficiales tomados de trident.dialoga.io |

## Actualizar un paquete

Edita `paquetes.js`. Cada entrada de `paquetes` tiene `version`, `fecha`, `requisitos`, `tamano` (opcional), `url` y `aviso` (opcional).

- Si `url` está vacío, la fila aparece como **En preparación** y sin enlace.
- Si `aviso` tiene texto, la fila se marca como **En revisión** y el texto se muestra al pasar el ratón.
- Para publicar un instalador de escritorio (Electron), sube el archivo y pon su dirección en `url`, junto con `version`, `fecha` y `tamano`.
- El campo `actualizado` es la fecha en la que se revisó el catálogo.
- En `acceso.urlSoporte` está la dirección de soporte.

## Probar en local

```bash
python3 -m http.server 8080
```

y abre `http://localhost:8080`.

## Despliegue

Es un sitio estático: en Netlify basta con publicar la raíz del repositorio (`netlify.toml` ya lo indica).
