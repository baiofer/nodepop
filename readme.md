**NODEPOP API v1.0.0**
Esta API permite el manejo de una base de datos de anuncios y usuarios para la elaboración
de aplicaciones de compra / venta de artículos.

**Autenticación**
NODEPOP API soporta autenticación por medio de Basic-Auth. Se debe dar usuario y password
para comunicar con ella. Todas las peticiones requieren autenticación.

**Base URL**
La URL base de esta API es http://localhost:3000

**Códigos de error HTPP**


**Usuarios**
    Lista de usuarios
        GET /apiv1/usuarios
    Buscar un usuario
        GET /apiv1/usuarios?nombre='nombre'
    Crear un usuario
        PUT /apiv1/usuarios?nombre='nombre'&email='email'&password='password'
    Actualizar un usuario
        UPDATE /apiv1/usuarios?nombre='nombre
    Borrar un usuario
        DELETE /apiv1/usuarios?nombre='nombre

**Anuncios**
    Lista de anuncios total
        GET /apiv1/anuncios
    Lista de anuncios por articulo
        GET /apiv1/anumcios/nombre='nombre'
    Lista de anuncios por venta
        GET /apiv1/anuncios/venta='true/false'
    Lista de anuncios por precio
        GET /apiv1/anuncios?precio1='precio&precio2='precio'
    Lista de anuncios por tag
        GET /apiv1/anuncios?tag='tag'
    Lista de anuncios por usuario
        GET /apiv1/anuncios?usuario='usuario'
    Buscar un anuncio
        GET /apiv1/anuncios?_id='id'
    Crear un anuncio
        PUT /apiv1/anuncios?articulo='articulo'&venta='true/false'&precio='precio'&foto='foto'&usuario='usuario'&tags=['tags]
    Actualizar un anuncio
        UPDATE /apiv1/anuncios?_id='id'
    Borrar un anuncio
        DELETE /apiv1/anuncios?_id='id'

**Tags**
    Lista de tags
    Crear un tag
    Borrar un tag

