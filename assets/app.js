/* Página de entrada de Trident: pinta las tarjetas de descarga a partir de paquetes.js */
(function () {
  'use strict';

  var datos = window.TRIDENT_PAQUETES || { paquetes: [], musaMovil: [], acceso: {} };

  // ---------- Iconos de plataforma (SVG en línea) ----------
  var ICONOS = {
    android: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M17.6 9.5l1.9-3.3a.4.4 0 0 0-.7-.4l-1.9 3.3A11 11 0 0 0 12 8a11 11 0 0 0-4.9 1.1L5.2 5.8a.4.4 0 0 0-.7.4l1.9 3.3A10.5 10.5 0 0 0 1 18h22a10.5 10.5 0 0 0-5.4-8.5zM7 15.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
    ios: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9A5 5 0 0 0 3.4 9.4c-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9c0-.1-2.7-1-2.7-4.2zM13.9 5.1A4.5 4.5 0 0 0 15 1.8a4.6 4.6 0 0 0-3 1.5 4.3 4.3 0 0 0-1.1 3.2c1.2.1 2.3-.6 3-1.4z"/></svg>',
    windows: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M3 5.5l7.4-1v7H3v-6zm0 13l7.4 1v-7H3v6zm8.2 1.1L21 21v-8.5h-9.8v7.1zm0-15.2v7.1H21V3l-9.8 1.4z"/></svg>'
  };
  ICONOS.macos = ICONOS.ios;

  var NOMBRE_PLATAFORMA = { android: 'Android', ios: 'iPhone y iPad', windows: 'Windows', macos: 'macOS' };

  // Insignias oficiales (las mismas que usa trident.dialoga.io)
  var INSIGNIAS = {
    'Google Play': { src: 'assets/ima/google-play.svg', alt: 'Disponible en Google Play' },
    'App Store': { src: 'assets/ima/app-store.svg', alt: 'Descargar en App Store' },
    'Mac App Store': { src: 'assets/ima/app-store.svg', alt: 'Descargar en Mac App Store' },
    windows: { src: 'assets/ima/windows.svg', alt: 'Descargar para Windows' },
    macos: { src: 'assets/ima/mac.svg', alt: 'Descargar para Mac' }
  };

  var ICONO_DESCARGA = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M4 19h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function insigniaDe(p) {
    return INSIGNIAS[p.tienda] || INSIGNIAS[p.plataforma] || null;
  }

  function estadoDe(p) {
    if (!(p.url && p.url.trim())) return { clase: 'pendiente', texto: 'En preparación' };
    if (p.aviso) return { clase: 'revision', texto: 'En revisión' };
    return { clase: 'disponible', texto: 'Disponible' };
  }

  function tarjeta(p) {
    var disponible = !!(p.url && p.url.trim());
    var estado = estadoDe(p);
    var insignia = insigniaDe(p);
    var filas = '';

    filas += '<dt>Versión</dt><dd class="version">' + (p.version ? escapar(p.version) : '—') + '</dd>';
    filas += '<dt>Publicada</dt><dd>' + (p.fecha ? escapar(p.fecha) : 'Pendiente') + '</dd>';
    if (p.requisitos) filas += '<dt>Requisitos</dt><dd>' + escapar(p.requisitos) + '</dd>';
    if (p.tamano) filas += '<dt>Tamaño</dt><dd>' + escapar(p.tamano) + '</dd>';

    var accion;
    if (disponible && insignia) {
      accion = '<a class="insignia" href="' + escapar(p.url) + '" target="_blank" rel="noopener" aria-label="' + escapar(insignia.alt + ': ' + p.nombre) + '">' +
                 '<img src="' + insignia.src + '" alt="' + escapar(insignia.alt) + '" width="221" height="58"></a>';
    } else if (disponible) {
      accion = '<a class="btn btn-primario" href="' + escapar(p.url) + '" target="_blank" rel="noopener">' + ICONO_DESCARGA + 'Descargar</a>';
    } else {
      accion = '<a class="btn btn-claro" href="#" aria-disabled="true" tabindex="-1">' + ICONO_DESCARGA + 'Disponible próximamente</a>';
    }

    var nota = '';
    if (p.aviso) nota = '<p class="paquete-nota">' + escapar(p.aviso) + '</p>';
    else if (!disponible) nota = '<p class="paquete-nota">El instalador está en preparación. Mientras tanto puedes usar ' + (p.producto === 'musa' ? 'Musa en el móvil' : 'Trident desde el navegador') + '.</p>';

    return (
      '<article class="paquete" id="' + escapar(p.id) + '" data-producto="' + escapar(p.producto) + '" data-plataforma="' + escapar(p.plataforma) + '">' +
        '<div class="paquete-cabecera">' +
          '<span class="paquete-icono">' + (ICONOS[p.plataforma] || '') + '</span>' +
          '<div class="paquete-titulo">' +
            '<h3>' + escapar(p.nombre) + '</h3>' +
            '<span>' + escapar(NOMBRE_PLATAFORMA[p.plataforma] || p.plataforma) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="paquete-meta"><span class="paquete-estado ' + estado.clase + '">' + estado.texto + '</span>' +
          '<span class="paquete-tienda">' + escapar(p.tienda || '') + '</span></div>' +
        '<dl class="paquete-datos">' + filas + '</dl>' +
        '<div class="paquete-accion">' + accion + '</div>' +
        nota +
      '</article>'
    );
  }

  function pintar(idContenedor, lista) {
    var cont = document.getElementById(idContenedor);
    if (!cont) return;
    cont.innerHTML = lista.map(tarjeta).join('');
  }

  var paquetes = datos.paquetes || [];
  var trident = paquetes.filter(function (p) { return p.producto === 'trident'; });
  pintar('rejilla-trident', trident);
  pintar('rejilla-musa', paquetes.filter(function (p) { return p.producto === 'musa'; }));

  // Insignias rápidas de Trident en la portada (solo paquetes disponibles)
  var rapidas = document.getElementById('insignias-rapidas');
  if (rapidas) {
    rapidas.innerHTML = trident.filter(function (p) { return p.url && insigniaDe(p); }).map(function (p) {
      var i = insigniaDe(p);
      return '<a href="' + escapar(p.url) + '" target="_blank" rel="noopener" aria-label="' + escapar(i.alt + ': ' + p.nombre) + '">' +
             '<img src="' + i.src + '" alt="' + escapar(i.alt) + '" width="221" height="58"></a>';
    }).join('');
  }

  // Enlaces secundarios de Musa en el móvil
  var movil = document.getElementById('musa-movil');
  if (movil && datos.musaMovil && datos.musaMovil.length) {
    movil.innerHTML = '<span>También en el móvil:</span>' + datos.musaMovil.map(function (m) {
      var detalle = [m.version ? 'v' + m.version : '', m.fecha || ''].filter(Boolean).join(' · ');
      return '<a href="' + escapar(m.url) + '" target="_blank" rel="noopener">' + escapar(m.etiqueta) +
        (detalle ? ' <small>(' + escapar(detalle) + ')</small>' : '') + '</a>';
    }).join('');
  }

  // Fecha del catálogo y año del pie
  var fecha = document.getElementById('fecha-catalogo');
  if (fecha) fecha.textContent = datos.actualizado || '';
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = String(new Date().getFullYear());

  // Enlaces de soporte
  var acceso = datos.acceso || {};
  ['enlace-soporte', 'btn-soporte'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el && acceso.urlSoporte) el.setAttribute('href', acceso.urlSoporte);
  });

  // Aviso de bloqueo de mayúsculas en la contraseña
  var clave = document.getElementById('userPassword');
  var avisoMayus = document.getElementById('capsLockWarning');
  if (clave && avisoMayus) {
    function comprobar(e) {
      var activo = e.getModifierState && e.getModifierState('CapsLock');
      avisoMayus.hidden = !activo;
    }
    clave.addEventListener('keyup', comprobar);
    clave.addEventListener('keydown', comprobar);
    clave.addEventListener('blur', function () { avisoMayus.hidden = true; });
  }
})();
