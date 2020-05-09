CREATE DATABASE emission ;

CREATE TABLE emission (
    emission_id SERIAL PRIMARY KEY,
    nom_emission VARCHAR(50),
    dure INTEGER ,
    date_emission DATE,
    animateur VARCHAR(50),
    visiteur VARCHAR(50)
);


CREATE TABLE chroniqueur (
    chroniqueur_id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    date_naissance DATE,
    num_tel BIGINT
);

CREATE TABLE emmission_chroniqueurs (
    id SERIAL PRIMARY KEY,
    emission_id INT,
    chroniqueur_id INT ,
    FOREIGN KEY (emission_id) REFERENCES emission(emission_id),
    FOREIGN KEY (chroniqueur_id) REFERENCES chroniqueur(chroniqueur_id)
);
