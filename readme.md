# NODEPOP API V1.0.0 #
----
  Esta API permite el manejo de una base de datos de anuncios y usuarios para la elaboración de aplicaciones de compra / venta de artículos.

  Ver readmeDevOps para información relativa al despliegue en el server AWS.

* ## URL ##

  La URL base de esta API es:    `http://localhost:3100/`

* ## Métodos: ##
  
  Los métodos implementados son, tanto para anuncios como para usuarios, como para tags

  `GET | POST | DELETE | PUT`
  
*  ## Rutas de acceso (URLs) ##

    - ### Lista de anuncios ###

    `GET /apiv1/anuncios?filtro`

    El filtro podrá ser:

    **id** = *id del anuncio*. Será numérico.

    **articulo** = *nombre del artículo*. En mayúsculas o minúsculas. Se pueden listar varios artículos separándolos por el caracter ",".

    **venta** = *true/false*. En mayúsculas o minúsculas.

    **precio** = *rango inferior-rango superior*. Un rango de dos precios,separados por el crácter <->. Primero el precio mas bajo y segundo el mas alto. Si no se pone algún precio, el guión ha de ponerse.

    **foto** = *nombre del fichero de la foto*. En mayúsculas o minúsculas.

    **tag** = *tag*. En mayusculas o minusculas

    **usuario** = *usuario*. En mayusculas o minusculas.

    **limit** = *numero de registros a recibir*. Será numérico.

    **skip** = *cantidad de registros que salto*. Será numérico.

    Se permite cualquier combinación de ellos y se encadenan con el caracter **&**

    - ### Crear un anuncio ###

    `POST /apiv1/anuncios?articulo=<articulo>&venta=<true/false>&precio=<precio>&foto=<foto>&usuario=<usuario>&tags=[tags]`
        

    - ### Borrar un anuncio ###

    `DELETE /apiv1/anuncios?id=<id>`

    - ### Modificar un anuncio ###

    `PUT /apiv1/anuncios?id=<id>`
   
    - ### Lista de usuarios ###

    `GET /apiv1/usuarios?filtro`

    El filtro podrá ser:

    **id** = *id del usuario*. Será numérico.

    **nombre** = *nombre del usuario*. 

    **email** = *email del usuario*.

    **password** = *contraseña del usuario*.

    Se permite cualquier combinación de ellos y se encadenan con el caracter <&>

    - ### Crear un usuario ###

    `POST /apiv1/usuarios?nombre=<nombre>&email=<email>&password=<password>`

    - ### Borrar un usuario ###

    `DELETE /apiv1/usuarios?id=<id>`

    - ### Modificar un usuario ###

    `PUT /apiv1/usuarios?id=<id>`

    - ### Lista de tags ###

    `GET /apiv1/tags`. Sin filtros.

    - ### Crear un tag ###

    `POST /apiv1/tag?etiqueta=<etiqueta>`

    - ### Borrar un tag ###

    `DELETE /apiv1/tag?id=<id>`

* ## Parámetros ##

   ### Obligatorios: ###
   
   Tanto para anuncios, como usuarios como tags, en las operaciones de modificación `PUT` y borrado `DELETE`

   **id** = *[integer]*

   ### Opcionales: ###
 
   #### Para anuncios ####
   
   **id** = *Number*

   **articulo** = *String*

   **venta** = *Boolean*     Para indicar venta (`true`) o búsqueda (`false`)

   **precio** = *Number*

   **foto** = *Sring*

   **tags** = *[String]*

   **usuario** = *String*

   #### Para usuarios ####

   **id** = *Number*

   **nombre** = *String*

   **email** = *String*

   **password** = *String*

   #### Para tags ####

   **id** = *Number*

   **etiqueta** = *String*
 
* ## Respuesta de error: ##

~~~ 
{
    "succes": false,

    "message": "Texto del mensaje",

    "estado": <Código de estado> 
} 
~~~

* ## Instalación: ##

  Tras bajar el proyecto de git, dentro de la carpeta **nodepop**, y desde el terminal, se ejecuta

  `$ npm install`

  para instalar las dependencias.

  A continuación, se crea la base de datos de arranque, teniendo previamente abierto MongoDB. Para ello, vamos al directorio **installDB**. La base de datos tiene el acceso securizado.

  `$ cd installDB`

  y una vez aquí, instalamos las dependencias de la aplicación

  `$ npm install`

  Con las dependencias instaladas, colvemos al directorio raiz de la aplicación

  `$ cd ..`

  y ya desde aquí, lanzamos la creaccion de la base de datos con registros incluidos.

  `$ npm run installDB`

  Una vez instalada se sale con Ctrl-C y se lanza la API

  `$ npm run dev`

  La aplicación está lista

  La app se lanzará desde `./nodepop/bin/www` 

* ## Notas: ##

    Sin notas.  
  