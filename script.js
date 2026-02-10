const quotes = [
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A room without books is like a body without a soul.", author: "Cicero" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
    { text: "Sleep is good, he said, and books are better.", author: "George R.R. Martin" }
];

const authors = [
    { name: "James Clear", genre: "Self-Help", bestBook: "Atomic Habits" },
    { name: "J.K. Rowling", genre: "Fantasy", bestBook: "Harry Potter" },
    { name: "Robert T. Kiyosaki", genre: "Finance", bestBook: "Rich Dad Poor Dad" },
    { name: "Paulo Coelho", genre: "Fiction", bestBook: "The Alchemist" },
    { name: "Agatha Christie", genre: "Mystery", bestBook: "Murder on the Orient Express" },
    { name: "Morgan Housel", genre: "Finance", bestBook: "The Psychology of Money" },
    { name: "J.R.R. Tolkien", genre: "Fantasy", bestBook: "The Hobbit" },
    { name: "Marcus Aurelius", genre: "Philosophy", bestBook: "Meditations" },
    { name: "Napoleon Hill", genre: "Self-Help", bestBook: "Think and Grow Rich" },
    { name: "Frank Herbert", genre: "Sci-Fi", bestBook: "Dune" }
];

const library = [
    { 
        title: "Atomic Habits", 
        author: "James Clear", 
        genre: "Self-Help", 
        desc: "Tiny Changes, Remarkable Results.",
        image: "assets/images/atomic.jpg" 
    },
    { 
        title: "Dune", 
        author: "Frank Herbert", 
        genre: "Fiction", 
        desc: "A mythic hero's journey on a desert planet.", 
        image: "assets/images/Dune.jpg" 
    },
    { 
        title: "Rich Dad Poor Dad", 
        author: "Robert T. Kiyosaki", 
        genre: "Finance", 
        desc: "What the rich teach their kids about money.", 
        image: "assets/images/rich-dad-poor-dad-1.jpg" 
    },
    { 
        title: "Meditations", 
        author: "Marcus Aurelius", 
        genre: "Philosophy", 
        desc: "Timeless stoic wisdom from a Roman Emperor.", 
        image: "assets/images/meditations.jpg" 
    },
    { 
        title: "The Psychology of Money", 
        author: "Morgan Housel", 
        genre: "Finance", 
        desc: "Timeless lessons on wealth, greed, and happiness.", 
        image: "assets/images/The-Psychology-of-Money-1.jpg" 
    },
    { 
        title: "Think and Grow Rich", 
        author: "Napoleon Hill", 
        genre: "Self-Help", 
        desc: "The landmark bestseller on achieving success.", 
        image: "assets/images/think.jpg" 
    },
    { 
        title: "The Alchemist", 
        author: "Paulo Coelho", 
        genre: "Fiction", 
        desc: "A fable about following your personal legend.", 
        image: "assets/images/alchemist.jpg" 
    },
];

// ================= DOM LOAD =================
document.addEventListener("DOMContentLoaded", () => {

    /* ================= MENU TOGGLE ================= */
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    if(btn && menu){
        btn.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }


    /* ================= NEWSLETTER STORAGE ================= */
    const form = document.getElementById("newsletterForm");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

            const emailInput =
                document.getElementById("newsEmail");

            const email = emailInput.value.trim();


            /* ===== VALIDATION ===== */
            if(!email || !email.includes("@")){
                alert("Please enter a valid email.");
                return;
            }


            /* ===== GET OLD DATA ===== */
            let subscribers =
                JSON.parse(
                    localStorage.getItem("readify_newsletter")
                ) || [];


            /* ===== DUPLICATE CHECK ===== */
            if(subscribers.includes(email)){
                alert("You’re already subscribed 😄");
                return;
            }


            /* ===== SAVE ===== */
            subscribers.push(email);

            localStorage.setItem(
                "readify_newsletter",
                JSON.stringify(subscribers)
            );


            /* ===== SUCCESS MESSAGE ===== */
            const msg =
                document.getElementById("newsletterMsg");

            if(msg){
                msg.style.display = "block";
                msg.innerText =
                    "Subscribed successfully 🎉";
            }


            /* ===== RESET ===== */
            form.reset();

        });
    }

});



let quoteIndex = 0;
function rotateQuotes() {
    const qEl = document.getElementById("quote");
    const aEl = document.getElementById("quote-author");
    if(qEl && aEl) {
        qEl.innerText = `"${quotes[quoteIndex].text}"`;
        aEl.innerText = `- ${quotes[quoteIndex].author}`;
        quoteIndex = (quoteIndex + 1) % quotes.length;
    }
}

function setAuthorOfDay() {
    const container = document.getElementById("author-container");
    if(container) {
        const today = new Date();
        const index = today.getDate() % authors.length; 
        container.innerHTML = `
            <h3 style="color: var(--primary); margin-bottom: 10px;">${authors[index].name}</h3>
            <p style="color: #666;"><strong>Genre:</strong> ${authors[index].genre}</p>
            <p style="color: #666;"><strong>Famous Work:</strong> ${authors[index].bestBook}</p>
        `;
    }
}

function renderBooks(list) {
    const grid = document.getElementById('book-grid');
    if(grid) {
        grid.innerHTML = ""; 
        list.forEach(book => {
            const imageSrc = book.image ? book.image : "assets/images/book.jpg";

            grid.innerHTML += `
                <div class="book-card" style="display: flex; flex-direction: column; height: 100%;">
                    <div style="height: 250px; width: 100%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; background: #f4f4f4; border-radius: 8px; overflow: hidden;">
                        <img src="${imageSrc}" style="height: 100%; width: auto; max-width: 100%; object-fit: contain;" alt="${book.title}">
                    </div>
                    
                    <h3 style="font-size: 1.1rem; margin: 0 0 5px 0; color: var(--primary);">${book.title}</h3>
                    <p style="color: #666; font-size: 0.9rem; margin: 0 0 10px 0; flex-grow: 1;">${book.author}</p>
                    
                    <div style="margin-top: auto;">
                        <span style="color: white; font-weight: bold; background: var(--secondary); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">${book.genre}</span>
                    </div>
                </div>
            `;
        });
    }
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    if(input) {
        input.addEventListener('keyup', () => {
            const term = input.value.toLowerCase();
            const filtered = library.filter(b => b.title.toLowerCase().includes(term));
            renderBooks(filtered);
        });
    }
}

function calculateProgress() {
    const totalInput = document.getElementById("totalPages");
    const readInput = document.getElementById("pagesRead");
    const speedInput = document.getElementById("readingSpeed");

    if (!totalInput || !readInput) return;

    const total = parseFloat(totalInput.value);
    const read = parseFloat(readInput.value);
    const speed = parseFloat(speedInput ? speedInput.value : 0);

    if (!total || !read || total <= 0) {
        alert("Please enter valid page numbers.");
        return;
    }

    let percent = Math.round((read / total) * 100);
    if(percent > 100) percent = 100;

    const resultBox = document.getElementById("resultBox");
    if(resultBox) {
        resultBox.style.display = "block";
        document.getElementById("percentText").innerText = percent + "%";
        
        const bar = document.getElementById("progressBar");
        bar.style.width = percent + "%";
        bar.style.background = "var(--secondary)"; 

        if(speed > 0) {
            const left = Math.ceil((total - read) / speed);
            document.getElementById("daysLeft").innerText = left + " days";
        } else {
            document.getElementById("daysLeft").innerText = "Calculating...";
        }
    }
}

/* --- UPDATED FEEDBACK VALIDATION WITH LOCAL STORAGE --- */
function validateForm(e) {
    if(e) e.preventDefault(); 
    
    // 1. Get Values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const msg = document.getElementById("message").value;

    // Optional Phone check (in case you added the HTML for it)
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput ? phoneInput.value : "N/A";

    // 2. Reset Error Displays
    if(document.getElementById("errorName")) document.getElementById("errorName").style.display = "none";
    if(document.getElementById("errorEmail")) document.getElementById("errorEmail").style.display = "none";
    if(document.getElementById("errorMsg")) document.getElementById("errorMsg").style.display = "none";

    let valid = true;

    // 3. Check Name
    if(!name) { 
        document.getElementById("errorName").style.display = "block"; 
        valid = false; 
    }

    // 4. Check Email
    if(!email.includes("@")) { 
        document.getElementById("errorEmail").style.display = "block"; 
        valid = false; 
    }

    // 5. Check Message
    if(!msg) { 
        document.getElementById("errorMsg").style.display = "block"; 
        valid = false; 
    }

    // 6. Check Phone (Only if the input exists in HTML)
    if(phoneInput && phone.length < 10) {
        alert("Please enter a valid phone number (10 digits).");
        valid = false;
    }

    if(valid) {
        // --- START LOCAL STORAGE LOGIC ---
        const feedbackData = {
            userName: name,
            userEmail: email,
            userMessage: msg,
            userPhone: phone,
            timestamp: new Date().toLocaleString()
        };

        // Save to browser memory
        localStorage.setItem("readify_feedback", JSON.stringify(feedbackData));
        // --- END LOCAL STORAGE LOGIC ---

        const successMsg = document.getElementById("successMessage");
        if(successMsg) {
            successMsg.style.display = "block";
            successMsg.style.color = "var(--primary)";
            successMsg.innerText = "Thank you! Your feedback has been saved locally.";
        }
        document.querySelector("form").reset();
    }
    return false;
}

let currentAudio = null; 

function toggleSound(type) {
    const audioId = 'audio-' + type;
    const btnId = 'btn-' + type;

    const clickedAudio = document.getElementById(audioId);
    const clickedBtn = document.getElementById(btnId);

    if (!clickedAudio) {
        console.error("Audio file not found for:", type);
        return;
    }

    if (currentAudio === clickedAudio && !clickedAudio.paused) {
        clickedAudio.pause();
        if(clickedBtn) clickedBtn.innerText = "Play";
        currentAudio = null;
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        
        const allBtns = document.querySelectorAll('.flow-btn');
        allBtns.forEach(b => b.innerText = "Play");
    }

    clickedAudio.play().catch(e => console.log("Audio play failed:", e));
    currentAudio = clickedAudio;
    if(clickedBtn) clickedBtn.innerText = "Pause";
}

function recommendBook() {
    const genreSelect = document.getElementById("recGenre");
    if(!genreSelect) return;

    const genre = genreSelect.value;
    let pool = library;
    
    if(genre !== 'all') {
        pool = library.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
    }
    
    if(pool.length > 0) {
        const random = pool[Math.floor(Math.random() * pool.length)];
        
        document.getElementById("recPlaceholder").style.display = "none";
        
        const recCard = document.getElementById("recCard");
        recCard.style.display = "block";
        
        document.getElementById("recTitle").innerText = random.title;
        document.getElementById("recAuthor").innerText = random.author;
        document.getElementById("recDesc").innerText = random.desc;
        
        const genreTag = document.getElementById("recGenreTag");
        genreTag.innerText = random.genre;
        genreTag.style.background = "var(--secondary)"; 
        
        const img = document.getElementById("recImage");
        if(img) img.src = random.image;
        
    } else {
        alert("No books found for this genre yet! Try 'All Genres'.");
    }
    

}