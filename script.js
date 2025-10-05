function abrirModal(fotoId) {
    const modal = document.getElementById("modal");
    const iframe = modal.querySelector("iframe");

    const embeds = {
        '1': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=b6f9b87e-a161-11f0-ba1b-0e6f42328d7d&foto=1',
        '2': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=cb00630e-a161-11f0-ba1b-0e6f42328d7d&foto=2',
        '3': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=6e70fea2-a164-11f0-ba1b-0e6f42328d7d&foto=3',
        '4': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=f56d3f4c-a164-11f0-ba1b-0e6f42328d7d&foto=4',
        '5': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=46579858-a165-11f0-ba1b-0e6f42328d7d&foto=5',
        '6': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=a529e9e4-a165-11f0-ba1b-0e6f42328d7d&foto=6',
        '7': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=e3f5f2e4-a165-11f0-ba1b-0e6f42328d7d&foto=7',
        '9': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=9c22a014-a167-11f0-ba1b-0e6f42328d7d&foto=9',
        '10': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=2b0939e4-a16a-11f0-ba1b-0e6f42328d7d&foto=10',
        '11': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=66937018-a16c-11f0-ba1b-0e6f42328d7d&foto=11',
        '12': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=8e9dc336-a16e-11f0-ba1b-0e6f42328d7d&foto=12',
        '13': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=cf0d01a0-a170-11f0-ba1b-0e6f42328d7d&foto=13',
        '14': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=0335b30e-a172-11f0-ba1b-0e6f42328d7d&foto=14',
        '15': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=091175f0-a173-11f0-ba1b-0e6f42328d7d&foto=15',
        '16': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=ad8aeac2-a17c-11f0-ba1b-0e6f42328d7d&foto=16',
        '18': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=8b016ad6-a176-11f0-ba1b-0e6f42328d7d&foto=18',
        '19': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=2545fdfe-a17d-11f0-ba1b-0e6f42328d7d&foto=19',
        '20': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=bbbc362c-a17d-11f0-ba1b-0e6f42328d7d&foto=20',
        '21': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=a1a4675e-a17e-11f0-ba1b-0e6f42328d7d&foto=21',
        '22': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=aa4cdbfa-a180-11f0-ba1b-0e6f42328d7d&foto=22',
        '23': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=3b17c954-a17e-11f0-ba1b-0e6f42328d7d&foto=23',
        '24': 'https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=11242e10-a180-11f0-ba1b-0e6f42328d7d&foto=24',
    };

    const embedUrl = embeds[fotoId];

    if (embedUrl) {
        iframe.src = embedUrl;  
        modal.style.display = "flex";  
    } else {
        console.error("Embed não encontrado para o ID:", fotoId);
    }
}

function fecharModal() {
    const modal = document.getElementById("modal");
    const iframe = modal.querySelector("iframe");

    iframe.src = "";  
    modal.style.display = "none";  
}
