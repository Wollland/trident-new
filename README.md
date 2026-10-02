# Trident · página de entrada

Rediseño de la página de entrada de Trident (https://trident.dialoga.io), de Dialoga Group. Es un sitio estático: no necesita compilación ni dependencias.

El formulario de acceso conserva los mismos identificadores que la página actual (`div-login`, `userID`, `userPassword`, `user_language`, `remindMe`, `login-button`, `google-button`, `microsoft-button`, `capsLockWarning`, `whiteDialogaLogo`), de modo que el código de inicio de sesión existente puede engancharse sin cambios.

Contiene:

- Acceso a la aplicación web de Trident (con cuenta de Google o con usuario y contraseña).
- Tarjetas de descarga de los seis paquetes: Trident para Android, iPhone/iPad, Windows y Mac, y Musa para Windows y Mac.
- Enlaces secundarios a Musa en Google Play y App Store.

## Estructura

| Archivo | Función |
| --- | --- |
| `index.html` | Marcado de la página |
| `paquetes.js` | **Catálogo de paquetes**: versiones, fechas, requisitos y enlaces |
| `assets/app.js` | Pinta las tarjetas a partir del catálogo y gestiona el tema claro/oscuro |
| `assets/styles.css` | Estilos (tipografía Lato y colores del logotipo de Trident y de Dialoga) |
| `assets/ima/` | Logotipos e insignias oficiales tomados de trident.dialoga.io |

## Actualizar un paquete

Edita `paquetes.js`. Cada entrada de `paquetes` tiene `version`, `fecha`, `requisitos` y `url`.

- Si `url` está vacío, la tarjeta aparece como **En preparación** y el botón queda desactivado.
- Para publicar un instalador de escritorio (Electron), sube el archivo y pon su dirección en `url`, junto con `version`, `fecha` y, si quieres, `tamano`.
- El campo `aviso` muestra una nota bajo el botón y marca la tarjeta como **En revisión** (por ejemplo, el paquete de Mac mientras se recompila).
- El campo `actualizado` es la fecha en la que se revisó el catálogo y se muestra en la sección de descargas.
- En `acceso` están las direcciones de la aplicación web y del soporte.

## Probar en local

```bash
python3 -m http.server 8080
```

y abre `http://localhost:8080`.

## Despliegue

Es un sitio estático: en Netlify basta con publicar la raíz del repositorio (`netlify.toml` ya lo indica).
