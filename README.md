# JOINER.DEV — Portafolio personal

Portafolio de Joiner David Cantillo Camargo, creado con React, TypeScript y Vite.

El sitio inicia en inglés. Usa el botón **ES** de la barra superior para cambiar a español; la preferencia se guarda en el navegador.

## Ejecutar localmente

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Publicar en GitHub Pages

1. Sube este proyecto a un repositorio llamado `joinercantillo` en GitHub y usa la rama `main`.
2. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions** como fuente.
3. Cada push a `main` ejecutará `.github/workflows/deploy.yml`; también puedes iniciarlo manualmente desde la pestaña **Actions**.
4. Cuando termine la acción, GitHub mostrará la dirección publicada en **Settings → Pages**.

La ruta base `/joinercantillo/` se activa únicamente dentro de GitHub Actions. En local se mantiene `/`.

## Recursos que debes proporcionar

- **Fotografía:** tu retrato está en `public/assets/images/profile.png`. Puedes reemplazar ese archivo por una foto actualizada manteniendo el mismo nombre; si no carga, el sitio muestra el espacio visual con tus iniciales.
- **CV:** el botón **Descargar CV** abre el diálogo de impresión del navegador; elige **Guardar como PDF** para obtener una copia. Revisa la vista previa antes de compartirla.
- **Proyectos:** la lista se administra en `src/data.ts`. Añade allí cada proyecto con su repositorio o demo sólo cuando el enlace exista. Reemplaza la ilustración conceptual `public/assets/images/projects/web-project.svg` por una captura real cuando esté disponible y actualiza la ruta en los datos.
- La ilustración de `public/assets/images/about-development.svg` es una composición vectorial local; no es necesario reemplazarla.

Los textos, enlaces y datos del portafolio están centralizados en `src/data.ts` y `src/App.tsx`.

Los logotipos SVG de lenguajes y herramientas se guardan localmente en `public/assets/icons/` para evitar depender de CDNs al cargar el sitio. Al seleccionar una tarjeta se abre la documentación o el sitio de referencia correspondiente.
