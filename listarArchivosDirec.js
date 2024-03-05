const fs = require('fs');
const path = require('path');

function listarArchivosDirectorios(rutaDirectorio) {
    // Lee el contenido del directorio
    fs.readdir(rutaDirectorio, (error, archivos) => {
        //Estructura condicional para obtener error si un directorio es inexistente 
        if (error) {
            console.error('Error al leer el directorio:', error);
            return;
        }

        // Itera sobre cada archivo/directorio
        archivos.forEach(archivo => {
            // Obtiene la ruta completa del archivo y directorio
            const rutaCompleta = path.join(rutaDirectorio, archivo);
            // Obtiene información sobre el archivo/directorio
            fs.stat(rutaCompleta, (error, stat) => {
                //Condicional para el manejo de errores que pueda ocurrir al obtener información 
                if (error) {
                    console.error('Error al obtener información del archivo y directorio:', error);
                    return;
                }

                // Verifica si es un directorio
                if (stat.isDirectory()) {
                    //Impresión del directorio (archivo) y su ruta completa (rutaCompleta).
                    console.log('Directorio:', archivo, '- Ruta:', rutaCompleta);
                    // Si es un directorio, llamada recursiva para listar su contenido
                    listarArchivosDirectorios(rutaCompleta);
                } else {
                    console.log('Archivo:', archivo, '- Ruta:', rutaCompleta);
                }

            });
        });
    });
}

// Ruta del directorio a listar 
//Toma los argumentos de la línea de comandos proporcionados al ejecutar el script los une en una sola cadena
const rutaDirectorio = process.argv.slice(2).join(" ");

// Verifica si se proporcionó una ruta de directorio como argumento
if (!rutaDirectorio) {
    console.error('Por favor, proporciona la ruta de un directorio como argumento.');
    //Termina la ejecución del proceso 
    process.exit(1);
}

// Llama a la función para listar archivos y directorios
listarArchivosDirectorios(rutaDirectorio);
