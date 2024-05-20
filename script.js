const capaMusica = document.getElementById('capa-musica');
const nomeMusica = document.getElementById('nome-musica');
const artistaMusica = document.getElementById('artista-musica');

const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const buttonNext = document.querySelector('#next');
const buttonPrevious = document.querySelector('#previous');

const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");


const musicas = [
  {
    nome: '29 de junho',
    artista: 'Coco da Xambá',
    capaPath: 'assets/Coco da Xambá/capa.jpg',
    musicaPath: 'assets/Coco da Xambá/29 de Junho.mp3'
  },
  {
    nome: 'Mestre Quando Canta, Discípulo Tem Que Respeitar',
    artista: 'Mestre Ferrugem',
    capaPath: 'assets/Mestre Ferrugem/capa.jpg',
    musicaPath: 'assets/Mestre Ferrugem/Mestre Quando Canta, Discípulo Tem Que Respeitar.mp3'
  },
  {
    nome: 'A Rolinha',
    artista: 'Selma do Coco',
    capaPath: 'assets/Selma do Coco/capa.jpg',
    musicaPath: 'assets/Selma do Coco/A Rolinha.mp3'
  }
]

let music // defini antes p ser global. foi o melhor a fazer?
let indexMusicaAtual = 0
let playing = false
setMusic(indexMusicaAtual) // pq isso funciona se eu só defini a função dps?
let interval


function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}


function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}


function setMusic(index) {
  if (index < 0) {
    indexMusicaAtual = musicas.length - 1
  }
  if (index >= musicas.length) {
    indexMusicaAtual = 0
  }

  music = new Audio(musicas[indexMusicaAtual].musicaPath)

  artistaMusica.innerHTML = musicas[indexMusicaAtual].artista
  nomeMusica.innerHTML = musicas[indexMusicaAtual].nome
  capaMusica.setAttribute('src', musicas[indexMusicaAtual].capaPath)
  music.addEventListener('loadedmetadata', () => {
    tempoTotal.textContent = formatarTempo(music.duration)
  })
  music.addEventListener('ended', ()=>{
    console.log('teste');
    setMusic(++indexMusicaAtual)
    play()
  })
}


function play() {
  buttonPlay.classList.add('hide') // o toggle me complicou mais q ajudou nesse caso
  buttonPause.classList.remove('hide')
  music.play()
  interval = setInterval(updateMusicTime, 1000)
}


function pause() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  music.pause();
}


buttonPlay.addEventListener('click', () => {
  play()
  playing = true
});

buttonPause.addEventListener('click', () => {
  pause()
  playing = false
});

buttonNext.addEventListener('click', () => {
  pause();
  setMusic(++indexMusicaAtual); //incrementa globalmente
  if(playing == true) {play()}
});

buttonPrevious.addEventListener('click', () => {
  pause();
  setMusic(--indexMusicaAtual); //decrementa globalmente
  if(playing == true) {play()}
});

progressBar.addEventListener('click', () => {
  pause()
  music.currentTime = progressBar.value * (music.duration/100)
  if(playing == true) {play()}
})