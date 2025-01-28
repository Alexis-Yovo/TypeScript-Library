// Interface pour typer les propriétés de la class Livre
interface ILivre {
    id: number;
    titre: string;
    auteur: string;
    anneePublication: number;
    emprunteur?: IUser | null;
}

// Interface pour typer les props et méthodes de la class User
interface IUser {
    nom: string;
    email: string;
    livreEmpruntes: ILivre[];
    emprunterLivre(livre: ILivre): void;
    retournerLivre(livre: ILivre): void;
}

// Class pour l'instanciation d'un livre à emprunter par un user
class Livre implements ILivre {
    public emprunteur?: IUser | null | undefined = null;
    constructor(public id: number, public titre: string, public auteur: string, public anneePublication: number) { }
}

class User implements IUser {
    public livreEmpruntes: ILivre[] = [];
    constructor(public nom: string, public email: string) { }

    emprunterLivre(livre: Livre) {
        if (!livre.emprunteur) { // On vérifie que le livre n'est pas emprunté par un autre
            this.livreEmpruntes.push(livre);
            livre.emprunteur = this; // On associe le livre à l'user dans la prop emprunteur
        } else { // le livre est déjà emprunté sale voleur
            console.error("T'es arrivé trop tard le livre est déjà prit");
        }
    }

    retournerLivre(livre: Livre) {
        // On reucp l'idx du livre saisit en param dans le tableau des livresEmpruntes
        // (on ne peut pas rendre un livre qu'on n'a pas emprunté)
        const index = this.livreEmpruntes.indexOf(livre);
        if (index === -1) {
            console.error("Tu ne vas rendre un livre que tu n'as pas emprunté");
        } else {
            livre.emprunteur = null;
            this.livreEmpruntes.slice(index, 1);
        }
    }
}


class Bibliotheque {
    private livres: ILivre[] = [];
    private users: IUser[] = []

    // On liste la liste des livres (empruntés ou non)
    listeLivres(): ILivre[] {
        return this.livres;
    }

    // On liste la liste des abonnés
    listeUsers(): IUser[] {
        return this.users;
    }

    // On ajoute un livre à la bibli
    ajouterLivre(livre: ILivre) {
        this.livres.push(livre);
    }

    // On ajoute un utilisateur à la bibli
    ajouterUser(user: IUser) {
        this.users.push(user);
    }

    // retirer un livre de la bibli
    retirerLivre(livre: ILivre) {
        const index = this.livres.indexOf(livre);
        if (index === -1) {
            console.error("Ce livre n'existe pas dans la bibli");
        } else {
            this.livres.splice(index,1)
        }
    }

    // Recherche un livre
    rechercheLivre(titre?: string, auteur?: string, anneePublication?: number): ILivre[] {
        titre = titre?.toLocaleLowerCase()?.trim()
        auteur = auteur?.toLocaleLowerCase()?.trim();

        return this.livres.filter((livre) => {
            (!titre || livre.titre.toLocaleLowerCase().includes(titre)) &&
            (!auteur || livre.auteur.toLocaleLowerCase().includes(auteur)) &&
            (!anneePublication || livre.anneePublication === anneePublication)
        });
    }

}

const bibli = new Bibliotheque();

const Paul = new User("Paul Dupont", "paul.dupont@3wa.fr");
const Greg = new User("Greg Aaa", "greg.aaa@3wa.fr");

const SeigneurDesAnneaux = new Livre(1, "Le Seigneur des Anneaux", "J.R.R Tolkien", 1954);
const DetectiveConan = new Livre(2, "Detective Conan", "Gosho Aoyama", 1994);

bibli.ajouterLivre(SeigneurDesAnneaux);
bibli.ajouterLivre(DetectiveConan);

console.table(bibli.listeLivres());

Paul.emprunterLivre(DetectiveConan);

console.table(bibli.listeLivres());

Greg.emprunterLivre(SeigneurDesAnneaux)
console.table(bibli.listeLivres());

console.table(Greg.livreEmpruntes);
console.table(Paul.livreEmpruntes);
