# Requisitos:

- Git
- Node.js (Version Recomendada: LTS)

1. Clonar el repositorio desde GitHub:
    git clone https://github.com/nsaini410/test_toolbox_cypress

2. Dirijirse al directorio raiz del proyecto e instalar las dependencias: 
    cd test_toolbox_cypress
    npm install

3. Instalar dependencias:
    npm install


# Para correr las pruebas desde terminal:
Desde la terminal y estando ubicado en el directorio raiz del proyecto utilizar los siguientes comandos:

Todos los comandos están configurados en archivo package.json dentro de "scripts".

- npm run allTests
    Con este comando se limpia la carpeta de los reportes y las capturas de pantalla en caso de errores. Corre tanto las pruebas 
    de api como las de ui. De no existir las carpetas usadas para generar los reportes, se crean durante la ejecución.

- npm run test-ui
    En caso de querer ejecutar solamente las pruebas de UI.

- npm run test-api 
    En caso de querer ejecutar solamente las pruebas de API.

En todos los casos se limpian los reportes antes de correr las pruebas.

Si se quiere visualizar el reporte se deben ejecutar los siguientes comandos:

- npm run allure:generate
    Con este comando se genera la carpeta allure-report en base a los resultados obtenidos en la
    última ejecución. Los resultados se guardan en la carpeta allure-results. No es necesario crear las carpetas antes
    de la primer ejecución de las pruebas.

- allure open
    Con este comando se levanta un servidor web para mostrar el reporte en formato html.

# Para correr las pruebas desde UI de Cypress:

- npx cypress open:
    Luego de abrir Cypress, seleccionar "E2E Testing" --> "Seleccionar navegador" --> "E2E Specs" --> "Seleccionar spec de api o ui"

# Sobre las pruebas

- UI:
    Se creo con el metodo de POM, se hizo una BasePage para contener los metodos que puedan ser utilizados por las otras pages.
    Se creo una LoginPage donde se guardan todas las acciones necesarias a realizar dentro de la página para la ejecución de las pruebas.
    Dentro de la carpeta fixtures en el archivo "loginSelectors.json" se guardaron los selectores a utilizar en LoginPage.
    El archivo con las pruebas y las respectivas aserciones se encuentra en 'e2e/ui/login.cy.ts'.
    Dentro de las pruebas se agregó el caso de borrar la cuenta creada para poder reutilizar los mismos datos, aunque obviamente es posible
    utlizar datos dinamicos, por ejemplo crear direcciones de mail, nombres y direcciones al azar.

- API:
    En el caso de las pruebas api se descargó un plugin "cypress-plugin-api" para poder tener la posibilidad de ver las llamadas y devoluciones
    del servicio a través de UI. En vez de hacer las llamadas con "cy.request()", se usa "cy.api()". Funcionan de la misma manera a la hora 
    de pasar parametros y utilizar el response para hacer validaciones.
    Se utlizaron distintos endpoints para intentar simular varios casos de prueba. Se usaron distintos metodos HTTP y se validaron tiempos de
    respuesta, códigos, body, parametros y headers. También se realizo un caso con un ejemplo de manejo de errores con un "try-catch". Me queda
    pendiente agregar más de esta lógica de manejo de errores en los demas casos de prueba.

# Mejoras pendientes

- Configuración para Integración Continua
- Implementar manejo de errores en todos los casos de prueba
- Crear funciones que pueden servir a nivel global en el proyecto para evitar repetición de código
- Cambiar de forma dinamica baseUrl entre las pruebas de UI y API
- Agregar más logs durante la ejecución de las pruebas
- Documentar con más detalle a través de comentarios la lógica utilizada tanto en pruebas y configuración.

