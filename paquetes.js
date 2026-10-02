/*
 * Catálogo de paquetes de la página de entrada de Trident (trident.dialoga.io).
 *
 * Para actualizar una versión basta con editar este archivo: la página lo lee
 * al cargar y pinta las tarjetas automáticamente.
 *
 * Campos de cada paquete:
 *   id          identificador único (se usa en el DOM)
 *   producto    "trident" | "musa"
 *   plataforma  "android" | "ios" | "windows" | "macos"
 *   nombre      nombre comercial del paquete
 *   tienda      "Google Play" | "App Store" | "Mac App Store" | "Descarga directa"
 *   version     versión publicada (texto). Vacío si no se conoce.
 *   fecha       fecha de publicación de esa versión (texto)
 *   requisitos  versión mínima del sistema (texto)
 *   tamano      tamaño del instalador (texto, opcional)
 *   url         enlace de descarga. Si está vacío, la tarjeta se muestra como
 *               "en preparación" y el botón queda desactivado.
 *   aviso       nota breve que se muestra bajo el botón (opcional)
 */
window.TRIDENT_PAQUETES = {
  // Fecha en la que se revisó por última vez este catálogo.
  actualizado: "2 oct 2026",

  acceso: {
    // Dirección de soporte.
    urlSoporte: "mailto:soporte@dialogagroup.com"
  },

  paquetes: [
    {
      id: "trident-android",
      producto: "trident",
      plataforma: "android",
      nombre: "Trident para Android",
      tienda: "Google Play",
      version: "3.4.7",
      fecha: "1 sept 2026",
      requisitos: "Android · teléfono y tableta",
      url: "https://play.google.com/store/apps/details?id=apps.dialoga.com.trident"
    },
    {
      id: "trident-ios",
      producto: "trident",
      plataforma: "ios",
      nombre: "Trident para iPhone y iPad",
      tienda: "App Store",
      version: "2.10.51",
      fecha: "21 sept 2026",
      requisitos: "iOS 15.0 o posterior",
      url: "https://apps.apple.com/es/app/dialoga-trident-extension/id1132542985"
    },
    {
      id: "trident-windows",
      producto: "trident",
      plataforma: "windows",
      nombre: "Trident para Windows",
      tienda: "Descarga directa",
      version: "4.0.0",
      fecha: "5 may 2026",
      requisitos: "Windows · instalador (.exe)",
      tamano: "137 MB",
      url: "https://dialoga-download.s3.amazonaws.com/trident/win32/TridentUserSetup.exe"
    },
    {
      id: "trident-macos",
      producto: "trident",
      plataforma: "macos",
      nombre: "Trident para Mac",
      tienda: "Descarga directa",
      version: "",
      fecha: "13 nov 2023",
      requisitos: "macOS · imagen de disco (.dmg)",
      tamano: "136 MB",
      url: "https://dialoga-download.s3.amazonaws.com/trident/mac/TridentUser.dmg",
      aviso: "Versión en revisión: se publicará una compilación nueva en breve."
    },
    {
      id: "musa-android",
      producto: "musa",
      plataforma: "android",
      nombre: "Musa para Android",
      tienda: "Google Play",
      version: "1.0.4",
      fecha: "14 jul 2026",
      requisitos: "Android · teclado de voz",
      url: "https://play.google.com/store/apps/details?id=com.dialoga.transcribe"
    },
    {
      id: "musa-ios",
      producto: "musa",
      plataforma: "ios",
      nombre: "Musa para iPhone y iPad",
      tienda: "App Store",
      version: "1.0",
      fecha: "20 jul 2026",
      requisitos: "iOS 16.0 o posterior (MusaFlow)",
      url: "https://apps.apple.com/es/app/musaflow/id6768950151"
    },
    {
      id: "musa-windows",
      producto: "musa",
      plataforma: "windows",
      nombre: "Musa para Windows",
      tienda: "Descarga directa",
      version: "",
      fecha: "",
      requisitos: "Windows · instalador (.exe)",
      tamano: "",
      url: ""
    },
    {
      id: "musa-macos",
      producto: "musa",
      plataforma: "macos",
      nombre: "Musa para Mac",
      tienda: "Mac App Store",
      version: "1.0",
      fecha: "20 jul 2026",
      requisitos: "macOS 13.0 o posterior · chip Apple M1 o posterior",
      url: "https://apps.apple.com/es/app/musaflow/id6768950151"
    }
  ]
};
