const fotosValidas = [
    '1', '2', '3', '4', '5', '6', '7', '9', '10', '11', '12', '13', 
    '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
    '25', '26', '27'
];

// Background slideshow logic
let currentBgIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const bg = document.querySelector(".hero-bg");
    if (bg) {
        // Initialize random starting image
        currentBgIndex = Math.floor(Math.random() * fotosValidas.length);
        
        // Function to load and set background
        const setHeroBackground = (index, callback) => {
            const fotoId = fotosValidas[index];
            const extensions = ['jpeg', 'png', 'jpg'];
            let extIndex = 0;
            const tempImg = new Image();
            
            tempImg.onload = () => {
                bg.style.backgroundImage = `url('Fotos/${fotoId}_restaurada.${extensions[extIndex]}')`;
                if (callback) callback();
            };
            
            tempImg.onerror = () => {
                extIndex++;
                if (extIndex < extensions.length) {
                    tempImg.src = `Fotos/${fotoId}_restaurada.${extensions[extIndex]}`;
                }
            };
            
            tempImg.src = `Fotos/${fotoId}_restaurada.${extensions[0]}`;
        };

        // Load first random image, then trigger Ken Burns effect
        setHeroBackground(currentBgIndex, () => {
            bg.classList.add("visible");
            requestAnimationFrame(() => {
                bg.style.transform = "scale(1.12)";
            });
        });

        // Start slideshow
        setInterval(() => {
            currentBgIndex++;
            if (currentBgIndex >= fotosValidas.length) {
                currentBgIndex = 0;
            }
            setHeroBackground(currentBgIndex);
        }, 6000); // Change image every 6 seconds
    }
    initZoomPan();
});

function scrollToGallery() {
    const grid = document.querySelector('#galeria');
    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
    }
}

const extensoesAntigas = {
    '6': 'png',
    '21': 'png',
    '22': 'png',
    '24': 'png'
};

let currentIndex = 0;
let mostrandoRestaurada = true;

// --- Zoom & Pan state ---
let panX = 0, panY = 0;
let startX = 0, startY = 0;
let isDragging = false;
let hasDragged = false;
let zoomAtivo = false;
const ZOOM_SCALE = 2.8;

function resetZoom() {
    const img = document.getElementById("imagem-restaurada");
    if (!img) return;
    zoomAtivo = false;
    panX = 0; panY = 0;
    img.style.transform = "";
    img.style.cursor = "zoom-in";
}

function aplicarTransform() {
    const img = document.getElementById("imagem-restaurada");
    if (!img) return;
    img.style.transform = `scale(${ZOOM_SCALE}) translate(${panX}px, ${panY}px)`;
}

function initZoomPan() {
    const img = document.getElementById("imagem-restaurada");
    if (!img) return;

    // ---- MOUSE ----
    img.addEventListener("mousedown", (e) => {
        if (!zoomAtivo) return;
        isDragging = true;
        hasDragged = false;
        startX = e.clientX - panX * ZOOM_SCALE;
        startY = e.clientY - panY * ZOOM_SCALE;
        img.style.cursor = "grabbing";
        img.style.transition = "none";
        e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;
        panX = dx / ZOOM_SCALE;
        panY = dy / ZOOM_SCALE;
        aplicarTransform();
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        const img = document.getElementById("imagem-restaurada");
        img.style.cursor = "grab";
        img.style.transition = "";
    });

    img.addEventListener("click", (e) => {
        if (hasDragged) { hasDragged = false; return; }

        if (!zoomAtivo) {
            // Zoom in centered on click point
            const rect = img.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            panX = (cx - e.clientX) / ZOOM_SCALE;
            panY = (cy - e.clientY) / ZOOM_SCALE;
            zoomAtivo = true;
            img.style.transition = "transform 0.35s cubic-bezier(0.2,0,0.2,1)";
            aplicarTransform();
            img.style.cursor = "grab";
        } else {
            // Zoom out
            img.style.transition = "transform 0.35s cubic-bezier(0.2,0,0.2,1)";
            resetZoom();
        }
    });

    // ---- TOUCH ----
    let touchStartX = 0, touchStartY = 0;

    img.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        hasDragged = false;
        if (zoomAtivo) {
            startX = t.clientX - panX * ZOOM_SCALE;
            startY = t.clientY - panY * ZOOM_SCALE;
            img.style.transition = "none";
        }
        e.preventDefault();
    }, { passive: false });

    img.addEventListener("touchmove", (e) => {
        if (!zoomAtivo) return;
        const t = e.touches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasDragged = true;
        panX = (t.clientX - startX) / ZOOM_SCALE;
        panY = (t.clientY - startY) / ZOOM_SCALE;
        aplicarTransform();
        e.preventDefault();
    }, { passive: false });

    img.addEventListener("touchend", (e) => {
        img.style.transition = "";
        if (!hasDragged) {
            // Treat as a tap
            if (!zoomAtivo) {
                const t = e.changedTouches[0];
                const rect = img.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                panX = (cx - t.clientX) / ZOOM_SCALE;
                panY = (cy - t.clientY) / ZOOM_SCALE;
                zoomAtivo = true;
                img.style.transition = "transform 0.35s cubic-bezier(0.2,0,0.2,1)";
                aplicarTransform();
            } else {
                img.style.transition = "transform 0.35s cubic-bezier(0.2,0,0.2,1)";
                resetZoom();
            }
        }
    });
}

function abrirModal(fotoId) {
    const modal = document.getElementById("modal");
    
    currentIndex = fotosValidas.indexOf(fotoId);
    if (currentIndex === -1) currentIndex = 0;

    carregarFoto();

    modal.style.display = "flex";  
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

function mudarFoto(direcao) {
    currentIndex += direcao;
    
    if (currentIndex >= fotosValidas.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = fotosValidas.length - 1;
    }

    carregarFoto();
}

function carregarFoto() {
    const imgElement = document.getElementById("imagem-restaurada");
    const btnToggle = document.getElementById("toggle-versao");
    
    imgElement.classList.remove("loaded");
    resetZoom();
    mostrandoRestaurada = true;
    if (btnToggle) btnToggle.textContent = "Ver Original";
    
    setTimeout(() => {
        const fotoId = fotosValidas[currentIndex];
        
        // Dynamic extension testing
        const extensions = ['jpeg', 'png', 'jpg'];
        let extIndex = 0;
        
        imgElement.onload = () => {
            imgElement.classList.add("loaded");
            imgElement.onerror = null; // Clean up
        };
        
        imgElement.onerror = () => {
            extIndex++;
            if (extIndex < extensions.length) {
                imgElement.src = `Fotos/${fotoId}_restaurada.${extensions[extIndex]}`;
            }
        };
        
        // Trigger first load
        imgElement.src = `Fotos/${fotoId}_restaurada.${extensions[0]}`;
        
    }, 150);
}

function toggleVersao() {
    const imgElement = document.getElementById("imagem-restaurada");
    const btnToggle = document.getElementById("toggle-versao");
    const fotoId = fotosValidas[currentIndex];

    mostrandoRestaurada = !mostrandoRestaurada;
    resetZoom();
    
    if (mostrandoRestaurada) {
        btnToggle.textContent = "Ver Original";
        
        const extensions = ['jpeg', 'png', 'jpg'];
        let extIndex = 0;
        
        imgElement.onerror = () => {
            extIndex++;
            if (extIndex < extensions.length) {
                imgElement.src = `Fotos/${fotoId}_restaurada.${extensions[extIndex]}`;
            } else {
                imgElement.onerror = null;
            }
        };
        imgElement.src = `Fotos/${fotoId}_restaurada.${extensions[0]}`;
        
    } else {
        btnToggle.textContent = "Ver Restaurada";
        const ext = extensoesAntigas[fotoId] || 'jpg';
        imgElement.src = `Fotos/${fotoId}_antiga.${ext}`;
    }
}


function fecharModal() {
    const modal = document.getElementById("modal");
    const imgElement = document.getElementById("imagem-restaurada");

    modal.classList.remove("show");
    resetZoom();

    setTimeout(() => {
        imgElement.src = "";  
        imgElement.classList.remove("loaded");
        modal.style.display = "none";  
    }, 300);
}

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById("modal");
    if (modal && modal.classList.contains("show")) {
        if (event.key === "Escape") {
            fecharModal();
        } else if (event.key === "ArrowRight" && !zoomAtivo) {
            mudarFoto(1);
        } else if (event.key === "ArrowLeft" && !zoomAtivo) {
            mudarFoto(-1);
        }
    }
});

