import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import pokeSearchGif from "../assets/images/pikachu-pokemon.gif"
import BarLoader from "react-spinners/BarLoader";

function PokemonDetails() {

  const [ pokemon, setPokemon ] = useState(null)

  const dynamicParams = useParams()
  // console.log(dynamicParams)

  const navigate = useNavigate()

  // 1. el componentDidMount que llamará a la API
  useEffect(() => {

    setPokemon(null) // forzar la animación de loading a aparecer mientras se busca la nueva

    // 2. un fetch para la llamada
    axios.get(`https://pokeapi.co/api/v2/pokemon/${dynamicParams.pokemonName}`)
    .then((response) => {
      console.log(response)
      // 3. almacenamos la data en un estado
      setTimeout(() => {
        setPokemon(response.data)
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
      // gestores de error 500 (error del servidor)
      // lo redirijimos a la página de tipo error
      navigate("/error")
    })

    // lo usamos como componentDidMount y como componentDidUpdate de parametro dinamico
  }, [dynamicParams.pokemonName])

  // 4. Efectos de espera de carga (loading)
  if (pokemon === null) {
    return (
      <div>
        <img src={pokeSearchGif} alt="pikachu-search" />
        <br />
        <br />
        <BarLoader width={"100%"} height={10} color="red"/>
      </div>
    )
  }

  return (
    <div>
      
        {/* //5 imprimimos la data */}
        <h2>Detalles de Pokemon</h2>

        <h3>Nombre: {pokemon.name} </h3>
        <img src={pokemon.sprites.front_default} alt="imagen-pokemon" />
        <p>weight: {pokemon.weight} </p>
        <p>height: {pokemon.height}</p>

    </div>
  )
}

export default PokemonDetails