let posts = [
    { 
        title: "Ehlers-Danlos Syndrome (EDS)", 
        doctor: "Dr. Peterson", 
        symptoms: "Joint hypermobility, frequent dislocations, chronic pain", 
        signs: "Elastic skin, easy bruising, poor wound healing", 
        content: "EDS is a group of connective tissue disorders characterized by defects in collagen production." 
    },
    { 
        title: "Meniere's Disease", 
        doctor: "Dr. Lopez", 
        symptoms: "Vertigo, tinnitus, hearing loss", 
        signs: "Fullness in the ear, balance issues, headaches", 
        content: "Meniere's disease is an inner ear disorder that affects hearing and balance." 
    },
    { 
        title: "Guillain-Barre Syndrome (GBS)", 
        doctor: "Dr. Reed", 
        symptoms: "Tingling in hands or feet, difficulty walking, muscle weakness", 
        signs: "Absent reflexes, rapid heart rate, trouble breathing", 
        content: "GBS is a rare neurological disorder where the body's immune system attacks the peripheral nerves." 
    },
    { 
        title: "Systemic Lupus Erythematosus (Lupus)", 
        doctor: "Dr. Ahmed", 
        symptoms: "Fatigue, joint pain, fever", 
        signs: "Butterfly-shaped facial rash, photosensitivity, hair loss", 
        content: "Lupus is an autoimmune disease that can cause inflammation in multiple organ systems." 
    },
    { 
        title: "Chronic Fatigue Syndrome (CFS)", 
        doctor: "Dr. Miller", 
        symptoms: "Severe fatigue, memory issues, difficulty concentrating", 
        signs: "Sore throat, swollen lymph nodes, muscle aches", 
        content: "CFS is a complex condition characterized by extreme fatigue that doesn't improve with rest." 
    },
    { 
        title: "Parkinson's Plus Syndrome", 
        doctor: "Dr. Harris", 
        symptoms: "Tremors, stiffness, difficulty swallowing", 
        signs: "Speech difficulties, impaired balance, slow movements", 
        content: "A group of neurological disorders that share symptoms with Parkinson's disease but progress differently." 
    },
    { 
        title: "Celiac Disease", 
        doctor: "Dr. Patel", 
        symptoms: "Chronic diarrhea, weight loss, fatigue", 
        signs: "Bloating, malnutrition, itchy rash", 
        content: "Celiac disease is an autoimmune condition triggered by gluten, leading to intestinal damage." 
    },
    { 
        title: "Fibrodysplasia Ossificans Progressiva (FOP)", 
        doctor: "Dr. Jameson", 
        symptoms: "Progressive stiffness, immobility, pain during movement", 
        signs: "Bone formation in muscles, deformed toes, joint fusions", 
        content: "A rare genetic condition where muscle tissue transforms into bone, causing severe immobility." 
    },
    { 
        title: "Stiff-Person Syndrome", 
        doctor: "Dr. Carter", 
        symptoms: "Muscle stiffness, painful spasms, difficulty walking", 
        signs: "Postural deformities, heightened sensitivity to touch or sound, rigid posture", 
        content: "A rare neurological disorder causing progressive muscle stiffness and spasms." 
    },
    { 
        title: "Primary Lateral Sclerosis (PLS)", 
        doctor: "Dr. Wright", 
        symptoms: "Weakness in legs, difficulty with speech, slow movements", 
        signs: "Spasticity, exaggerated reflexes, difficulty maintaining posture", 
        content: "PLS is a rare motor neuron disease affecting voluntary muscle control." 
    }
];






// Function to display posts
function displayPosts(filteredPosts = null) {
    const resultsDiv = document.getElementById("postResults");
    resultsDiv.innerHTML = "";

    const postsToDisplay = filteredPosts || posts;

    if (postsToDisplay.length === 0) {
        resultsDiv.innerHTML = "<p>No posts found.</p>";
        return;
    }

    postsToDisplay.forEach((post) => {
        const postHTML = `
            <div>
                <h3>${post.title}</h3>
                <p><strong>Doctor:</strong> ${post.doctor}</p>
                <p><strong>Symptoms:</strong> ${post.symptoms}</p>
                <p><strong>Signs:</strong> ${post.signs}</p>
                <p>${post.content}</p>
                <button onclick="contactDoctor('${post.doctor}')">Contact Doctor</button>
            </div>
        `;
        resultsDiv.innerHTML += postHTML;
    });
}

// Fixed search function
function searchPosts() {
    const searchInput = document.getElementById("postSearch").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("postResults");
    resultsDiv.innerHTML = "";

    if (!searchInput) {
        displayPosts(posts); // Show all posts if search input is empty
        return;
    }

    // Split the user's input into individual words
    const searchWords = searchInput.split(/\s+/); // Split by spaces
    const matchingPosts = [];

    // Iterate through each post
    posts.forEach((post) => {
        // Combine signs and symptoms into a single searchable text
        const combinedText = `${post.signs.toLowerCase()} ${post.symptoms.toLowerCase()}`;
        let matchCount = 0;

        // Check how many search words match in the combined text
        searchWords.forEach((word) => {
            if (combinedText.includes(word)) {
                matchCount++;
            }
        });

        // Add post to results if at least 2 words match
        if (matchCount >= 2) {
            matchingPosts.push(post);
        }
    });

    // Display matching posts or show "No posts found"
    displayPosts(matchingPosts);
}

// Handle creating a new post
document.getElementById("createPostForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const title = document.getElementById("postTitle").value;
    const doctor = document.getElementById("postDoctor").value;
    const symptoms = document.getElementById("postSymptoms").value;
    const signs = document.getElementById("postSigns").value;
    const content = document.getElementById("postContent").value;

    posts.push({ title, doctor, symptoms, signs, content });
    alert("Post created successfully!");
    document.getElementById("createPostForm").reset();
    displayPosts();
});

// Function to contact the doctor
function contactDoctor(doctor) {
    alert(`You can now send a message to Dr. ${doctor}.`); // Corrected to use "doctor" variable
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

    // Optionally populate the "Contact Doctor" form with the doctor's name
    const contactNameField = document.getElementById("contactName");
    if (contactNameField) {
        contactNameField.value = `Message to Dr. ${doctor}`;
    }
}

// Initial display of posts
displayPosts();
