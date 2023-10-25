<?php
	$connect = new PDO("sqlite:intranetLogin.db");
	$nomUtilisateur = $_POST["nomUtilisateur"];
	$motDePasse = $_POST["motDePasse"];
	$hash = sha1($motDePasse);
	$code = $_POST["code"];
	if($code == 1) {
		$connect -> exec(sprintf("INSERT INTO Utilisateurs(nomUtilisateur, password) VALUES ('%s','%s')",$nomUtilisateur,$hash)); 
		include("accueil.html");
	}else if($code == 2) {
		$result = $connect -> query("SELECT nomUtilisateur,password FROM Utilisateurs");
		$grant = 0;
		while($ligne = $result -> fetch()) {
			if($nomUtilisateur === $ligne["nomUtilisateur"] and $hash === $ligne["password"]) {
				$grant = 1;
			}
		}
		if($grant) {
			include("accueil.html");
		}else{
			echo "<h1>Accès refusé</h1>";
		}
	}
?>
