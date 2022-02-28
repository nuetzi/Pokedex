const fetchData = () => {
    let id = document.getElementById("input1").value;

    // Step 1: Get data from URL / API
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    // Step 2: Use .then to handle the response/reject promise
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let adjustedName = data.name.split("-").join(" ");          // Replace hyphens with spaces
        pokemonName.innerHTML = `${adjustedName}`;
        pokemonNumber.innerHTML = `Pokédex #: ${data.id}`;
    
        if (data.types.length > 1) {
            pokemonType.innerHTML = `Type: ${data.types[0].type.name} / ${data.types[1].type.name}`;        // For dual-type Pokemon
        }
        else {
            pokemonType.innerHTML = `Type: ${data.types[0].type.name}`;         // For single-type Pokemon
        }

        let meters = data.height / 10;                      // Converts height info to meters
        let inches = data.height * 3.937;                   // Converts height info to inches
        let feet = Math.floor(inches/12);                   // Converting inches to whole feet
        let inchesRemainder = Math.round(inches % 12);      // Any remaining inches will be left here
        if (inchesRemainder == 12) {                        // Some cases will round up to 12 inches
            feet += 1;                                      // So this corrects by adjusting up to the next foot
            inchesRemainder = 0;                            // With 0 inches leftover
        }
        pokemonHeight.innerHTML = `Height: ${feet}'${inchesRemainder}"  / ${meters} m`;
    
        let kgs = (data.weight / 10).toFixed(1);                                // Converts weight info to kg with 1 decimal place
        let lbs = (data.weight * 0.2204623).toFixed(1);                         // Converts weight info to lbs with 1 decimal place
        pokemonWeight.innerHTML = `Weight: ${lbs} lbs  /  ${kgs} kg`;

        let ability1 = data.abilities[0].ability.name.split("-").join(" ");             // Replaces hyphens with space
        pokemonAbility1.innerHTML = `Ability 1: ${ability1}`;
        if (data.abilities.length > 1) {                                                // Check for multiple abilities
            let ability2 = data.abilities[1].ability.name.split("-").join(" ");
            pokemonAbility2.innerHTML = `Ability 2: ${ability2}`;
            if (data.abilities.length > 2) {
                let ability3 = data.abilities[2].ability.name.split("-").join(" ");     // No Pokémon has more than 3 abilities
                pokemonAbility3.innerHTML = `Ability 3: ${ability3}`;
            }
            else {
                pokemonAbility3.innerHTML = "";             // Prevents carrying over abilities from a previous lookup
            }
        }
        else {
            pokemonAbility2.innerHTML = "";
            pokemonAbility3.innerHTML = "";
        }

        pokemonArtwork.innerHTML = `<img src=${data.sprites.other["official-artwork"].front_default} width="250">`;
        pokemonSpriteDefault.innerHTML = `Normal: <br> <img src=${data.sprites.front_default}>`;
        pokemonSpriteShiny.innerHTML = `Shiny: <br> <img src=${data.sprites.front_shiny}>`;
    })
    .catch(() => {
        pokemonName.innerHTML = "Error: Invalid Pokémon Number";        // Clears all fields and displays an error message for invalid lookups
        pokemonNumber.innerHTML = "";
        pokemonType.innerHTML = "";
        pokemonHeight.innerHTML = "";
        pokemonWeight.innerHTML = "";
        pokemonAbility1.innerHTML = "";
        pokemonAbility2.innerHTML = "";
        pokemonAbility3.innerHTML = "";
        pokemonArtwork.innerHTML = `<img src="./missingno.png" width="250">`;
        pokemonSpriteDefault.innerHTML = "";
        pokemonSpriteShiny.innerHTML = "";
    })
}



document.getElementById("button").addEventListener('click', fetchData);
