let seuVotoPara = document.querySelector(".d--1--1 span");
let cargo = document.querySelector(".d--1--2 span");
let descricao = document.querySelector(".d--1--4");
let aviso = document.querySelector(".d--2");
let lateral = document.querySelector(".d--1--right");
let numeros = document.querySelector(".d--1--3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;
let votos = [];

const APERTA_BOTAO = new Audio();
APERTA_BOTAO.src = "sounds/aperta_botao.mp3";

const CONFIRMA_VOTO = new Audio();
CONFIRMA_VOTO.src = "sounds/confirma_voto.mp3";

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHtml = "";
  numero = "";
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  //monta os dados do candidato
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    aviso.style.display = "block";

    //monta os dados da foto
    let fotosHtml = "";
    for (let i = 0; i < candidato.fotos.length; i++) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d--1--image small"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
      } else {
        fotosHtml += `<div class="d--1--image"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
      }
    }

    lateral.innerHTML = fotosHtml;
  } else {
    //não encontrou o candidato
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
  }
}

function clicou(n) {
  let elNumero = document.querySelector(".numero.pisca");
  if (elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove("pisca");
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add("pisca"); //adiciona a classe pisca ao proximo elemento
    } else {
      atualizaInterface();
    }
    APERTA_BOTAO.play();
  }
}

function branco() {
  numero = "";
  votoBranco = true;
  seuVotoPara.style.display = "block";
  aviso.style.display = "block";
  descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
  numeros.innerHTML = "";
  lateral.innerHTML = "";
  APERTA_BOTAO.play();
}

function corrige() {
  comecarEtapa();
  APERTA_BOTAO.play();
}

function confirma(n) {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;
  if (votoBranco === true) {
    votos.push({
      etapa:etapas[etapaAtual].titulo,
      voto:'branco'
    })
    votoConfirmado = true;
    CONFIRMA_VOTO.play();
  } else if (numero.length === etapa.numeros) {
    votos.push({
      etapa:etapas[etapaAtual].titulo,
      voto:`${numero}`,
    })
    votoConfirmado = true;
    CONFIRMA_VOTO.play();
  }
  if (votoConfirmado === true) {
    etapaAtual++;
    
    if (etapas[etapaAtual] != undefined) {
      comecarEtapa();
    } else {
      //fim do voto
      document.querySelector('.tela').innerHTML = `<div class="fim pisca">FIM</div>`;
      CONFIRMA_VOTO.play();
      console.log(votos);
   
    }
  }
}



comecarEtapa();
