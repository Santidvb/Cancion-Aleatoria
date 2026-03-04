//Elementos

let canciones = [
{c: "jackpot.mp3", jackpot: true},
{c: "7Weeks3Days.mp3", n: 70, jackpot: false, seguro: false},
{c: "9DeJulio.mp3", n: 10, jackpot: false, seguro: true},
{c: "505.mp3", n: 20, jackpot: false, seguro: true},
{c: "amorClasificado.mp3", n: 50, jackpot: false, seguro: false},
{c: "ardeLaCiudad.mp3", n: 40, jackpot: false, seguro: false},
{c: "astros.mp3", n: 60, jackpot: false, seguro: false},
{c: "aunEstasEnMisSueños.mp3", n: 80, jackpot: false, seguro: true},
{c: "boulevardOfBrokenDeams.mp3", n: 90, jackpot: false, seguro: false},
{c: "campanasEnLaNoche.mp3", n: 40, jackpot: false, seguro: false},
{c: "chachacha.mp3", n: 80, jackpot: false, seguro: false},
{c: "cicatrices.mp3", n: 20, jackpot: false, seguro: true},
{c: "ciudadMagica.mp3", n: 15, jackpot: false, seguro: true},
{c: "coqueta.mp3", n: 75, jackpot: false, seguro: false},
{c: "creo.mp3", n: 10, jackpot: false, seguro: true},
{c: "dieWithASmile.mp3", n: 30, jackpot: false, seguro: false},
{c: "doma.mp3", n: 70, jackpot: false, seguro: true},
{c: "elColmo.mp3", n: 50, jackpot: false, seguro: false},
{c: "enemy.mp3", n: 100, jackpot: false, seguro: true},
{c: "feelGoodInc.mp3", n: 80, jackpot: false, seguro: true},
{c: "fuego.mp3", n: 70, jackpot: false, seguro: false},
{c: "girlsLikeYou.mp3", n: 40, jackpot: false, seguro: false},
{c: "graduados.mp3", n: 50, jackpot: false, seguro: true},
{c: "iLoveYouBaby.mp3", n: 85, jackpot: false, seguro: false},
{c: "imposible.mp3", n: 5, jackpot: false, seguro: true},
{c: "iWannaBeYours.mp3", n: 35, jackpot: false, seguro: false},
{c: "kilometros.mp3", n: 65, jackpot: false, seguro: false},
{c: "laSueteEstáHechada.mp3", n: 15, jackpot: false, seguro: true},
{c: "laVelaPuerca.mp3", n: 55, jackpot: false, seguro: false},
{c: "mujerAmante.mp3", n: 80, jackpot: false, seguro: true},
{c: "nightDancer.mp3", n: 90, jackpot: false, seguro: false},
{c: "noSurprises.mp3", n: 40, jackpot: false, seguro: false},
{c: "nuncaQuise.mp3", n: 20, jackpot: false, seguro: false},
{c: "oblivion.mp3", n: 80, jackpot: false, seguro: false},
{c: "sunroof.mp3", n: 60, jackpot: false, seguro: false},
{c: "untilIFoundYou.mp3", n: 50, jackpot: false, seguro: false}
];

const comenzar = document.getElementById("comenzar");

let probJackpot  = 1;
const MAX = 100;
let audio = new Audio();

//Funciones

function reproducir(archivo) {
	audio.src = "media/audio/" + archivo;
	audio.play();
}

function elegirPorPunto(lista) {
	const total = lista.reduce((s, x) => s + x.n, 0);
	let r = Math.random() * total;
	
	for(const x of lista) {
	if (r < x.n) return x;
	r -= x.n	
	}
}


function manejarJackpot() {
	const jackpots = canciones.filter(x => x.jackpot);
	const j = jackpots[Math.floor(Math.andom() * jackpots.length)];
	reproducir(j.c);
	
	const raras = canciones.filter(x => !x.jackpot && x.n < 1 && !x.seguro);
	
	if(raras.length > 0) {
	const r = raras[Math.floor(Math.random() * raras.length)];
	r.seguro = true;	
	}
}


function reproducirNormal() {
  const aseguradas = canciones.filter(x => x.seguro);
  if (aseguradas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * aseguradas.length);
    const c = aseguradas[indiceAleatorio];
    c.seguro = false;
    reproducir(c.c);
    return;
  }
  const normales = canciones.filter(x => !x.jackpot);
  const c = elegirPorPunto(normales);
  reproducir(c.c);
}

function reproducirSiguiente() {
  const tirada = Math.random() * MAX;
  if (tirada < probJackpot) {
    manejarJackpot();
    probJackpot = 1;
  } else {
    reproducirNormal();
    probJackpot = Math.min(probJackpot + 1, MAX);
  }
}

comenzar.addEventListener("click", () => {
  reproducirSiguiente();
});

//Eventos

