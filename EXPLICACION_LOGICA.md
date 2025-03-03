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

### 1. Definición de las variables:

    const display = document.getElementById('display');
    const expressionDisplay = document.getElementById('expression');
    const buttons = document.getElementsByClassName('boton');
    const operators = document.getElementsByClassName('operador');
    const resetButton = document.getElementsByClassName('resetear')[0];

    let expression = '';
    let hasError = false;
    let currentNumber = '';
    let lastResult = null;
    let canInputOperator = false;
    let canInputNumber = true;

### 2. Función de actualizar el display:

        function updateDisplay(value, type = 'display') {
            if (type === 'display') {
                display.placeholder = value;
            } else {
                expressionDisplay.textContent = value;
            }
        }

    En esta función, lo que he querido determinar es cómo se actualiza la pantalla de la calculadora, teniendo en cuenta que tengo una "casilla" para realizar las operaciones y otra para ir mostrando las operaciones anteriores.

    display.placeholder es la casilla donde se van a ir escribiendo las operaciones.

    expressionDisplay es la casilla donde se van mostrando las operaciones anteriores.

### 3. Botones de número.

            Array.from(buttons).forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.textContent;
                    if (hasError) {
                        expression = value;
                        currentNumber = value;
                        hasError = false;
                        updateDisplay(expression, 'display');
                        canInputOperator = true;
                        canInputNumber = true;
                        return;
                    }
                    if (lastResult !== null) {
                        expression = value;
                        currentNumber = value;
                        lastResult = null;
                        updateDisplay(expression, 'display');
                        canInputOperator = true;
                        canInputNumber = true;
                        return;
                    }
                    if (!canInputNumber) {
                        expression = value;
                        currentNumber = value;
                        updateDisplay(expression, 'display');
                        canInputOperator = true;
                        canInputNumber = true;
                        return;
                    }
                    if (currentNumber === '0' && value !== '0') {
                        expression = value;
                        currentNumber = value;
                        updateDisplay(expression, 'display');
                        return;
                    }
                    expression += value;
                    currentNumber += value;
                    updateDisplay(expression, 'display');
                    canInputOperator = true;
                });
            });

    Lo que yo quería hacer con esta función es lo siguiente:

        1. Identificar los botones de número del código HTML y convertirlos en un array para trabajar sobre ellos (o iterar ¿?)

        2.  Añadir un addeventlistener a cada botón, para que lo detecte y lo añada a la pantalla de operaciones.

        3.  Añadirle los condicionantes para que responda según las necesidades que yo he considerado que tiene:

            1. Si hay un error, permite que el usuario pueda incorporar nuevos números para reiniciar la operación y realizarla con éxito.

            2. Permitir crear una nueva operación numérica al pulsar en un botón después de obtener un resultado.

            3. No añadir más números al resultado después de obtenerlo, sino que comienza una nueva operación.

            4. Evitar que las operaciones empiecen con un 0 a la izquierda. Cuando se pulsa un 0 y luego otro número, se reinicia la operación con ese nuevo número.

            5. Permitir concatenar números para poder realizar operaciones.

### 4. Operadores

            Array.from(operators).forEach(operator => {
                operator.addEventListener('click', () => {
                    const value = operator.textContent;

                    if (value === '.') {

                        if (lastResult !== null) {
                            expression = "0.";
                            currentNumber = "0.";
                            updateDisplay(expression, "display");
                            canInputOperator = false;
                            canInputNumber = true;
                            lastResult = null;
                            return;
                        }

                        if (currentNumber.includes('.')) return;

                        if (currentNumber === '') {
                            expression += "0.";
                            currentNumber = "0.";
                        } else {

                            expression += value;
                            currentNumber += value;
                        }

                        updateDisplay(expression, "display");
                        canInputOperator = false;
                        canInputNumber = true;
                        return;
                    }

                    if (!currentNumber && value !== '-' && lastResult === null) return;

                    if (!currentNumber && lastResult !== null) {
                        expression = lastResult.toString() + ` ${value} `;
                        currentNumber = '';
                        lastResult = null;
                        updateDisplay(expression, 'display');
                        canInputOperator = false;
                        canInputNumber = true;
                        return;
                    }

                    if (value === '=') {
                        try {
                            const safeExpression = expression
                                .replace('×', '*')
                                .replace('÷', '/');

                            let result = eval(safeExpression);
                            let displayResult = roundToDecimal(result, 4);

                            lastResult = displayResult;

                            updateDisplay(displayResult, 'display');
                            updateDisplay(expression, 'expression');
                            expression = displayResult.toString();
                            currentNumber = '';
                            canInputOperator = true;
                            canInputNumber = true;
                        } catch (error) {
                            hasError = true;
                            updateDisplay('Error', 'display');
                            updateDisplay(expression, 'expression');
                            canInputOperator = false;
                            canInputNumber = false;
                        }
                        return;
                    }

                    if (value === '÷' || value === '×' || value === '-' || value === '+') {
                        expression += ` ${value} `;
                        currentNumber = '';
                        updateDisplay(expression, 'display');
                        canInputOperator = false;
                        canInputNumber = true;
                    }
                });
            });

    Lo que yo quería hacer con esta función es lo siguiente:

        1. Identificar los botones de operadores, igual y decimal del código HTML y convertirlos en un array para trabajar sobre ellos.

        2. Añadir addeventlistener a cada botón.

        3. Añadir condicionantes:

            1. Si no hay resultado en la pantalla y se pulsa ".", se muestra un "0." para evitar errores y confusiones.

            2. Si hay un "0." en la pantalla, evita que se puedan pulsar operadores para que se puedan completar los números decimales.

        4. Evitar que se pulse un operador al principio de la ecuación, excepto el "-" para formar números negativos.

        5. Utilizar el resultado anterior para continuar haciendo operaciones con él.

        6. Por supuesto, al hacer click en "=" realiza el cálculo de la operación y la muestra. Si hubiera un error, mostraría un error.

        7. Si un número ya tiene un . decimal, no permite añadir otro.

        8. No permite añadir más operadores si el último resultado es un operador.

        9. Mostrar los números decimales en máximo 4 digitos.

    _Sin lugar a dudas ha sido la parte más compleja porque tiene muchos condicionantes y, en función de cómo aplico una lógica, lo mismo me cargo otra que ya he hecho o interfiere en otra que está por hacer._

### 5. Función de redondeo.

            function roundToDecimal(value, decimals) {
                let str = value.toString();
                let isNegative = value < 0;
                let absoluteValue = Math.abs(value);
                let decimalIndex = str.indexOf(".");

                if (decimalIndex !== -1) {
                    let decimalPart = str.slice(decimalIndex + 1);

                    if (decimalPart.length > decimals) {
                        let roundedValue = Math.ceil(absoluteValue * Math.pow(10, decimals));
                        let finalValue = roundedValue / Math.pow(10, decimals);
                        return isNegative ? -finalValue : finalValue;
                    }
                }

                return isNegative ? -absoluteValue : absoluteValue;
            }

    Básicamente consiste esta función en que cuando haya un número con decimales, directamente se muestre en pantalla el número redondeado al final.

### 6. Función de reseteo.

            resetButton.addEventListener('click', () => {
                expression = '';
                currentNumber = '';
                lastResult = null;
                hasError = false;
                canInputOperator = false;
                canInputNumber = true;
                updateDisplay('Try again!', 'display');
                updateDisplay('', 'expression');
            });

    Esta función lo que hace es que cuando se pulsa en el botón de reseteo, actualice el display reiniciandolo para hacer una nueva operación. En este caso, en lugar de poner 0 o nada, le he puesto la frase "Try again!" para motivar a seguir usándola y practicar el cambiarle el contenido según los diferentes botones.

### 7. Función de recargar la página.

            window.onload = function() {
                expression = '';
                hasError = false;
                updateDisplay('Auuuu, yeaah!', 'display');
                updateDisplay('', 'expression');
            }

    Esta función sirve para que cuando la página se recargue vuelva a la configuración inicial la calculadora. Si no estuviera, todo el tiempo que se reseteara aparecería "Try again!" y no volvería a aparecer "Auuu, yeah!".

###### ¡Y ESTO ES TODO!

    Por supuesto, me he apoyado en la IA para entender cada paso que he ido dando y tratar de configurarlo de la forma más idónea, pero he ido línea a línea comprendiendo y corrigiendo constántemente errores, cambiando el enfoque de lo que estaba queriendo conseguir, exprimiéndome la sesera para entender cómo llegar a formular lo que necesitaba y celebrando cada pasito.

    ¡Espero que os guste!
