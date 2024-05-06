import random
import string 

class Utilisateur: 
    def __init__(self, nom, prenom, email, password): 
        self.nom = nom
        self.prenom = prenom
        self.email = email
        self.password = password
        self.role = 'Sans role'
        self.estActive = True

class Quiz:
    def __init__(self, titre, typeDeQuiz, cycleDeVie, choix):
        self.titre = titre
        self.typeDeQuiz = typeDeQuiz
        self.cycleDevie = cycleDeVie
        self.choix = choix
        self.estActive = True

class Administrateur(Utilisateur):
    def __init__(self, admin : Utilisateur):
        super().__init__(admin)
        self.role = 'Administrateur'
        
    def creerUtilisateur(self, user : Utilisateur):
        return Utilisateur(user)
    
    def creerQuiz(self, quizz : Quiz):
        return Quiz(quizz)
    
    def desactiverUtilisateur(self, user : Utilisateur): 
        user.estActive = False
        print("L'utilisateur' {user.prenom} a été désactivé.")
    
    def activerUtilisateur(self, user : Utilisateur): 
        print("L'utilisateur {user.prenom} a été  activé.")
    
    def desactiverQuiz(self, quizz : Quiz): 
        quizz.estActive = False
        print("Le quiz {quizz.titre} a été désactivé.")
    
    def activerQuiz(self, quizz : Quiz): 
        print("Le quiz {quizz.titre} a été activé.")

class Validateur(Utilisateur):
    def __init__(self, validateur : Utilisateur):
        super().__init__(validateur)
        self.role = 'Validateur'

    def validerCompte(self, user : Utilisateur):
        user.estActive = True
        print("Le compte de l'utilisateur {user.prenom} {user.nom} a été validé.")

    def creerQuiz(self, quizz : Quiz):
        return Quiz(quizz)

class AdministrateurQuiz(Utilisateur):
    def __init__(self, adminQuiz : Utilisateur):
        super().__init__(adminQuiz)
        self.role = 'Administrateur de Quiz'
    
    def desactiverQuiz(self, quizz : Quiz): 
        quizz.estActive = False
        print("L'utilisateur {quizz.titre} a été  désactivé.")
        
    def creerQuiz(self, quizz : Quiz):
        return Quiz(quizz)

class Createur(Utilisateur):
    def __init__(self, createur : Utilisateur):
        super().__init__(createur)
        self.role = 'Createur'

    def creerQuiz(self, quizz : Quiz):
        return Quiz(quizz)

class UtilisateurParDefaut(Utilisateur):
    def __init__(self, userParDefaut : Utilisateur):
        super().__init__(userParDefaut)
        self.role = 'Utilisateur'

    def changerMotDePasse(self, newPassword, user:Utilisateur):
        user.password = newPassword
        print("Mot de passe changé avec succès.")