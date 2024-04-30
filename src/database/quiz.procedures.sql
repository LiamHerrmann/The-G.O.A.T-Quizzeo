use --ajout bdd

-- récupération des quiz au clic
 DELIMITER //

CREATE OR REPLACE PROCEDURE get**() 
BEGIN
  SELECT * FROM ** ;
END //

DELIMITER ;

-- création d'un quiz

CREATE OR REPLACE PROCEDURE post**( 
IN p_titre TEXT,
IN p_contenu TEXT,
IN p_image TEXT,
IN p_theme TEXT,
IN p_auteur TEXT,
IN p_date DATE
) 
BEGIN
  INSERT INTO ** (titre, contenu, image, theme, auteur, date) 
  VALUES (p_titre, p_contenu, p_image, p_theme, p_auteur, p_date);
END //

DELIMITER ;

-- suprression d'un quiz

