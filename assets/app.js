/* Entrada de Trident: pinta los paquetes de paquetes.js y gestiona la transición de carga */
(function () {
  'use strict';

  var datos = window.TRIDENT_PAQUETES || { paquetes: [], acceso: {} };

  // ---------- Iconos de plataforma (SVG en línea) ----------
  var ICONOS = {
    android: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M17.6 9.5l1.9-3.3a.4.4 0 0 0-.7-.4l-1.9 3.3A11 11 0 0 0 12 8a11 11 0 0 0-4.9 1.1L5.2 5.8a.4.4 0 0 0-.7.4l1.9 3.3A10.5 10.5 0 0 0 1 18h22a10.5 10.5 0 0 0-5.4-8.5zM7 15.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
    ios: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9A5 5 0 0 0 3.4 9.4c-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9c0-.1-2.7-1-2.7-4.2zM13.9 5.1A4.5 4.5 0 0 0 15 1.8a4.6 4.6 0 0 0-3 1.5 4.3 4.3 0 0 0-1.1 3.2c1.2.1 2.3-.6 3-1.4z"/></svg>',
    windows: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3 5.5l7.4-1v7H3v-6zm0 13l7.4 1v-7H3v6zm8.2 1.1L21 21v-8.5h-9.8v7.1zm0-15.2v7.1H21V3l-9.8 1.4z"/></svg>'
  };
  ICONOS.macos = ICONOS.ios;

  // Insignias oficiales (las mismas que usa trident.dialoga.io)
  var INSIGNIAS = {
    'Google Play': { src: 'assets/ima/google-play.svg', alt: 'Get it on Google Play' },
    'App Store': { src: 'assets/ima/app-store.svg', alt: 'Download on the App Store' },
    'Mac App Store': { src: 'assets/ima/app-store.svg', alt: 'Download on the Mac App Store' },
    windows: { src: 'assets/ima/windows.svg', alt: 'Download for Windows' },
    macos: { src: 'assets/ima/mac.svg', alt: 'Download for Mac' }
  };

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function insigniaDe(p) { return INSIGNIAS[p.tienda] || INSIGNIAS[p.plataforma] || null; }

  function fila(p) {
    var disponible = !!(p.url && p.url.trim());
    var insignia = insigniaDe(p);

    var detalle = [];
    if (p.version) detalle.push('<b>v' + escapar(p.version) + '</b>');
    if (p.fecha) detalle.push(escapar(p.fecha));
    if (p.tamano) detalle.push(escapar(p.tamano));
    if (!disponible) detalle = [];
    else if (!detalle.length) detalle.push(escapar(p.requisitos || ''));
    var texto = detalle.join(' · ');

    var estado = '';
    if (!disponible) estado = '<span class="paquete-estado pendiente">Coming soon</span>';
    else if (p.aviso) estado = '<span class="paquete-estado revision" title="' + escapar(p.aviso) + '">Under review</span>';

    var accion;
    if (disponible && insignia) {
      accion = '<a class="insignia" href="' + escapar(p.url) + '" target="_blank" rel="noopener" aria-label="' + escapar(insignia.alt + ': ' + p.nombre) + '">' +
               '<img src="' + insignia.src + '" alt="' + escapar(insignia.alt) + '" width="221" height="58"></a>';
    } else if (disponible) {
      accion = '<a class="insignia" href="' + escapar(p.url) + '" target="_blank" rel="noopener">Download</a>';
    } else {
      accion = '<span class="pendiente-btn">Coming soon</span>';
    }

    var titulo = p.requisitos ? ' title="' + escapar(p.requisitos + (p.aviso ? '. ' + p.aviso : '')) + '"' : '';

    return (
      '<article class="paquete" id="' + escapar(p.id) + '" data-producto="' + escapar(p.producto) + '" data-plataforma="' + escapar(p.plataforma) + '"' + titulo + '>' +
        '<span class="paquete-icono">' + (ICONOS[p.plataforma] || '') + '</span>' +
        '<div class="paquete-texto"><h3>' + escapar(p.nombre) + '</h3><p>' + texto + estado + '</p></div>' +
        '<div class="paquete-accion">' + accion + '</div>' +
      '</article>'
    );
  }

  function pintar(id, lista) {
    var cont = document.getElementById(id);
    if (cont) cont.innerHTML = lista.map(fila).join('');
  }

  var paquetes = datos.paquetes || [];
  pintar('lista-trident', paquetes.filter(function (p) { return p.producto === 'trident'; }));
  pintar('lista-musa', paquetes.filter(function (p) { return p.producto === 'musa'; }));

  var fecha = document.getElementById('fecha-catalogo');
  if (fecha) fecha.textContent = datos.actualizado || '';

  var soporte = document.getElementById('enlace-soporte');
  if (soporte && datos.acceso && datos.acceso.urlSoporte) soporte.setAttribute('href', datos.acceso.urlSoporte);

  // Aviso de bloqueo de mayúsculas en la contraseña
  var clave = document.getElementById('userPassword');
  var avisoMayus = document.getElementById('capsLockWarning');
  if (clave && avisoMayus) {
    var comprobar = function (e) { avisoMayus.hidden = !(e.getModifierState && e.getModifierState('CapsLock')); };
    clave.addEventListener('keyup', comprobar);
    clave.addEventListener('keydown', comprobar);
    clave.addEventListener('blur', function () { avisoMayus.hidden = true; });
  }

  // Transición: trident animado -> entrada (fundido cuando el fondo está cargado)
  var carga = document.getElementById('pageLoad');
  var entrada = document.getElementById('div-login');
  var mostrada = false;
  function mostrarEntrada() {
    if (mostrada) return;
    mostrada = true;
    if (entrada) entrada.classList.add('visible');
    if (carga) carga.classList.add('oculto');
  }
  var fondo = new Image();
  fondo.onload = function () { window.setTimeout(mostrarEntrada, 900); };
  fondo.onerror = mostrarEntrada;
  fondo.src = 'assets/ima/bgLogin.jpg';
  window.setTimeout(mostrarEntrada, 4000); // tope por si la imagen tarda demasiado
})();
