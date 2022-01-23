window.onload = function(){ 
	document.getElementById("login_button").onclick = function(){
		let login = document.getElementById("login_txt").value;
		if (login == "aboba")
			alert("ti admin?");
		else if (login == "primeuser1")
			window.open("pages/index_p.html");
		else if (login == "primeuser2")
			window.open("pages/index_p.html");
		else if (login == "primeuser3")
			window.open("pages/index_p.html");
		else if (login == "primeuser4")
			window.open("pages/index_p.html");
		else if (login == "primeuser5")
			window.open("pages/index_p.html");
		else
			window.open("pages/index_np.html");
};
};
