# FitTrack — PWA de seguimiento fitness

Aplicación web progresiva (PWA) para seguir un plan de recomposición corporal de 12 semanas: rutina diaria con guías visuales de máquinas, dieta con menú semanal y lista de compras, registro de progreso (peso y cintura) e historial de fuerza por ejercicio.

Todos los datos se guardan localmente en el dispositivo (`localStorage`); no se envía nada a ningún servidor.

## Características

- **Rutina diaria** (lun–vie + sábado opcional) con guía visual de máquina, movimiento adecuado y alternativa para cada ejercicio.
- **Historial de fuerza**: registra el peso usado en cada ejercicio y muestra su evolución semana a semana.
- **Dieta**: comidas del día, menú semanal editable y lista de compras por secciones del súper.
- **Progreso**: gráfico de evolución de peso y cintura.
- **Recordatorios locales**: aviso de entrenamiento (lun–vie 18:45) y de pesaje (sábado 8:00).
- **Funciona offline** una vez instalada.

## Instalar en el teléfono

1. Abre la URL de la app en Chrome (Android) o Safari (iPhone).
2. Android: menú ⋮ → **Instalar aplicación** / **Agregar a pantalla de inicio**.
3. iPhone: botón **Compartir** → **Agregar a pantalla de inicio**.

## Desplegar con GitHub Pages

1. Sube todos los archivos de este repositorio a la rama `main`.
2. En el repo: **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guarda. En 1–2 minutos la app estará en:
   `https://AAFW84.github.io/fittrack/`

> GitHub Pages sirve por HTTPS, requisito para que el Service Worker y las notificaciones funcionen.

## Estructura

```
index.html            App completa (HTML + CSS + JS + imágenes embebidas)
manifest.json         Configuración PWA
service-worker.js     Caché offline + notificaciones en segundo plano
favicon.png
icons/                Íconos en todos los tamaños
```

## Notas

- Para restablecer el plan a los valores originales: pestaña **Plan → Restaurar plan original** (no borra el progreso registrado).
- Los recordatorios en segundo plano dependen del navegador/sistema; en iPhone las notificaciones web requieren tener la app agregada a la pantalla de inicio.
