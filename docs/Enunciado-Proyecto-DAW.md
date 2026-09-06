# Universidad Nacional
## Escuela de Informática
### EIF509 - Desarrollo de Aplicaciones Basadas en Web

# Proyecto 1

**Fecha de entrega:** 17 de septiembre del 2026, antes de las 6pm

---

## Indicaciones generales

1. No se espere a último momento, recuerde tiene que prevenir casos de problemas de internet, red, tiempo, electricidad, tipos de datos, y cualquier otro inconveniente.
2. Revise con tiempo los archivos que sean los correctos con información correcta, se aceptarán únicamente lo que envíen. La plataforma le permite un solo intento antes de la fecha y hora, y se evaluará lo que envíe.
3. El código del proyecto tiene que ser obligatoriamente usando únicamente las tecnologías, formas, técnicas y pasos vistos en clase, o material de clase, para su confección, así como el código y temas vistos en clase.
   - De no hacerlo estará sujeto a la reducción de puntos por ello; queda a discreción del profesor la cantidad de puntos a rebajar, inclusive asignar nota cero de ser necesario.
4. Pregunte al profesor si tiene dudas, porque de entender otra cosa, o de entender incorrectamente las instrucciones o indicaciones, o del código suministrado, perderá puntos por falta de completitud de los temas y el no seguimiento del material suministrado, y de los requerimientos solicitados, así como de las instrucciones suministradas.
5. El proyecto debe funcionar correctamente, correr sin problemas, sin errores y de manera adecuada a los requerimientos.
   - Si la aplicación no funciona, genera errores, o no puede ser evaluada, entonces se asignará cero (0), tome las precauciones debidas.

---

## Requerimientos técnicos

### 1. Diseño y base de datos

**Diseño general** – de no cumplir con los requerimientos tanto globales como específicos, queda a discreción del profesor bajar todos los puntos que crea convenientes (por ejemplo, puede quitar el 50%, o bien, todo el valor y quedar en cero).

#### Requerimientos globales

**A.** Debe usar el código visto en clase y de las lecciones suministradas.

---

### PARTE 1 — Semana 2 (obligatorio y exclusivo)

**B.** Debe usar **exclusivamente** el código de la semana 2:

**a) Crear 1 vista:**
- Implementación de autenticación (`password` y `user name`) tal y como fue estudiada y practicada.
- Debe implementar las interfaces vistas con el mismo diseño y funcionalidad (recordatorio: pantalla de "Autenticación" con campos Usuario / Contraseña y botón "Ingresar").

**b) Crear 2 vistas:**
- Implementar en cada una el CRUD tal y como fue implementado en la semana 2, con:
  - Mismo tipo de repositorio de datos de semana 2 (basado en archivos planos `.txt`).
  - Modalidad de semana 2.
  - Funcionamiento de campos de semana 2.
  - Misma modalidad de funcionamiento y mismo código de semana 2 (adaptado para acoplarlo al resto de requerimientos).
  - Funcionamiento del despliegue de campos, datos e información de semana 2.
  - Con contenido y tipos de campos diferentes a ser explicados más adelante.
  - Recordatorio visual: "CRUD DE ESTUDIANTES" con campos Carné, Nombre, Apellidos, Carrera, Promedio; botones Guardar / Modificar / Eliminar / Consultar / Limpiar / Salir; y una lista de estudiantes en tabla.

---

### PARTE 2 — Semana 4 (obligatorio y exclusivo)

**C.** Debe usar **exclusivamente** el código de la semana 4.

**a) Crear 2 vistas:**
- Implementar en cada una el CRUD tal y como fue implementado en la semana 2, con:
  - Mismo tipo de repositorio para datos de semana 4 (basado en **PostgreSQL**).
  - Modalidad de semana 4.
  - Funcionamiento de campos de semana 4.
  - Misma modalidad de funcionamiento y mismo código de semana 4 (adaptado para acoplarlo al resto de requerimientos).
  - Funcionamiento del despliegue de campos, datos e información de semana 4.
  - Con contenido y tipos de campos diferentes a ser explicados más adelante.
  - Recordatorio visual: "Semana 4 - PostgreSQL Base de Datos Relacionales — CRUD de Productos" con campos Nombre, Precio; botones Guardar / Cancelar; tabla "Productos registrados" (ID, Nombre, Precio, Acciones con Editar/Eliminar).

---

### PARTE 3 — Semana 5 (obligatorio y exclusivo)

**D.** Debe usar **exclusivamente** el código de la semana 5:

**a) Crear 2 vistas:**
- Implementar en cada una el CRUD tal y como fue implementado en la semana 2, con:
  - Mismo tipo de repositorio de datos de semana 5:
    - Basado en **PostgreSQL**.
    - Basado en **MongoDB**.
  - Modalidad de semana 5.
  - Funcionamiento de campos de semana 5.
  - Misma modalidad de funcionamiento y mismo código de semana 5 (adaptado para acoplarlo al resto de requerimientos).
  - Funcionamiento del despliegue de campos, datos e información de semana 5.
  - Con contenido y tipos de campos diferentes a ser explicados más adelante.

---

### E. Manejo de JavaScripts

- Los JavaScripts **NO pueden** quedar en las vistas junto con el HTML.
  - Los scripts deben estar ubicados en el folder correspondiente, tal como se indicó en clase (ej. dentro de "JS" en "resources" o "public"), diferente a las vistas.
  - El HTML de cualquier página que necesite JavaScript debe invocar y usar los scripts desde el HTML de la vista correspondiente.

---

### PARTE 4 — F. Manejo de errores

- Debe manejar errores tal y como fue visto en clase en toda la aplicación.

---

## Requerimientos específicos para unir las 4 partes anteriores

Son **7 grupos**, hay **7 temas**, cada grupo escoge un tema para desarrollar datos e información. Los temas son únicamente los siguientes:

1. Carros de carreras y tipos de motores.
2. Ventas de productos químicos y fórmulas.
3. Juegos de video y competencias.
4. Planetas y universos.
5. Política y figuras públicas.
6. Finanzas e inversiones.
7. Turismo y lugares por visitar.

Notas:
- Cada punto anterior tiene 2 partes de temas.
- Debe desarrollar datos e información para ajustar de forma lógica y coherente los 2 segmentos entre sí de cada tema (ej. "Carros de carreras" y "tipos de motores").
- Debe ajustar, modificar y realizar los cambios necesarios para usar exclusivamente el código visto en clase en los segmentos de los temas anteriores.
- Debe incluir serialización de imágenes dentro de las bases de datos, cuando se indique.

---

## Distribución de puntos

### 1. Parte 1 — 20 pts ("código exclusivo de semana 2")

1. Obligatoriamente debe usar el código visto en clase.
2. Unir y tratar las 3 partes como una sola aplicación, y la parte 4 desarrollada dentro de cada parte.
   - Empezando por la parte 1: si la autenticación está correcta, dejar ingresar a la aplicación.
   - Una vez que la autenticación sea correcta (no antes), mostrar un menú del lado izquierdo de la pantalla para acceder a cualquiera de las vistas indicadas en cada parte.
     - El menú debe tener un botón de deslogueo.
3. Para la primera vista (entrada al sistema):
   - Debe usar la autenticación con formatos y código visto en clase, ajustado para cumplir con el proyecto.
   - Si la autenticación es correcta, deja acceder a la aplicación.
   - Si hay error de autenticación:
     - Implementar un log en un archivo `.txt` con el formato: `Fecha – Hora / "Acción Realizada" / Usuario`.
     - **Todas** las acciones de la aplicación deben registrarse en dicho log (fallas, acciones, ejecuciones de las partes del CRUD, entre otras).
4. Para las otras 2 vistas de la parte 1:
   - En cada una implementar, exclusivamente con el código visto en clase, un CRUD correspondiente a los datos e información con contenido y coherencia lógica que sustente el tema asignado.
   - Respetar código, formato e implementación vista en clase.

### 2. Parte 2 — 40 pts ("código exclusivo de semana 4", base de datos `BDPostgreSQL`)

1. Una de las vistas debe implementar 2 tablas para CRUD de la manera vista en clase, no de otra manera.
   - Las 2 tablas deben estar relacionadas con llaves y joins, con datos coherentes y lógicos.
   - Usar Carga **Eager** y señalar puntualmente dónde y cómo se usó.
   - Cada tabla debe tener 8 campos (sin contar campos de llaves/relaciones).
     - En cada tabla investigar cómo implementar un campo en PostgreSQL para almacenar y actualizar imágenes de forma **binaria**, manejadas de forma **serializada** desde la vista.
2. La otra vista debe implementar otras 2 tablas para CRUD de la manera vista en clase, no de otra manera.
   - Igualmente relacionadas con llaves y joins, datos coherentes y lógicos.
   - Usar Carga **Eager** y señalar puntualmente dónde y cómo se usó.
   - Cada tabla debe tener 8 campos diferentes a los de la vista anterior (sin contar llaves/relaciones).
     - Mismo requerimiento de almacenamiento binario/serializado de imágenes.

### 3. Parte 3 — 40 pts ("código exclusivo de semana 5", colección `CollMongoDB`)

- Debe implementar exclusivamente el código visto en clase, usando **MongoDB**:

1. Una de las vistas debe implementar un conjunto de **60 documentos**, mismos formatos y cantidad de campos, para CRUD de la manera vista en clase.
   - Usar Carga **Lazy** y señalar puntualmente dónde y cómo se usó.
   - Cada documento debe tener **15 campos**.
   - Cada documento debe poder almacenar y actualizar imágenes de forma binaria, manejadas de forma serializada desde la vista respectiva.
2. La otra vista debe implementar otros **120 documentos**, mismos formatos y cantidad de campos entre sí, para CRUD de la manera vista en clase, con campos e información totalmente diferente a los 60 documentos anteriores.
   - Usar Carga **Lazy** y señalar puntualmente dónde y cómo se usó.
   - Cada documento debe tener **25 campos**.
   - Mismo requerimiento de almacenamiento binario/serializado de imágenes.
3. Los documentos entre las vistas deben cumplir obligatoriamente:
   - Datos coherentes y lógicos para su relación.
   - Información con sentido lógico.
   - Almacenamiento en el formato de documentos visto en clase.
   - Coherencia lógica de la información para almacenar y consultar.

---

## Aspectos obligatorios para conservar los puntos

Estos puntos son obligatorios; de lo contrario el profesor puede bajar puntos a discreción según el nivel de incumplimiento, además de lo indicado a rebajar en cada uno.

### 1. Formación de grupos
- La tarea se debe realizar en grupos de 3 personas, o asignadas en coordinación con el profesor.
- En caso de que una persona no tenga pareja, puede excepcionalmente unirse a otro grupo, notificándolo previamente al profesor por correo electrónico.

### 2. Entrega de archivos (15 pts menos por no cumplir o cumplir parcialmente)

Deben entregarse los siguientes archivos, cumpliendo exactamente con nombres, contenido y formato indicados:

1. **`ProyectoP4-App-Grupo-#.zip`**
   - Únicamente las carpetas y archivos respectivos del proyecto de VS Code, con estructura y formato visto en clase.
   - Ejemplo: `ProyectoP4-App-Grupo-1.zip`

2. **`ProyectoP4-PostgreSQL-Grupo-#.zip`**
   - Únicamente 2 conjuntos de scripts:
     - Crear la base de datos: `ScriptCrearBaseDatos.sql`
     - Popular la base de datos: `ScriptPopularBaseDatos.sql`

3. **`ProyectoP4-MongoDB-Grupo-#.zip`**
   - Únicamente 2 archivos en formato `.JSON`, como fue visto en clase:
     - Crear 60 documentos para la colección `CollMongoDB`: `Script-60-MONGO.JSON`
     - Crear 120 documentos también para la colección `CollMongoDB`: `Script-120-MONGO.JSON`

### 3. Presentación (35 pts menos de no hacerlo así o no presentar)

- Contará con **10 minutos** para presentar (dar clic a los botones y ver funcionamiento) en clase, de manera local, su solución.
- El profesor puede hacer preguntas y verificar el código sobre la implementación, que debe responderse correctamente.
- Controle su tiempo, se tomará en cuenta para el puntaje.
- En caso de presentar pero responder mal, o extenderse en los tiempos consumiendo tiempo de otras exposiciones, queda a discreción del profesor la asignación de puntos.

### 4. Fundamentación del código
- El proyecto y código deben estar exclusivamente/únicamente fundamentados en los requerimientos y el código entregado y visto en clase.
  - De no ser así, queda nulo con nota cero (0), o el profesor puede asignar la nota a discreción.
- Se recomienda ser responsable y ordenado, siguiendo, como todo ingeniero, los requerimientos e indicaciones.

### 5. Documento de explicación (15 pts menos de no hacerlo o hacerlo parcialmente)

Entregar archivo llamado **`Grupo-#-Explicacion.pdf`** (ejemplo: `Grupo-1-Explicacion.pdf`) que debe:
- Indicar nombres completos y cédula de los estudiantes.
- Describir clara y específicamente la información de la aplicación.
- Describir clara y específicamente el funcionamiento de la aplicación.
- Incluir los screenshots sobre la correcta ejecución de cada una de las opciones de los ejercicios solicitados, pantallas y uso de tablas.

---

**¡Éxitos!**
