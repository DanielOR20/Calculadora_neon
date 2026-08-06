# Casos de prueba manuales

| # | Accion | Resultado esperado |
|---|--------|---------------------|
| 1 | `5 + 3 =` | `8` |
| 2 | `10 - 4 =` | `6` |
| 3 | `6 * 7 =` | `42` |
| 4 | `1 / 3 =` | Resultado redondeado a 5 decimales |
| 5 | `5 / 0 =` | Efecto glitch + mensaje "Error" |
| 6 | `50 %` | `0.5` (instantaneo, sin necesitar `=`) |
| 7 | Boton `C` | Limpia todo el estado, incluyendo historial |
| 8 | Boton borrar | Borra el ultimo digito ingresado |
| 9 | Teclado + Enter | Igual comportamiento que con mouse |
| 10 | Escribir 13+ digitos | Se detiene en el maximo permitido |