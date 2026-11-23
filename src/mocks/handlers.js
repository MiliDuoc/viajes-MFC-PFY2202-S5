import {
  delay,
  graphql,
  http,
  HttpResponse
} from "msw"

const destinos = [
  {
    id: "san-pedro",
    ciudad: "San Pedro de Atacama",
    pais: "Chile",
    descripcion:
      "Desierto, paisajes altiplánicos y cielos privilegiados.",
    actividades: [
      "Valle de la Luna",
      "Géiseres del Tatio",
      "Lagunas Altiplánicas"
    ]
  },
  {
    id: "puerto-varas",
    ciudad: "Puerto Varas",
    pais: "Chile",
    descripcion:
      "Naturaleza, volcanes y lagos del sur de Chile.",
    actividades: [
      "Lago Llanquihue",
      "Volcán Osorno",
      "Saltos del Petrohué"
    ]
  },
  {
    id: "torres-del-paine",
    ciudad: "Torres del Paine",
    pais: "Chile",
    descripcion:
      "Uno de los destinos naturales más reconocidos de la Patagonia.",
    actividades: [
      "Trekking",
      "Miradores",
      "Glaciares"
    ]
  },
  {
    id: "valparaiso",
    ciudad: "Valparaíso",
    pais: "Chile",
    descripcion:
      "Patrimonio, cerros, arte urbano y costa del Pacífico.",
    actividades: [
      "Cerro Alegre",
      "Ascensores",
      "Paseo Yugoslavo"
    ]
  }
]

const opciones = {
  "san-pedro": {
    vuelos: [
      {
        id: "V001",
        aerolinea: "LATAM",
        origen: "Santiago",
        destino: "Calama",
        fecha: "15-12-2026",
        precio: 84990,
        disponible: true
      },
      {
        id: "V002",
        aerolinea: "Sky Airline",
        origen: "Santiago",
        destino: "Calama",
        fecha: "16-12-2026",
        precio: 72990,
        disponible: true
      }
    ],
    hoteles: [
      {
        id: "H001",
        nombre: "Hotel Atacama",
        noches: 3,
        precio: 189990,
        disponible: true
      },
      {
        id: "H002",
        nombre: "Casa del Desierto",
        noches: 3,
        precio: 149990,
        disponible: true
      }
    ]
  },

  "puerto-varas": {
    vuelos: [
      {
        id: "V003",
        aerolinea: "LATAM",
        origen: "Santiago",
        destino: "Puerto Montt",
        fecha: "18-12-2026",
        precio: 67990,
        disponible: true
      }
    ],
    hoteles: [
      {
        id: "H003",
        nombre: "Hotel Lago Llanquihue",
        noches: 3,
        precio: 169990,
        disponible: true
      }
    ]
  },

  "torres-del-paine": {
    vuelos: [
      {
        id: "V004",
        aerolinea: "Sky Airline",
        origen: "Santiago",
        destino: "Puerto Natales",
        fecha: "20-12-2026",
        precio: 109990,
        disponible: true
      }
    ],
    hoteles: [
      {
        id: "H004",
        nombre: "Patagonia Lodge",
        noches: 4,
        precio: 289990,
        disponible: true
      }
    ]
  },

  valparaiso: {
    vuelos: [],
    hoteles: [
      {
        id: "H005",
        nombre: "Hotel Cerro Alegre",
        noches: 2,
        precio: 99990,
        disponible: true
      },
      {
        id: "H006",
        nombre: "Puerto Hotel",
        noches: 2,
        precio: 79990,
        disponible: false
      }
    ]
  }
}

export const handlers = [
  http.get("*/api/destinos", async ({ request }) => {
    await delay(700)

    const url = new URL(request.url)

    if (url.searchParams.get("error") === "500") {
      return HttpResponse.json(
        {
          mensaje:
            "No fue posible obtener los destinos."
        },
        {
          status: 500
        }
      )
    }

    return HttpResponse.json(destinos)
  }),

  graphql.query(
    "GetOpcionesViaje",
    async ({ variables, request }) => {
      await delay(900)

      const simularError =
        request.headers.get("X-Simular-Error")

      if (simularError === "true") {
        return HttpResponse.json({
          errors: [
            {
              message:
                "Error simulado del servidor GraphQL."
            }
          ]
        })
      }

      const resultado =
        opciones[variables.destino]

      if (!resultado) {
        return HttpResponse.json({
          errors: [
            {
              message:
                "No se encontraron opciones para este destino."
            }
          ]
        })
      }

      return HttpResponse.json({
        data: {
          opcionesViaje: resultado
        }
      })
    }
  )
]