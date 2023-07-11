//exporte la classe permettant d'etre utiliser dans un autre class/fichier
// declare class nommer UrlBuilder
export default class UrlBuilder {
    //on  declare une methode static nomme getUrl ayant comme parametre url(string) et params(objet)
    static getUrl(url, params) {
        // on retourne le parametre url concatene avec ? et le retour de la methode _getEncondedParams
        return url + "?" + this._getEncodeParams(params);
}
    //on declare une methode static nomme _getEncondedParams avec comme parametre params(objet)
    static _getEncodeParams(params) {
        //declare la variable encodedParams qui contient un tableau vide
        let encodeParams = [];
        // delcaration de la variabe prop qui contiendra le nom des parametres contenus dans l<objet params
        //Nous bouclons por chacun des paramaetre contenue dans l<objet params
        //La valeur de propr changera a chaque iteration. latitude -> longitude etc
        for (const prop in params) {
            //ajout de string dans le tableau encodedParams
            //traduction des characteres speciaux a l'interieur de prop et de la valeur de prop
            //concatenation du nom de la propriete + = + la valeur de cette propriete
            encodeParams.push(encodeURIComponent(prop) + "=" + encodeURIComponent(params[prop]));
    }
        //on retourne un collage de chacun des elements de notre tableau encodedParams avec &
        return encodeParams.join("&");
    }
}