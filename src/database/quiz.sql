use quizzeo;

-- partie utilisateur
-- création utilisateur
DELIMITER $$

CREATE OR REPLACE PROCEDURE addUtilisateur (
    IN val_nom varchar(50),
    IN val_mdp varchar(50),
    IN val_mail varchar(50),
    IN val_role varchar(50)
)
BEGIN
    INSERT INTO utilisateur (nom, mdp, mail, role) VALUES
     (val_nom, val_mdp, val_mail, val_role);
     SELECT LAST_INSERT_nom() AS element;
END$$

DELIMITER ;

-- voir role utilisateur 

DELIMITER $$

CREATE OR REPLACE PROCEDURE getUtilisateur (
    IN val_nom varchar(50),
    IN val_role varchar(50)
)
BEGIN
    SELECT * FROM utilisateur LIMIT val_nom, val_role;
END$$

DELIMITER ;

-- Update

DELIMITER $$

CREATE OR REPLACE PROCEDURE updateUtilisateur (
    IN val_id INT,
    IN val_nom varchar(50),
    IN val_mdp varchar(50),
    IN val_mail varchar(50),
    IN val_role varchar(50)
)
BEGIN
    UPDATE utilisateur 
    SET nom = val_nom, mdp = val_mdp, mail = val_mail, role = val_role
    WHERE id = val_id;
END$$

DELIMITER ;

-- suppression

CREATE OR REPLACE PROCEDURE deleteUtilisateur (
    IN val_id INT
)
BEGIN
    DELETE FROM utilisateur WHERE id = val_id;
END$$

DELIMITER ;


-- partie quiz

-- création

DELIMITER $$

CREATE OR REPLACE PROCEDURE addQuiz (
    IN val_titre varchar(100),
    IN val_dc date,
    IN val_createur int(11),
    IN val_statut int(11),
    IN val_utilisateur int(11)
)
BEGIN
    INSERT INTO quiz (titre, dc, createur, statut, utilisateur) VALUES
     (val_titre, val_dc, val_createur, val_statut, val_utilisateur);
     SELECT LAST_INSERT_titre() AS element;
END$$

DELIMITER ;

-- Update

DELIMITER $$

CREATE OR REPLACE PROCEDURE updateQuiz (
    IN val_id INT,
    IN val_titre varchar(100),
    IN val_dc date,
    IN val_createur int(11),
    IN val_statut int(11),
    IN val_utilisateur int(11)

)
BEGIN
    UPDATE quiz 
    SET titre = val_titre, dc = val_dc, createur = val_createur, statut = val_statut, utilisateur = val_utilisateur
    WHERE id = val_id;
END$$

DELIMITER ;

-- suppression

CREATE OR REPLACE PROCEDURE deleteQuiz (
    IN val_id INT
)
BEGIN
    DELETE FROM Quiz WHERE id = val_id;
END$$

DELIMITER ;

