Make your own popsicle! Sponsered by Pokemon...Don't tell Nintendo.

This project allows users to create their own popsicle. First, they get to choose the color, flavor, and type of popsicle that they want. After, they can choose to have a picture of their favorite Pokemon put onto it. In addition, they have a choice of adding a joke too, either a random joke or one that they can write themselves. Once they have made their selection, it will be sent off to the popsicle factory to be made.

The first part of this project is creating the popsicle. There are three dropdowns with different colors, flavors, and types of popsicle. The user can choose anything from a green, vanilla, thin popsicle to an orange, orange, freeze pop, whatever the user wants. Once the selection is made, the create button will make an object with the selections and will return it as a global variable.

The next two parts are optional if the user would like to add a Pokemon or a joke to their popsicle. There are three ways to find the Pokemon, two in the search bar and one in the dropdown. The dropdown has all 1010 Pokemon in the Pokemon API. The list is in original Pokedex order but clicking the dropdown and typing the name int should go right to that Pokemon. The search bar is the other way to find Pokemon. The search bar will override anything that is within the dropdown menu so make sure that if the dropdown is being used not to fill the search bar with anything. The search bar can find Pokemon through their Pokedex number or by their name. If the name or number does not exist in the list, an alert will display to change the selection. When the user picks what they want and clicks Get Pokemon, it will send an object with the name and picture pulled from the API.

If nothing from the last paragraph makes sense, here is a link to the Pokedex with all the Pokemon in it - https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number

The last selection is for optional jokes to add to the popsicle stick or wrapper. The first part is to enter a setup and a punchline to a joke. When it is filled out, click "add joke" to add it to the list. If the user doesn't want to come up with their own joke, they can pull a random one from the random joke API. If they like the joke, they can add it by clicking save joke and it will be entered into the preview. The program then sends the third part of the popsicle back to the global variable with the setup and punchline of the joke.

Once each part is selected, it will show at the bottom of the screen with a preview. Next, the "create popsicle" button will ask the user if they are fine with their selection, and if they are, it will combine all three parts of the popsicle and turn it into a single variable. Finally, it posts the popsicleFinal variable into the db.json server where it can be picked up by the factory to create the popsicle.


PokeApi - https://pokeapi.co/

Official Joke API - https://github.com/15Dkatz/official_joke_api

Background - https://twitter.com/anemielle/status/1148276107671724033
