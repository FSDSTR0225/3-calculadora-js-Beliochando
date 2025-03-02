# **¡HOLA! ¡ESTA ES MI CALCULADORA!**

Si estás leyendo esto es que he subido correctamente los ficheros a Github.

## ESTO ES LO QUE REQUERÍA EL RETO

### Esquema de la pantalla

✅ Realizado

| PAN | TA  | LLA | \_  |
| --- | --- | --- | --- |
| 7   | 8   | 9   | /   |
| 4   | 5   | 6   | \*  |
| 1   | 2   | 3   | -   |
| C   | 0   | =   | +   |

### Funciones

✅ `add(a, b)`
✅ `substract(a, b)`
✅ `product(a, b)`
✅ `division(a, b)`
✅ `clear()`

### Estética

✅ He personalizado la calculadora para que tenga la estética concreta de mi branding y exista coherencia visual en todas sus partes:

    💡 He configurado toda la pantalla para que la calculadora esté centrada en todo el espacio.

    💡 He integrado una estética coherente visualmente (obviamente es cuestión de gustos y puede que os parezca feísima, a mí me encanta cómo ha quedado).

    💡 He jugado con el icono de reset (clear), poniéndolo fuera, usando un icono personalizado (y un mensaje aclaratorio para el que tenga dudas), para que sea más divertido usar la calculadora.

    💡 He puesto mensajes en el "display" que hacen de indicadores cuando no hay una operación matemática y apoyan el rollo divertido del branding.

    💡 He añadido hover a los botones.

    💡 He añadido una tipografía concreta al proyecto.

    💡 He utilizado un icono como visor del display.

### PONER UNA EXPRESIÓN DIFERENTE AL EVAL()

En un principio había utilizado: "let result = eval(safeExpression);" pero, al requerir una alternativa, he probado con esta fórmula:

"let result = new Function('return ' + safeExpression)();"

### AÑADIR FUNCIONALIDADES EXTRA

✅ He configurado la calculadora para que:

    💡 He añadido un visor que muestra las operaciones en segundo plano.

    💡 Se resetee al estado original la calculadora cuando se recarga la página.

    💡 Se cambie al mensaje "Try again!" cuando se resetea desde el botón clear.

    💡 Reconoce números negativos y opera con ellos sin problema.

    💡 El "." actúa solo como separador decimal.

    💡 Cuando muestra un resultado no permite añadir números. Si pulsamos en un botón de números, directamente empieza una nueva operación.

    💡 Si cuando tienes un resultado, haces click en "." automáticamente empieza una nueva operación decimal con "0.".

    💡 Si después de hacer click en el botón de número 0, pulsas en otro botón de número (del 1 al 9), automáticamente empieza una nueva operación partiendo de ese nuevo número. Si dejaramos el 0, no tendría sentido.

    💡 Los números con decimales muestran solo 4 decimales. El último dígito se redondea un número hacia arriba (si es 3 periódico, se redondea a 4).

    💡 Si no hay un número o resultado en el display, no te permite usar ningún operador, excepto el botón de "-", para formar números negativos.

    💡 Si pulsamos en cualquier botón de operador después de recibir un resultado, usará ese resultado como número al que realizar la nueva operación. No necesita empezar la operación de 0.

    💡 No se pueden añadir dos "." en un mismo número. Hasta que no se presiona en el botón de operador para escribir un nuevo número, no se puede volver a usar.

    💡 Si añado un número y un operador y no termino la operación, directamente no puedo darle a =.

    💡 No te permite añadir dos operadores consecutivos, excepto el "-" para operar con números negativos.

## EXPLICACIÓN LÓGICA CALCULADORA
