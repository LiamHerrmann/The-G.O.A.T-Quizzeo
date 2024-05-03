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
    INSERT INTO Utilisateurs (nom, mdp, mail, role) VALUES
     (val_nom, val_mdp, val_mail, val_role);
     SELECT LAST_INSERT_nom() AS element;
END$$

DELIMITER ;

-- voir role utilisateur 

DELIMITER $$

CREATE OR REPLACE PROCEDURE getUtilisateurs (
    IN val_nom varchar(50),
    IN val_role varchar(50)
)
BEGIN
    SELECT * FROM Utilisateurss LIMIT val_nom, val_role;
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
    UPDATE Utilisateurs 
    SET nom = val_nom, mdp = val_mdp, mail = val_mail, role = val_role
    WHERE id = val_id;
END$$

DELIMITER ;

-- suppression

CREATE OR REPLACE PROCEDURE deleteUtilisateur (
    IN val_id INT
)
BEGIN
    DELETE FROM Utilisateurs WHERE id = val_id;
END$$

DELIMITER ;


-- partie quiz

-- création

DELIMITER $$

CREATE OR REPLACE PROCEDURE addUQuiz (
    IN val_titre varchar(100),
    IN val_dc date,
    IN val_createur int(11),
    IN val_statut int(11),
    IN val_utilisateur int(11)
)
BEGIN
    INSERT INTO UQuizs (titre, dc, createur, statut, utilisateur) VALUES
     (val_titre, val_dc, val_createur, val_statut, val_utilisateur);
     SELECT LAST_INSERT_titre() AS element;
END$$

DELIMITER ;

-- Update

DELIMITER $$

CREATE OR REPLACE PROCEDURE updateUQuiz (
    IN val_id INT,
    IN val_titre varchar(100),
    IN val_dc date,
    IN val_createur int(11),
    IN val_statut int(11),
    IN val_utilisateur int(11)

)
BEGIN
    UPDATE UQuizs 
    SET titre = val_titre, dc = val_dc, createur = val_createur, statut = val_statut, utilisateur = val_utilisateur
    WHERE id = val_id;
END$$

DELIMITER ;

-- suppression

CREATE OR REPLACE PROCEDURE deleteUQuiz (
    IN val_id INT
)
BEGIN
    DELETE FROM UQuizs WHERE id = val_id;
END$$

DELIMITER ;

