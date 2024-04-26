 function filtrarFechas(datos, fechaInicio, fechaFin) {
    // Convertir las cadenas de fecha en objetos Date
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    // Filtrar los datos dentro del rango de fechas
    return datos.filter(item => {
        const fechaDato = new Date(item.fecha);
        return fechaDato >= fechaInicioObj && fechaDato <= fechaFinObj;
    });
}

function combinar(datos, fechas) {
    // Verificar que ambos arreglos tengan la misma longitud
    if (datos.length !== fechas.length) {
        throw new Error("Los arreglos de datos y fechas deben tener la misma longitud.");
    }

    // Iterar sobre uno de los arreglos y combinar los elementos
    return datos.map((dato, index) => [dato, fechas[index]]);
}

export { filtrarFechas, combinar };
