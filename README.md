# uptask_backend

## Explicaciones del codigo:

### Project's Controller

- Se crea una clase en el controlador para solo hacer una importacion en el file de rutas, y de esa importacion llamamos los metodos sin hacer varias importaciones.

- Los metodos son metodos estaticos ya que no se requiere instanciar la clase para usarlos.

### express-validator y middleware

- Se añadió la validacion de los campos del project en la ruta (con express validator), para no cargar al controlador haciendolo ahí.

- Ademas de las validaciones en la ruta hay que colocar el middleware para que maneje los posibles errores.

### Relacion entre projects y tasks

- Cada Project tiene multiples tareas.
- Cada Tarea solo tiene un project.
- PopulatedDoc (que se usa en el interface de Project): PopulatedDoc is a Mongoose utility type that describes a field that can either be an ObjectId (the ID of a referenced document) or a fully populated document. This type tells TypeScript: "This field might be an ObjectId when it’s not populated, but when it's populated, it will be a full Task document."
- ITask & Document creates an intersection type, meaning it combines the properties of ITask and Document. This tells TypeScript that each task in tasks has both the structure defined in ITask (like name and description) and all the Mongoose document properties (like \_id, timestamps, etc.).
- PopulatedDoc<ITask & Document>[] means "an array of references to Task documents, where each item can either be an ObjectId or a fully populated Task document.
- When you populate a field in Mongoose (using .populate()), Mongoose replaces the ObjectIds with the actual documents they reference.

### Share resources using teh request

- Se debe incluir el project en la req para que este disponible entre el controlador y el middleware un vez se valide que el project existe.

- Hay que reescribir el req de forma global para que TS no lanze error y pueda compilar (es para TS). Se hace con interface ya que se puede repetir el mismo nombre de l ainterface en diferentes lugares de la app y se van añadiendo las propiedades a los que ya estaba.

### router.param("param", middleware)

- Con esto se hace que todas las rutas que tengan el parametro se les va a aplicar el middleware.

### router.use(authenticate)

- Todas las rutas tendrán este middleware (todos los endpoints de esta instancia de router)

### authentication & authorization

- Cualquier user puede crear un project y se transforma en manager.

- Para tener todos los projects tienes que ser manager o member del mismo --> se checkea en el controller.

- Para tener project by id tienes que ser manager o member --> se checkea en el controller.

- Para editar o borrar project tienes que ser manager --> se cheque con un middleware (hasAuthorization).

- Para crear task se debe ser manager --> se cheque con un middleware (hasAuthorization).

- Para ver las tareas basta con el middleware que se le puso a obtener los projectos, puedes ser manager o member para ver.

- Para editar o borrar tareas tienes que ser manager --> se cheque con un middleware (hasAuthorization).

- Para editar el status las tareas basta con el middleware que se le puso a obtener los projectos, puedes ser manager o member para editar.
