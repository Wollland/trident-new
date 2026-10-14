# Nueva entrada de Trident · notas de integración

Este paquete contiene la nueva entrada de trident.dialoga.io. Es HTML, CSS y JavaScript sin dependencias ni compilación: se sirve tal cual.

## Contenido

| Archivo | Función |
| --- | --- |
| `index.html` | Marcado de la entrada (una sola pantalla) |
| `paquetes.js` | Catálogo de paquetes: versiones, fechas y enlaces de descarga |
| `assets/app.js` | Pinta las filas de descarga, aviso de mayúsculas y transición de carga |
| `assets/styles.css` | Estilos (Lato, fondo `bgLogin.jpg`, recuadro oscuro, botón verde) |
| `assets/ima/` | Fondo, trident animado, logotipos e insignias (los mismos de trident.dialoga.io) |
| `netlify.toml` | Solo si se despliega en Netlify; se puede ignorar |

## Cómo engancharlo al código de inicio de sesión actual

Los identificadores del formulario son los mismos que en la entrada actual, así que el JavaScript existente (`js/lib/login/login.js`, `js/index.js`, `Cursor`, `WebLoginControl`, etc.) debería funcionar sin cambios:

- `div-login`, `loginTridentLogo`, `mainTridentLogo`, `loginLabels`, `loginLabel1`, `loginLabel2`
- `loginDataContainer`, `loginForm`, `userPas`, `blurDiv`, `loginElementsContainer`
- `userID`, `userPassword`, `user_language`, `remindMeElement`, `remindMe`, `remindMesLabel`
- `login-button`, `loginSeparator`, `centerSeparator`, `google-button`, `imageGoogle`, `microsoft-button`, `imageMicrosoft`
- `capsLockWarning`, `buttonsDownload`, `whiteDialogaLogo`, `textPowered`, `textPoweredLink`, `imageWhiteDialoga`, `label.version`

Pasos:

1. Sustituir el bloque `<div id="div-login">` de la página actual por el de `index.html`, y el `<div id="pageLoad">` por el nuevo (mismo identificador).
2. Añadir `assets/styles.css` **después** de las hojas de estilo actuales para que prevalezca en la entrada, o fusionar sus reglas en `validation.css`.
3. Añadir `paquetes.js` y `assets/app.js` al final del cuerpo. `app.js` no toca el proceso de inicio de sesión: solo pinta las descargas, el aviso de mayúsculas y el fundido de entrada.
4. La transición de carga: `app.js` añade la clase `visible` a `#div-login` y `oculto` a `#pageLoad` cuando el fondo está cargado. Si el código actual ya hace `$("#pageLoad").hide(); $("#div-login").show();`, no hay conflicto: se pueden mantener ambas cosas o quitar el fundido de `app.js` (bloque final del archivo).
5. El atributo `lang="placeholder:Login.Pass"` y similares del traductor actual no están puestos; si se quiere seguir usando `translator`, basta con añadirlos a los mismos elementos.

## Actualizar paquetes

Todo está en `paquetes.js`. Cada entrada tiene `version`, `fecha`, `requisitos`, `tamano` (opcional) y `url`.

- Si `url` está vacío, la fila aparece como **Coming soon** y sin enlace (así está ahora Musa para Windows).
- Para publicar un instalador nuevo (Electron), basta con cambiar `url`, `version`, `fecha` y `tamano`.
- `actualizado` es la fecha de revisión del catálogo que se muestra bajo "Download Trident".

## Pendiente

- **Musa para Windows**: falta la dirección de descarga del instalador.
- **Trident para Mac**: el enlace apunta al `TridentUser.dmg` actual (13 nov 2023). Cuando se publique la compilación nueva, actualizar `version`, `fecha` y `tamano`.
