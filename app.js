const dinoString = {
  Dinos: [
    {
      species: 'Triceratops',
      weight: 13000,
      height: 114,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'First discovered in 1889 by Othniel Charles Marsh'
    },
    {
      species: 'Tyrannosaurus Rex',
      weight: 11905,
      height: 144,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'The largest known skull measures in at 5 feet long.'
    },
    {
      species: 'Anklyosaurus',
      weight: 10500,
      height: 55,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Anklyosaurus survived for approximately 135 million years.'
    },
    {
      species: 'Brachiosaurus',
      weight: 70000,
      height: '372',
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Jurasic',
      fact: 'An asteroid was named 9954 Brachiosaurus in 1991.'
    },
    {
      species: 'Stegosaurus',
      weight: 11600,
      height: 79,
      diet: 'herbavor',
      where: 'North America, Europe, Asia',
      when: 'Late Jurasic to Early Cretaceous',
      fact: 'The Stegosaurus had between 17 and 22 seperate places and flat spines.'
    },
    {
      species: 'Elasmosaurus',
      weight: 16000,
      height: 59,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.'
    },
    {
      species: 'Pteranodon',
      weight: 44,
      height: 20,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.'
    },
    {
      species: 'Pigeon',
      weight: 0.5,
      height: 9,
      diet: 'herbavor',
      where: 'World Wide',
      when: 'Holocene',
      fact: 'All birds are living dinosaurs.'
    }
  ]
}

// Create Dino Constructor
function Dino (species, weight, height, diet, when, where, fact) {
  this.species = species
  this.weight = weight
  this.height = height
  this.diet = diet
  this.when = when
  this.where = where
  this.fact = fact
}

// create dino Objects
const dinos = dinoString.Dinos.map(function (dino) {
  const dinoObject = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.when, dino.where, dino.fact)
  console.log(dinoObject)
  return dinoObject
})
console.log(dinos)

let animals = []

// Create Human Object
function Human (name, weight, height, diet) {
  this.name = name
  this.weight = weight
  this.height = height
  this.diet = diet
}

const formContainer = document.getElementById('dino-compare')
// Use IIFE to get human data from form
document.getElementById('btn').addEventListener('click', function (e) {
  (function getUserData () {
    const name = document.getElementById('name').value
    const feet = parseFloat(document.getElementById('feet').value)
    const inches = parseFloat(document.getElementById('inches').value)
    const height = (feet * 12) + inches
    const weight = parseFloat(document.getElementById('weight').value)
    const diet = document.getElementById('diet').value
    const human = new Human(name, weight, height, diet)
    animals = dinos
    animals.splice(4, 0, human)
    console.log('animals after human is added ' + animals)
    populateDivs(human)
  })()
})

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight (dinoWeight, weight) {
  const factor = dinoWeight / weight
  return `Weighs ${factor} times as much as you`
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight (dinoHeight, height) {
  const factor = dinoHeight / height
  return `Is ${factor} times taller than you`
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet (dinoDiet, diet) {
  const same = (dinoDiet === diet)
  if (same) {
    return `Is a ${diet} just like you`
  } else {
    return `Is a ${diet}, unlike you.`
  }
}

// Generate Tiles for each Dino in Array
function populateDivs (human) {
  const grid = document.getElementById('grid')
  animals.forEach(function (animal) {
    const element = document.createElement('div')
    element.className = 'grid-item'
    const nameElement = document.createElement('h3')
    const p = document.createElement('p')
    const img = document.createElement('img')
    if (animal instanceof Human) {
      nameElement.innerHTML = human.name
      img.src = 'images/human.png'
    } else {
      nameElement.innerHTML = animal.species
      img.src = `images/${animal.species}.png`
      if (animal.species === 'Pigeon') {
        p.innerHTML = animal.fact
      } else {
        p.innerHTML = generateFact(animal, human)
      }
    }
    element.appendChild(nameElement)
    element.appendChild(img)
    element.appendChild(p)
    // add tiles to DOM
    grid.append(element)
  })

  // Remove form from screen
  formContainer.remove()
}

function generateFact (animal, human) {
  let fact = ''
  const rand = Math.floor(Math.random() * 6) + 1
  switch (rand) {
    case 1:
      fact = animal.fact
      break
    case 2:
      fact = compareDiet(animal.diet, human.diet)
      break
    case 3:
      fact = compareHeight(animal.height, human.height)
      break
    case 4:
      fact = compareWeight(animal.weight, human.weight)
      break
    case 5:
      fact = `From the ${animal.when} period.`
      break
    case 6:
      fact = `Found in ${animal.where}`
      break
    default:
          // code block
  }
  console.log(rand + ' ' + fact)
  return fact
}

// On button click, prepare and display infographic
