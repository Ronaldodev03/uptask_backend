# uptask_backend

## Explicaciones del codigo:

### Project's Controller

- Se crea una clase en el controlador para solo hacer una importacion en el file de rutas, y de esa importacion llamamos los metodos sin hacer varias importaciones.

- Los metodos son metodos estaticos ya que no se requiere instanciar la clase para usarlos.

### express-validator y middleware

- Se añadió la validacion de los campos del project en la ruta (con express validator), para no cargar al controlador haciendolo ahí.

- Ademas de las validaciones en la ruta hay que colocar el middleware para que maneje los posibles errores.

### finalizadas todas las acciones de un CRUD para Projects con este commit
