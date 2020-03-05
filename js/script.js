const calculatrice = document.querySelector('.calculatrice');
const touches = calculatrice.querySelectorAll('.toucheCalculatrice > button');
const affichage = document.querySelector('.ecranCalculatrice');

var valeur = 0;
var operateur = '';
var input = '';

function calcul(nb1, operateur, nb2) {
    input = '';
    switch(operateur) {
        case '+':
            return nb1 + nb2;
        case '-':
            return nb1 - nb2
        case '*':
            return nb1 * nb2
        case '/':
            return nb1 / nb2
        default:
            throw 'Je crois que ça ne fonctionne pas.';
    }
}

function clearMemoire() {
    input = '';
    valeur = 0;
    operateur = '';
}

function refreshAffichage() {
    affichage.textContent = input || operateur || valeur;
}

function converti(chaine) {
    return chaine ? parseFloat(chaine) : 0;
}

function negate(nombre) {
    return !isNaN(nombre) ? (nombre * -1) : NaN; 
}

// remplacé par slice car plus rapide
function supprime(chaine) {
    let temp = '';
    for(i=0; i < chaine.length - 1; i++){
        temp += chaine[i];
    }
    return temp;
}
// 
function debug() {
    console.log('valeur : ' + valeur, 'operateur : ' + operateur, 'input : ' + input)
}

// On récupère l'évènement et on l'attribue à une action selon nos data-action stocké dans l'html
touches.forEach(item => {
    item.addEventListener('click', event => {

        const key = event.currentTarget;
        const action = key.dataset.action;
         // ---------------------------------------------- // 
        switch (action) {

            case 'clearTotal':
                clearMemoire();
                break;

            case 'clear':
                input = '';
                break;

            case 'negate':
                if (input) {
                    input = negate(input);
                } else {
                    valeur = negate(valeur);
                }
                refreshAffichage();
                break;

            case 'supprime':
                input = input.slice(0, -1);
                break;

            case 'result':
                if (operateur && input) {
                    valeur = calcul(valeur, operateur, converti(input));
                }
                operateur = '';
                break;

            case '+':
            case '-':
            case '/':
            case '*':
                if (input) {
                    if (operateur) {
                        valeur = calcul(valeur, operateur, converti(input)); 
                    } else {
                        valeur = converti(input);
                    }
                }
                operateur = action;
                input = '';
                break;

            case 'decimal':
                if (!input.includes('.')) {
                    input += '.';
                }
                break;

            default:
                const nombre = key.textContent;
                input += nombre;
                break;
        }        
        refreshAffichage();
        debug();  
    })
})

