let klike = document.getElementById("Klike");
let toggle = document.getElementById("toggle");
let formulaire = document.getElementById("formulaire");
let code = document.getElementById("code");
let interval;
let correct = true;

function permuter() {
    if(code.value == "2") {
        formulaire.innerHTML = `
                    <img id="Dimage" src="IMAGES/Orthopedic.gif" alt="locked">
                    <h1>Administration</h1><br><br>
                    <label for="nomUtilisateur"><b>Nom d'utilisateur</b></label><br>
                    <input type="text" name="nomUtilisateur" required><br><br>
                    <label for="motDePasse"><b>Mot de passe</b></label><br>
                    <input id="motDePasse" type="password" name="motDePasse" required><br><b class="errorLogs"></b><br>
                    <label for="motDePasse"><b>Confirmation de mot de passe</b></label><br>
                    <input id="motDePasseConfirm" type="password" name="motDePasseConfirm" required><br><b class="errorLogs"></b><br>

                    <input id="code" type="hidden" value="1" name="code"/>
                    <button id="Klike" type="submit" class="button" onclick="return Klik()">S'inscrire</button><br>
                    <i id="toggle" onclick="permuter()"/>Se connecter</i>`;
                    code.value = "1";
    }else if(code.value == "1") {
        formulaire.innerHTML = `
                    <img id="Dimage" src="IMAGES/lock.png" alt="locked">
                    <h1>Administration</h1><br><br>
                    <label for="nomUtilisateur"><b>Nom d'utilisateur</b></label><br>
                    <input type="text" placeholder="" name="nomUtilisateur" required><br><br>
                    <label for="motDePasse"><b>Mot de passe</b></label><br>
                    <input id="motDePasse" type="password" placeholder="" name="motDePasse" required><br><b id="invalide"></b><br>
                    <input id="code" type="hidden" value="2" name="code"/>
                    <button id="Klike" type="submit" class="button" onclick="return Klik()">Se connecter</button><br>
                    <i id="toggle" onclick="permuter()">S'inscrire</i>`;
                    code.value = "2";
                    //window.closeInTerval(interval);
    }
}
function validerMotDePasse() {
        let correct = true;
        let motDePasse = document.getElementById("motDePasse");
        motDePasse = motDePasse.value.replace(/\s/g,"");
        let lenMDP = motDePasse.length;
        let [minuscules,majuscules,chiffres,speciaux] = [0,0,0,0];
        let Dregex = /[a-z]/i;
        let invalide = document.getElementById("invalide");

        for(l of motDePasse) {
                if(!isNaN(l)) {
                        chiffres += 1;
                }else{
                        if(Dregex.test(l)) {
                                if(l == l.toLowerCase()) {
                                        minuscules += 1;
                                }
                                if(l == l.toUpperCase()) {
                                        majuscules += 1;
                                }
                        }
                }
        }
        speciaux = lenMDP - (minuscules + majuscules + chiffres);
        if(motDePasse.length < 8 || majuscules < 2 || chiffres < 2 || speciaux < 2) {
                correct = false;
        }
        return correct;
}

function validerConfirm(password,confirm,errorLogs) {
	correct = true;
	Klike.disabled = false;
	if(validerMotDePasse()) {
		errorLogs[0].textContent = "";
	}else{
		errorLogs[0].textContent = "Le mot de passe doit avoir 8 caractères dont 2 chiffres, 2 majuscules et 2 caractères spéciaux";
		correct = false;
		Klike.disabled = true;
	}
    if(password.value === confirm.value) {
        errorLogs[1].textContent = "";
    }else{
        errorLogs[1].textContent = "Les mots de passe ne correspondent pas";
        correct = false;
        Klike.disabled = true;
    }
}

function Klik(event) {
	return correct;
}

interval = window.setInterval(function(){
	let password = document.getElementById("motDePasse");
	let confirm = document.getElementById("motDePasseConfirm");                             
	let errorLogs = document.getElementsByClassName("errorLogs");
	if(confirm != null) {
		validerConfirm(password,confirm,errorLogs);
	}
},50);
