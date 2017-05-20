**NODEPOP API v1.0.0**

Esta API permite el manejo de una base de datos de anuncios y usuarios para la elaboración
de aplicaciones de compra / venta de artículos.

**Autenticación**

NODEPOP API soporta autenticación por medio de Basic-Auth. Se debe dar usuario y password
para comunicar con ella. Todas las peticiones requieren autenticación.

**Base URL**

La URL base de esta API es http://localhost:3000

**Códigos de error HTPP**

Los códigos de error se enviarán como:
{
    "succes": false,
    "message": "Texto del mensaje",
    "estado": <Código de estado>
}

**Usuarios**

Lista de usuarios
    GET /apiv1/usuarios?filtro
Buscar un usuario
    GET /apiv1/usuarios?nombre='nombre'
Crear un usuario
    PUT /apiv1/usuarios?nombre='nombre'&email='email'&password='password'
Actualizar un usuario
    UPDATE /apiv1/usuarios?nombre='nombre
Borrar un usuario
    DELETE /apiv1/usuarios?nombre='nombre

**Anuncios**

Lista de anuncios
    GET /apiv1/anuncios?filtro&
    El filtro podrá ser:
    	id:<id del anuncio> será numérico
    	articulo=<nombre del artículo>, en mayúsculas o minúsculas. Se pueden listar varios artículos separándolos por el carácter ','.
    	venta=<true/false>, en mayúsculas o minúsculas
    	precio=<rango inferior, rango superior>, un rango de dos precios, separados por el crácter <,>. Primero el precio mas bajo y segundo el mas alto
    	foto=<nombre del fichero de la foto sin extension>, en mayúsculas o minúsculas
    	tag=<tag>, en mayusculas o minusculas
    	usuario=<usuario>, en mayusculas o minusculas.
        limit=<numero de registros a recibir>, será numérico
        skip=<cantidad de registros que salto>, será numérico
        Se permite cualquier combinación de ellos y se encadenan con el caracter <&>
Crear un anuncio
    PUT /apiv1/anuncios?articulo='articulo'&venta='true/false'&precio='precio'&foto='foto'&usuario='usuario'&tags=['tags]
Borrar un anuncio
    DELETE /apiv1/anuncios?_id='id'

**Tags**
    Lista de tags
    Crear un tag
    Borrar un tag

