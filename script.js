<script>
    const flowerData = {
        bouquets: [
            { 
                id: 'b1', 
                name: 'Frühlingsstrauss', 
                image: 'https://media.discordapp.net/attachments/1259322752645599245/1297244518218993735/tomeksy95_A_bouquet_with_vibrant_petals_of_tulips_and_daisies_r_c83d51db-1bc9-46aa-a087-b2152064ac6f.png?ex=6715389a&is=6713e71a&hm=0c295a8df61687f7589f4288c2b82e6f585c1f5ea676ade8478e03001ec5ce5e&=&format=webp&quality=lossless&width=748&height=748', 
                description: 'Ein bunter Strauss mit Frühlingsblumen.' 
            },
            { 
                id: 'b2', 
                name: 'Romantischer Strauss', 
                image: 'https://cdn.discordapp.com/attachments/1259322752645599245/1297243925299597332/tomeksy95_A_colorful_bouquet_delicate_petals_soft-focus_backgro_50695aa1-99f9-41f3-8de8-3893b3937c01.png?ex=6715380d&is=6713e68d&hm=b7d3587867d3e1f3f7e15ae6c8d0cc02e7abc02b11c7ddc45d89f7aee5acbaee&', 
                description: 'Perfekt für besondere Anlässe.' 
            },
        ],
        wreaths: [
            { 
                id: 'w1', 
                name: 'Trauerkranz', 
                image: 'https://via.placeholder.com/300x200.png?text=Trauerkranz', 
                description: 'Ein würdevoller Kranz für Beerdigungen.' 
            },
            { 
                id: 'w2', 
                name: 'Adventskranz', 
                image: 'https://via.placeholder.com/300x200.png?text=Adventskranz', 
                description: 'Traditioneller Kranz für die Weihnachtszeit.' },
        ],
        roses: [
            { 
                id: 'r1', 
                name: 'Rote Rosen', 
                image: 'https://via.placeholder.com/300x200.png?text=Rote+Rosen', 
                description: 'Klassische rote Rosen, Symbol der Liebe.' 
            },
            { 
                id: 'r2', 
                name: 'Weiße Rosen', 
                image: 'https://via.placeholder.com/300x200.png?text=Weiße+Rosen', 
                description: 'Elegante weiße Rosen für pure Schönheit.' },
        ],
        special: [
            { 
                id: 's1', 
                name: 'Rosemary Spezial', 
                image: 'https://media.discordapp.net/attachments/1259322752645599245/1297246628683448491/tomeksy95_A_beautiful_bouquet_of_white_and_pink_roses_elegantly_1547b5ec-cacf-486a-8e83-6f6b57b4ccf0.png?ex=67153a91&is=6713e911&hm=9e605f17bd68dc4e4be7346372723991725a88ea200c0340dad0ada4dcaa9406&=&format=webp&quality=lossless&width=700&height=700', 
                description: 'Unser einzigartiges Arrangement mit weißen und rosa Rosen, elegant gebunden.' 
            },
            { 
                id: 's2', 
                name: 'Saisonales Spezial', 
                image: 'https://media.discordapp.net/attachments/1259322752645599245/1297244451588280320/tomeksy95_A_floral_arrangement_focusing_on_the_vibrant_petals_o_dee21488-20fd-4f62-9b83-ffe701c75eec.png?ex=6715388a&is=6713e70a&hm=2e24caf4883c837e85aff8c3256e7dd73e61761576bfe080ec26054c8cc9a22c&=&format=webp&quality=lossless&width=748&height=748', 
                description: 'Ein besonderes Arrangement mit saisonalen Blumen.' 
            },
        ],
    };

    function showStep(step) {
        document.getElementById('step1').style.display = step === 1 ? 'block' : 'none';
        document.getElementById('step2').style.display = step === 2 ? 'block' : 'none';
        document.getElementById('step3').style.display = step === 3 ? 'block' : 'none';
        document.getElementById('step4').style.display = step === 4 ? 'block' : 'none';

        document.getElementById('step1-progress').classList.toggle('active', step >= 1);
        document.getElementById('step2-progress').classList.toggle('active', step >= 2);
        document.getElementById('step3-progress').classList.toggle('active', step >= 3);
        document.getElementById('step4-progress').classList.toggle('active', step >= 4);

        if (step === 2) {
            document.getElementById('pickupDate').focus();
        } else if (step === 3) {
            document.getElementById('name').focus();
        }
    }

    function populateGallery(category) {
        const carousel = document.getElementById('gallery-carousel');
        carousel.innerHTML = '';
        flowerData[category].forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="gallery-item-details">
                    <h3>${item.name}</h3>
                    <button onclick="openModal('${item.id}')">Details</button>
                </div>
            `;
            carousel.appendChild(galleryItem);
        });
    }

    function openModal(itemId) {
        const modal = document.getElementById('productModal');
        const item = Object.values(flowerData).flat().find(item => item.id === itemId);
        
        document.getElementById('modalTitle').textContent = item.name;
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.name;
        document.getElementById('modalDescription').textContent = item.description;
        
        document.getElementById('selectButton').onclick = function() {
            document.getElementById('selectedFlower').value = item.name;
            closeModal();
        };

        modal.style.display = 'block';
    }

    function closeModal() {
        document.getElementById('productModal').style.display = 'none';
    }

    function showSummary() {
        if (validateForm()) {
            const summary = document.getElementById('orderSummary');
            summary.innerHTML = `
                <p><strong>Blumenauswahl:</strong> ${document.getElementById('selectedFlower').value}</p>
                <p><strong>Anmerkungen:</strong> ${document.getElementById('notes').value || 'Keine'}</p>
                <p><strong>Abholdatum:</strong> ${document.getElementById('pickupDate').value}</p>
                <p><strong>Abholzeit:</strong> ${document.getElementById('pickupTime').value}</p>
                <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
                <p><strong>E-Mail:</strong> ${document.getElementById('email').value}</p>
                <p><strong>Telefon:</strong> ${document.getElementById('phone').value}</p>
                <p><strong>Zahlungsmethode:</strong> ${document.getElementById('payment').value}</p>
            `;
            showStep(4);
        }
    }

    function validateForm() {
        let isValid = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Phone validation
        const phoneRegex = /^[\d\s\+\-\(\)]{6,20}$/;
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.textContent = 'Bitte geben Sie eine gültige Telefonnummer ein.';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        return isValid;
    }

    function submitForm() {
        if (validateForm()) {
            const form = document.getElementById('flowerOrderForm');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            document.querySelector('.loading').style.display = 'block';

            fetch('https://hook.eu2.make.com/4x1dx928i9cbw4ga86dwo6b4oblm5si6', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                window.location.href = 'https://rosemary-blumen.crd.co/#danke';
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Es gab einen Fehler bei der Übermittlung Ihrer Bestellung. Bitte versuchen Sie es später erneut.');
            })
            .finally(() => {
                document.querySelector('.loading').style.display = 'none';
            });
        }

        return false; // Prevent default form submission
    }

    // Event Listeners
    document.querySelector('.close').onclick = closeModal;

    window.onclick = function(event) {
        if (event.target == document.getElementById('productModal')) {
            closeModal();
        }
    }

    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            populateGallery(this.dataset.category);
        });
    });

    // Initialize the gallery with the first category
    populateGallery('bouquets');

    // Set minimum date for pickup (tomorrow)
    document.addEventListener('DOMContentLoaded', function() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const pickupDateInput = document.getElementById('pickupDate');

        pickupDateInput.min = tomorrow.toISOString().split('T')[0];
        pickupDateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            if (selectedDate.getDay() === 0) { // 0 is Sunday
                alert('Der Blumenladen ist sonntags geschlossen. Bitte wählen Sie einen anderen Tag.');
                this.value = '';
            }
        });
    });
</script>