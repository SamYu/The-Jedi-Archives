export const NUMERIC = 'NUMERIC';
export const CATEGORICAL = 'CATEGORICAL';
export const RELATIONAL = 'RELATIONAL';
export const AVAILABLE_APIS = {
    people: 'People',
    planets: 'Planets',
    species: 'Species',
    films: 'Films',
    vehicles: 'Vehicles',
    starships: 'Starships',
};

const people = {
    height: {
        displayName: 'Height',
        type: NUMERIC,
    },
    mass: {
        displayName: 'Mass',
        type: NUMERIC,
    },
    birth_year: {
        displayName: 'Birth year',
        type: NUMERIC,
    },
    hair_color: {
        displayName: 'Hair color',
        type: CATEGORICAL,
    },
    skin_color: {
        displayName: 'Skin color',
        type: CATEGORICAL,
    },
    eye_color: {
        displayName: 'Eye color',
        type: CATEGORICAL,
    },
    gender: {
        displayName: 'Gender',
        type: CATEGORICAL,
    },
    films: {
        displayName: 'Number of films appeared in',
        type: RELATIONAL,
    },
    vehicles: {
        displayName: 'Number of vehicles piloted',
        type: RELATIONAL,
    },
    starships: {
        displayName: 'Number of starships piloted',
        type: RELATIONAL,
    },
};

const planets = {
    rotation_period: {
        displayName: 'Rotational period',
        type: NUMERIC,
    },
    orbital_period: {
        displayName: 'Orbital period',
        type: NUMERIC,
    },
    diameter: {
        displayName: 'Diameter',
        type: NUMERIC,
    },
    gravity: {
        displayName: 'Gravity',
        type: NUMERIC,
    },
    surface_water: {
        displayName: 'Surface water percentage',
        type: NUMERIC,
    },
    population: {
        displayName: 'Population',
        type: NUMERIC,
    },
    climate: {
        displayName: 'Climate',
        type: CATEGORICAL,
    },
    terrain: {
        displayName: 'Terrain',
        type: CATEGORICAL,
    },
    residents: {
        displayName: 'Number of key residents',
        type: RELATIONAL,
    },
    films: {
        displayName: 'Number of films appeared in',
        type: RELATIONAL,
    },
};

const films = {
    characters: {
        displayName: 'Number of key characters appearances',
        type: RELATIONAL,
    },
    planets: {
        displayName: 'Number of unique planets shown',
        type: RELATIONAL,
    },
    starships: {
        displayName: 'Number of unique starships shown',
        type: RELATIONAL,
    },
    vehicles: {
        displayName: 'Number of unique vehicles shown',
        type: RELATIONAL,
    },
};

const species = {
    classification: {
        displayName: 'Classification',
        type: CATEGORICAL,
    },
    designation: {
        displayName: 'Designation',
        type: CATEGORICAL,
    },
    hair_colors: {
        displayName: 'Hair colors',
        type: CATEGORICAL,
    },
    skin_colors: {
        displayName: 'Skin colors',
        type: CATEGORICAL,
    },
    eye_colors: {
        displayName: 'Eye colors',
        type: CATEGORICAL,
    },
    language: {
        displayName: 'Language',
        type: CATEGORICAL,
    },
    average_height: {
        displayName: 'Average height',
        type: NUMERIC,
    },
    average_lifespan: {
        displayName: 'Average lifespan',
        type: NUMERIC,
    },
    // homeworld: {
    //     displayName: 'Homeworld',
    //     type: CATEGORICAL,
    // },
    people: {
        displayName: 'Number of key people',
        type: RELATIONAL,
    },
    films: {
        displayName: 'Number of films appeared in',
        type: RELATIONAL,
    },
};

const vehicles = {
    // model: {
    //     displayName: 'Model',
    //     type: RELATIONAL,
    // },
    cost_in_credits: {
        displayName: 'Cost in Credits',
        type: NUMERIC,
    },
    length: {
        displayName: 'Length',
        type: NUMERIC,
    },
    max_atmosphering_speed: {
        displayName: 'Max Atmosphering Speed',
        type: NUMERIC,
    },
    crew: {
        displayName: 'Crew',
        type: NUMERIC,
    },
    passengers: {
        displayName: 'Passengers',
        type: NUMERIC,
    },
    cargo_capacity: {
        displayName: 'Cargo Capacity',
        type: NUMERIC,
    },
    consumables: {
        displayName: 'Consumables',
        type: NUMERIC,
    },
    manufacturer: {
        displayName: 'Manufacturer',
        type: CATEGORICAL,
    },
    vehicle_class: {
        displayName: 'Vehicle Class',
        type: CATEGORICAL,
    },
    pilots: {
        displayName: 'Number of key pilots',
        type: RELATIONAL,
    },
    films: {
        displayName: 'Number of films appeared in',
        type: RELATIONAL,
    },
};

const starships = {
    // model: {
    //     displayName: 'Model',
    //     type: RELATIONAL,
    // },
    MGLT: {
        displayName: 'Speed in MGLT/hour',
        type: NUMERIC,
    },
    cost_in_credits: {
        displayName: 'Cost in credits',
        type: NUMERIC,
    },
    length: {
        displayName: 'Length',
        type: NUMERIC,
    },
    max_atmosphering_speed: {
        displayName: 'Max Atmosphering Speed',
        type: NUMERIC,
    },
    crew: {
        displayName: 'Crew',
        type: NUMERIC,
    },
    passengers: {
        displayName: 'Passengers',
        type: NUMERIC,
    },
    cargo_capacity: {
        displayName: 'Cargo Capacity',
        type: NUMERIC,
    },
    consumables: {
        displayName: 'Consumables',
        type: NUMERIC,
    },
    manufacturer: {
        displayName: 'Manufacturer',
        type: CATEGORICAL,
    },
    hyperdrive_rating: {
        displayName: 'Hyperdrive rating',
        type: CATEGORICAL,
    },
    starship_class: {
        displayName: 'Starship Class',
        type: CATEGORICAL,
    },
    pilots: {
        displayName: 'Number of key pilots',
        type: RELATIONAL,
    },
    films: {
        displayName: 'Number of films appeared in',
        type: RELATIONAL,
    },
};

export const apiSchemas = {
    people,
    planets,
    films,
    species,
    vehicles,
    starships,
};
