const data = [
    {
        "id": 1,
        "nombre": "Camiseta CoffeeCoder",
        "descripcion": "Camiseta de algodón 100% con estampado CoffeeCoder.",
        "precio": 25.99,
        "stock": 150,
        "categoria": "Ropa",
        "imagenes": [
            "https://myecommerce.com/images/camiseta-coffeecoder-frente.jpg",
            "https://myecommerce.com/images/camiseta-coffeecoder-dorso.jpg"
        ]
    },
    {
        "id": 2,
        "nombre": "Auriculares Bluetooth Pro",
        "descripcion": "Auriculares inalámbricos con cancelación de ruido y micrófono integrado.",
        "precio": 89.50,
        "stock": 75,
        "categoria": "Tecnología",
        "imagenes": [
            "https://myecommerce.com/images/auriculares-bluetooth.jpg"
        ]
    },
    {
        "id": 3,
        "nombre": "Mochila Gamer RGB",
        "descripcion": "Mochila con luces LED RGB y compartimento para laptop de hasta 17”.",
        "precio": 59.99,
        "stock": 30,
        "categoria": "Accesorios",
        "imagenes": [
            "https://myecommerce.com/images/mochila-gamer.jpg"
        ]
    },
    {
        "id": 4,
        "nombre": "Taza térmica CoffeeCoder",
        "descripcion": "Taza de acero inoxidable con tapa hermética, mantiene la bebida caliente por 8 horas.",
        "precio": 15.00,
        "stock": 200,
        "categoria": "Hogar",
        "imagenes": [
            "https://myecommerce.com/images/taza-coffeecoder.jpg"
        ]
    },
    {
        "id": 5,
        "nombre": "Teclado Mecánico Retroiluminado",
        "descripcion": "Teclado mecánico con switches azules y retroiluminación RGB.",
        "precio": 120.00,
        "stock": 50,
        "categoria": "Tecnología",
        "imagenes": [
            "https://myecommerce.com/images/teclado-mecanico.jpg"
        ]
    }
]


const recuperarDatos = () => {
    // logica
    return data;
}

const guardarDato = (newData) => {
    data.push(newData)
    return newData
}


const apdateDatoById = () => {

}


const deleteById = () => {

}


export {
    recuperarDatos,
    guardarDato,
    apdateDatoById,
    deleteById,
}