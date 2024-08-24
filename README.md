# Proyecto de Cátedra - DAW

## Descripción del proyecto
### Software para un punto de venta de un autoservicio de una Pizza.
El cajero tiene la función de recibir los pedidos de los clientes y encargarse de procesar los pagos correspondientes; es fundamental que se asegure de que los pedidos se envíen correctamente a la cocina para su preparación y además de estas tareas, el cajero debe llevar un control de la información del cliente, asegurándose de que todos los datos sean precisos y estén actualizados.

Lógica a Utilizar:

1. **Recepción de Pedidos:**
- La entrada de Datos: El cajero debe de ingresar el pedido que ha hecho el cliente en el sistema, seleccionando los productos dentro del sistema ejemplo. (pizza, acompañantes, extras, bebidas, etc.…) y especificando cualquier tipo de personalización que tengan ejemplo. (tamaño, ingredientes extras, chile etc.).
- Verificación: El sistema debe de hacer una verificación de que los productos seleccionados se encuentran disponibles dentro del inventario que se maneja.
- Resumen del Pedido: El sistema generara un resumen del pedido en el que se mostraran los detalles de todo lo seleccionado por el cliente teniendo la información del cliente, la hora, el local, numero de orden, precio total, etc.…

2. **El procesamiento de Pagos:**
- Métodos de Pago: El cajero debe de seleccionar el método de pago que se hará (efectivo, cheque, certificado de regalo, etc.).
- Cálculo Total: El sistema calculara el total a pagar luego de hacer todo el pedido al cliente
- Validación del Pago: Si el método de pago es en efectivo el cajero pone la cantidad de dinero con la que se haría la compra y se calcularía el cambio y en el caso de que la compra se efectué con un tarjeta el sistema debe de hacer una validación de la transacción (pasarela de pagos)
- Registro de Transacción: Se registra la transacción y se emite un recibo para el cliente y otro para el local como comprobante físico y virtual de la compra.

3. **Envío de Pedido a Cocina:**
- Orden de Preparación: Cuando se ha procesado el pago, el pedido deberá pasar a el área de cocina automáticamente, donde se imprimen los detalles de los pedidos que se han realizado
- Actualización del Estado del Pedido: El sistema actualizara el estado del pedido como lo son (Espera, Preparación y Terminado).

4. **Gestión de Información del Cliente:**
- Registro de Cliente: Se registrará el Apellido de la persona en la que se reconocerá como (Sr./Srta.), el número de teléfono para futuros pedidos o promociones  
- Historial de Pedidos: Se registrará cada pedido de los clientes permitiendo repetir pedidos anteriores
 
---

### Grupo Teórico
DAW - 02T
### Integrantes
1. Josué Eduardo García Estrada - **GE240098**
2. Roberto Arturo Duarte Mejía - **DMGE240115**
3. Eduardo Alfredo Ramírez Torres - **RT240549**

---

## Enlaces a los recursos de planificación del Proyecto
### Notion
1. Tablero de Kanban: [Notion](https://brazen-anemone-98f.notion.site/303fbd5e101a492f8a51437be6f0f0ec?v=f089f43b2adf405ba9120b28a00c3ca2)

<p align="center"><img src="img/Screenshot/Tablero-kanban.png"/></p>

2. Cronograma de Trabajo: [Notion](https://brazen-anemone-98f.notion.site/Cronograma-de-Trabajo-bb45af8612b54bbcb4bf5f985eebcb29)

<p align="center"><img src="img/Screenshot/Cronograma.png"/></p>

### Figma 
1. Diseño de Mock ups en Figma: [Figma](https://www.figma.com/design/s5p1P9vlkDw74W6nFIKlvq/Mock-Ups-DAW?node-id=0-1&t=6m3Actf9aBI4eJ7B-1)

---

## Licencia

Este proyecto está licenciado bajo los términos de la **Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. Puedes encontrar una copia completa en el archivo [LICENSE](./LICENSE.md) o visitar [Creative Commons](https://creativecommons.org/licenses/by-nc/4.0/legalcode) para más detalles.