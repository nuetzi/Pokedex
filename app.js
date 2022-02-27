const fetchData = () => {
    let id = document.getElementById("input1").value;

    // Step 1: Get data from URL / API
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    // Step 2: Use .then to handle the response/reject promise
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        pokemonName.innerHTML = `Name: ${data.name}`;
        pokemonNumber.innerHTML = `Pokédex #: ${data.id}`;
    
        pokemonType1.innerHTML = `Type 1: ${data.types[0].type.name}`;
        if (data.types.length > 1) {
            pokemonType2.innerHTML = `Type 2: ${data.types[1].type.name}`;
        }

        let meters = data.height / 10;
        let inches = data.height * 3.937;
        let feet = Math.floor(inches/12);
        let inchesRemainder = Math.round(inches % 12);
        if (inchesRemainder == 12) {
            feet += 1;
            inchesRemainder = 0;
        }
        pokemonHeight.innerHTML = `Height: ${feet}' ${inchesRemainder}"  / ${meters}m`;
    
        let kgs = (data.weight / 10).toFixed(1);
        let lbs = (data.weight * 0.2204623).toFixed(1);
        pokemonWeight.innerHTML = `Weight: ${lbs}lbs  /  ${kgs}kg`;

        let ability1 = data.abilities[0].ability.name.split("-").join(" ");
        pokemonAbility1.innerHTML = `Ability 1: ${ability1}`;
        if (data.abilities.length > 1) {
            let ability2 = data.abilities[1].ability.name.split("-").join(" ");
            pokemonAbility2.innerHTML = `Ability 2: ${ability2}`;
            if (data.abilities.length > 2) {
                let ability3 = data.abilities[2].ability.name.split("-").join(" ");     // No Pokémon has more than 3 abilities
                pokemonAbility3.innerHTML = `Ability 3: ${ability3}`;
            }
        }

        pokemonArtwork.innerHTML = `<img src=${data.sprites.other["official-artwork"].front_default} width="250">`;
        pokemonSpriteDefault.innerHTML = `Normal: <br> <img src=${data.sprites.front_default}>`;
        pokemonSpriteShiny.innerHTML = `Shiny: <br> <img src=${data.sprites.front_shiny}>`;
    })
    .catch(() => {
        pokemonName.innerHTML = "Error: Invalid Pokémon Number";
        pokemonNumber.innerHTML = "";
        pokemonType1.innerHTML = "";
        pokemonType2.innerHTML = "";
        pokemonHeight.innerHTML = "";
        pokemonWeight.innerHTML = "";
        pokemonAbility1.innerHTML = "";
        pokemonAbility2.innerHTML = "";
        pokemonAbility3.innerHTML = "";
        pokemonArtwork.innerHTML = "";
        pokemonSpriteDefault.innerHTML = "";
        pokemonSpriteShiny.innerHTML = "";
    })
}



document.getElementById("button").addEventListener('click', fetchData);
