var joueurrouge = "R";
var joueurjaune = "J";
var joueuractuel = joueurrouge;

var gameOver = false;
var plateau;

var lignes = 7; // ligne du jeu
var colonnes = 7; // colonne du jeu
var colonneactuel = []; //permet de savoir à quelle ligne se trouve chaque colonne

var joueurrougeGagne = 0;
var joueurjauneGagne = 0;

window.onload = function() {
    lancejeu();
}

function lancejeu() {
    plateau = [];
    colonneactuel = [6, 6, 6, 6, 6, 6, 6]; // les colonnes commencent à l'index 6

    // Vider les cases existantes si elles existent déjà
    let mondiv = document.getElementById("mondiv");
    mondiv.innerHTML = ''; // Cette ligne vide toutes les cases dans le DOM

    // Créer de nouvelles cases
    for (let l = 0; l < lignes; l++) {
        let ligne = [];
        for (let c = 0; c < colonnes; c++) {
            ligne.push(' ');
            let cases = document.createElement("div");
            cases.id = l.toString() + "-" + c.toString();
            cases.classList.add("cases");
            cases.addEventListener("click", placerpion);
            mondiv.append(cases);
        }
        plateau.push(ligne);
    }

    // Cache les boutons de choix de fin de jeu au début
    document.getElementById("terminer-btn").style.display = "none";
    document.getElementById("continuer-btn").style.display = "none";
}

function placerpion() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let l = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    l = colonneactuel[c];

    if (l < 0) {
        return;
    }

    plateau[l][c] = joueuractuel;
    let cases = document.getElementById(l.toString() + "-" + c.toString());
    if (joueuractuel == joueurrouge) {
        cases.classList.add("pion-rouge");
        joueuractuel = joueurjaune;
    }
    else {
        cases.classList.add("pion-jaune");
        joueuractuel = joueurrouge;
    }

    l -= 1;
    colonneactuel[c] = l;

    verifgagnant();
}

function verifgagnant() {
    // horizontal
    for (let l = 0; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (plateau[l][c] != ' ') {
                if (plateau[l][c] == plateau[l][c+1] && plateau[l][c+1] == plateau[l][c+2] && plateau[l][c+2] == plateau[l][c+3]) {
                    declarergagnant(l, c);
                    return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < colonnes; c++) {
        for (let l = 0; l < lignes - 3; l++) {
            if (plateau[l][c] != ' ') {
                if (plateau[l][c] == plateau[l+1][c] && plateau[l+1][c] == plateau[l+2][c] && plateau[l+2][c] == plateau[l+3][c]) {
                    declarergagnant(l, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let l = 0; l < lignes - 3; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (plateau[l][c] != ' ') {
                if (plateau[l][c] == plateau[l+1][c+1] && plateau[l+1][c+1] == plateau[l+2][c+2] && plateau[l+2][c+2] == plateau[l+3][c+3]) {
                    declarergagnant(l, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let l = 3; l < lignes; l++) {
        for (let c = 0; c < colonnes - 3; c++) {
            if (plateau[l][c] != ' ') {
                if (plateau[l][c] == plateau[l-1][c+1] && plateau[l-1][c+1] == plateau[l-2][c+2] && plateau[l-2][c+2] == plateau[l-3][c+3]) {
                    declarergagnant(l, c);
                    return;
                }
            }
        }
    }
}

function declarergagnant(l, c) {
    let gagnant = document.getElementById("gagnant");
    if (plateau[l][c] == joueurrouge) {
        gagnant.innerText = "Le joueur rouge a gagné";  
        joueurrougeGagne++;
    } else {
        gagnant.innerText = "Le joueur jaune a gagné";
        joueurjauneGagne++;
    }
    gameOver = true;
    afficherChoixFin();
}

function afficherChoixFin() {
    // Afficher les boutons pour continuer ou terminer
    document.getElementById("terminer-btn").style.display = "block";
    document.getElementById("continuer-btn").style.display = "block";
}

function afficherSynthese() {
    let synthese = document.getElementById("synthese");
    synthese.innerText = "Le joueur rouge a gagné " + joueurrougeGagne + " fois.\nLe joueur jaune a gagné " + joueurjauneGagne + " fois.";
    
    // Cache les boutons de jeu
    document.getElementById("terminer-btn").style.display = "none";
    document.getElementById("continuer-btn").style.display = "none";
}

function continuer() {
    // Réinitialiser le jeu pour continuer à jouer
    gameOver = false;
    joueuractuel = joueurrouge;
    colonneactuel = [6, 6, 6, 6, 6, 6, 6];
    plateau = [];

    // Vider les cases existantes
    let mondiv = document.getElementById("mondiv");
    mondiv.innerHTML = '';

    // Créer de nouvelles cases
    for (let l = 0; l < lignes; l++) {
        let ligne = [];
        for (let c = 0; c < colonnes; c++) {
            ligne.push(' ');
            let cases = document.createElement("div");
            cases.id = l.toString() + "-" + c.toString();
            cases.classList.add("cases");
            cases.addEventListener("click", placerpion);
            mondiv.append(cases);
        }
        plateau.push(ligne);
    }

    // Réinitialiser l'affichage
    document.getElementById("gagnant").innerText = "";
    document.getElementById("synthese").innerText = "";

    // Cache les boutons de fin de jeu
    document.getElementById("terminer-btn").style.display = "none";
    document.getElementById("continuer-btn").style.display = "none";
}

function terminer() {
    // Afficher la synthèse et terminer le jeu
    afficherSynthese();
}
