import { db } from "./firebase-config.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("1. YBG Galeri Sistemi Başlatıldı..."); 

const galleryContainer = document.getElementById('gallery-container');

if (galleryContainer) {
    console.log("2. Galeri kutusu bulundu. Firebase'e bağlanılıyor...");

    onSnapshot(doc(db, "siteData", "gallery"), 
        (docSnapshot) => {
            console.log("3. Firebase'den başarıyla yanıt geldi!");
            
            if (!docSnapshot.exists()) {
                console.error("DURUM: Firestore'da 'gallery' adında bir dosya yok!");
                galleryContainer.innerHTML = "<p style='text-align:center; width:100%;'>Veritabanı boş (Dosya yok).</p>";
                return;
            }

            const data = docSnapshot.data();
            console.log("4. Veritabanından gelen veri:", data);

            if (!data.items || data.items.length === 0) {
                console.warn("DURUM: Dosya var ama içine resim eklenmemiş.");
                galleryContainer.innerHTML = "<p style='text-align:center; width:100%;'>Henüz görsel eklenmemiş.</p>";
                return;
            }

            console.log(`5. Toplam ${data.items.length} resim bulundu. Ekrana çiziliyor...`);
            galleryContainer.innerHTML = ""; 

            const sortedItems = data.items.sort((a, b) => b.timestamp - a.timestamp);

            sortedItems.forEach(item => {
                const div = document.createElement('div');
                div.className = "gallery-item";
                div.setAttribute('data-category', item.category);
                
                const categoryNames = { "mutfak": "Mutfak Dolabı", "banyo": "Banyo Dolabı", "vestiyer": "Vestiyer", "yatak": "Yatak Odası" };
                const catName = categoryNames[item.category] || "Özel Tasarım";

                div.innerHTML = `
                    <img src="${item.src}" alt="YBG Proje">
                    <div class="gallery-overlay">
                        <h3>${catName}</h3>
                        <p>Özel Ölçü</p>
                    </div>
                `;
                galleryContainer.appendChild(div);
            });

            applyFilters();
            console.log("6. Her şey başarıyla tamamlandı!");
        }, 
        (error) => {
            console.error("🔥 FİREBASE HATASI:", error.message);
            galleryContainer.innerHTML = `<p style="color:red; text-align:center; width:100%;">Bağlantı Hatası: ${error.message}</p>`;
        }
    );
}

function applyFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
            newBtn.classList.add('active-filter');

            const filterValue = newBtn.getAttribute('data-filter');
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}