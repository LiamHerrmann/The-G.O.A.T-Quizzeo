<?php

class Utilisateur {
    protected $nom;
    protected $prenom;
    protected $email;
    protected $password;
    protected $role;
    protected $estActive = TRUE;

    function __construct($nom, $prenom, $email, $password) {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->email = $email;
        $this->password = $password;
        $this->role = 'Sans role';
        $this->estActive;
    }
}

class Quiz {
    protected $titre;
    protected $typeDeQuiz;
    protected $cycleDeVie;
    protected $choix;
    protected $questionQuizz=array();

    function __construct($titre, $typeDeQuiz, $cycleDeVie, $choix) {
        $this->titre = $titre;
        $this->typeDeQuiz = $typeDeQuiz;
        $this->cycleDeVie = $cycleDeVie;
        $this->choix = $choix;
        $this->questionQuizz = array();
    }

    function ajouter_question(Quiz $quizz, $questions) {
        if($quizz->cycleDeVie == 'Creation') {
            array_push($quizz->questionQuizz,$questions);
        } else {
            echo "Impossible d'ajouter des questions à un quizz Lancé ou Terminé";
        }
    }  

    function repondre_quizz(Utilisateur $user, Quiz $quizz, $reponses) {
        if($quizz->cycleDeVie == 'Lancé') {
            foreach ($quizz->questions as $question) {
                echo "Question : {$question->texte}\n";
                $reponseUtilisateur = readline("Votre réponse (Vrai/Faux) : ");
                if ($reponseUtilisateur === $question->reponseAttendue) {
                    echo "Bonne réponse !\n";
                } else {
                    echo "Mauvaise réponse !\n";
                }
            }
        } else {
            echo "Impossible de répondre au quiz car il n'est pas en cours.\n";
        }
    }

    function modifier_quiz(Quiz $quizz) {
        if ($quizz->cycleDeVie == 'Creation') {
            $this->titre = $quizz->titre;
            $this->typeDeQuiz = $quizz->typeDeQuiz;
            $this->choix = $quizz->choix;
        } else {
            echo "Impossible de modifier le quiz car il n'est pas en cours de création.";
        }
    }

    function verifier_etat_creation(Quiz $quizz) {
        if ($quizz->cycleDeVie == "Creation") {
            echo "Le quiz est actuellement en cours de création.";
        } elseif ($quizz->cycleDeVie == "Lance") {
            echo "Le quiz a été terminé et ne peut plus être modifié.";
        } else {
            echo "Le quiz est dans un état inconnu.";
        }
    }
}

class Administrateur extends Utilisateur {

    function __construct($nom, $prenom, $email, $password) {
        parent::__construct($nom, $prenom, $email, $password);
        $this->role = 'Administrateur'; 
    }

    function creerUtilisateur($nom, $prenom, $email, $password) {
        return new Utilisateur($nom, $prenom, $email, $password);
    }

    function creerQuiz($titre, $typeDeQuiz, $cycleDeVie, $choix) {
        return new Quiz($titre, $typeDeQuiz, $cycleDeVie, $choix);
    }

    function desactiverUtilisateur(Utilisateur $user) {
        $user->estActive = false;
        echo "L'utilisateur $user->prenom a été désactivé.";
    }

    function activerUtilisateur(Utilisateur $user) {
        echo "L'utilisateur $user->prenom a été activé.";
    }

    function desactiverQuiz(Quiz $quizz) {
        $quizz->estActive = false;
        echo "Le quiz $quizz->titre a été désactivé.";
    }

    function activerQuiz(Quiz $quizz) {
        echo "Le quiz $quizz->titre a été activé.";
    }
}

class Validateur extends Utilisateur {

    function __construct($nom, $prenom, $email, $password) {
        parent::__construct($nom, $prenom, $email, $password);
        $this->role = 'Validateur'; 
    }

    function validerCompte(Utilisateur $user) {
        $user->estActive = true;
        echo "Le compte de l'utilisateur $user->prenom $user->nom a été validé.";
    }

    function creerQuiz($titre, $typeDeQuiz, $cycleDeVie, $choix) {
        return new Quiz($titre, $typeDeQuiz, $cycleDeVie, $choix);
    }
}

class AdministrateurQuiz extends Utilisateur {

    function __construct($nom, $prenom, $email, $password) {
        parent::__construct($nom, $prenom, $email, $password);
        $this->role = 'Administrtateur de Quiz'; 
    }

    function desactiverQuiz(Quiz $quizz) {
        $quizz->estActive = false;
        echo "L'utilisateur $quizz->titre a été désactivé.";
    }

    function creerQuiz($titre, $typeDeQuiz, $cycleDeVie, $choix) {
        return new Quiz($titre, $typeDeQuiz, $cycleDeVie, $choix);
    }
}

class Createur extends Utilisateur {

    function __construct($nom, $prenom, $email, $password) {
        parent::__construct($nom, $prenom, $email, $password);
        $this->role = 'createur'; 
    }

    function creerQuiz($titre, $typeDeQuiz, $cycleDeVie, $choix) {
        return new Quiz($titre, $typeDeQuiz, $cycleDeVie, $choix);
    }
}

class UtilisateurParDefaut extends Utilisateur {

    function __construct($nom, $prenom, $email, $password) {
        parent::__construct($nom, $prenom, $email, $password);
        $this->role = 'Utilisateur'; 
    }

    function changerMotDePasse($newPassword, Utilisateur $user) {
        $user->password = $newPassword;
        echo "Mot de passe changé avec succès.";
    }
}

?>