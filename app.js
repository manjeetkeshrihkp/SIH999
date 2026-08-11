// Global Active Role
let activeRole = '';

// Student State
let studentData = {
    name: '', dob: '', email: '', mobile: '',
    state: '', city: '', school: '',
    level: '', region: '', marks10: '', marks12: '', marksLast: '',
    device: '', net: '', needs: '', exam: '', interest: '', language: ''
};

// Faculty State
let facultyData = {
    credential: '', subject: '', experience: '', institution: '', pedagogy: ''
};

// Derived Profile State
let quizScore = 0;
let currentQuestionIndex = 0;
let activeQuizBank = [];
const quizBanks = {
    'Class 9-10': [
        { type: 'math', q: 'Solve for x: 2x - 4 = 10', options: [{t: 'x=5', c: false}, {t: 'x=7', c: true}, {t: 'x=6', c: false}, {t: 'x=8', c: false}] },
        { type: 'logic', q: 'If all bloops are razzies, and all razzies are lazzies, are all bloops lazzies?', options: [{t: 'Yes', c: true}, {t: 'No', c: false}, {t: 'Maybe', c: false}, {t: 'Cannot be determined', c: false}] },
        { type: 'visual', q: 'Which of these is not a programming language?', options: [{t: 'Python', c: false}, {t: 'HTML', c: true}, {t: 'Java', c: false}, {t: 'C++', c: false}] },
        { type: 'math', q: 'What is 15% of 200?', options: [{t: '15', c: false}, {t: '20', c: false}, {t: '30', c: true}, {t: '35', c: false}] },
        { type: 'logic', q: 'A bat and a ball cost ₹110 in total. The bat costs ₹100 more than the ball. How much does the ball cost?', options: [{t: '₹10', c: false}, {t: '₹5', c: true}, {t: '₹1', c: false}, {t: '₹100', c: false}] },
        { type: 'math', q: 'If a train travels 60 km in 1.5 hours, what is its average speed in km/h?', options: [{t: '35 km/h', c: false}, {t: '40 km/h', c: true}, {t: '45 km/h', c: false}, {t: '50 km/h', c: false}] },
        { type: 'logic', q: 'Some months have 31 days. How many have 28?', options: [{t: '1', c: false}, {t: '6', c: false}, {t: '12', c: true}, {t: 'None', c: false}] },
        { type: 'visual', q: 'Which color model is used primarily for digital screens?', options: [{t: 'CMYK', c: false}, {t: 'RGB', c: true}, {t: 'Pantone', c: false}, {t: 'Grayscale', c: false}] },
        { type: 'math', q: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ... ?', options: [{t: '40', c: false}, {t: '42', c: true}, {t: '44', c: false}, {t: '48', c: false}] },
        { type: 'logic', q: 'Select the geometric shape that has exactly 5 sides:', options: [{t: 'Hexagon', c: false}, {t: 'Octagon', c: false}, {t: 'Pentagon', c: true}, {t: 'Rhombus', c: false}] }
    ],
    'Class 11-12': [
        { type: 'math', q: 'Find the derivative of f(x) = x^2 + 3x.', options: [{t: '2x', c: false}, {t: '2x + 3', c: true}, {t: 'x + 3', c: false}, {t: '2', c: false}] },
        { type: 'logic', q: 'If A implies B, and B implies C, then does not C imply not A?', options: [{t: 'Yes', c: true}, {t: 'No', c: false}, {t: 'Sometimes', c: false}, {t: 'Never', c: false}] },
        { type: 'math', q: 'What is the integral of 2x dx?', options: [{t: 'x^2 + C', c: true}, {t: 'x + C', c: false}, {t: '2x^2 + C', c: false}, {t: '2 + C', c: false}] },
        { type: 'visual', q: 'Which fundamental force is responsible for holding the nucleus together?', options: [{t: 'Gravity', c: false}, {t: 'Electromagnetism', c: false}, {t: 'Strong Nuclear', c: true}, {t: 'Weak Nuclear', c: false}] },
        { type: 'math', q: 'Solve: log2(8) = ?', options: [{t: '2', c: false}, {t: '3', c: true}, {t: '4', c: false}, {t: '8', c: false}] },
        { type: 'logic', q: 'In a class of 30, 20 play football and 15 play cricket. If everyone plays at least one, how many play both?', options: [{t: '5', c: true}, {t: '10', c: false}, {t: '15', c: false}, {t: '0', c: false}] },
        { type: 'math', q: 'What is the value of sin(90°)?', options: [{t: '0', c: false}, {t: '1', c: true}, {t: '-1', c: false}, {t: 'undefined', c: false}] },
        { type: 'visual', q: 'In chemistry, which bond involves sharing of electrons?', options: [{t: 'Ionic', c: false}, {t: 'Covalent', c: true}, {t: 'Metallic', c: false}, {t: 'Hydrogen', c: false}] },
        { type: 'math', q: 'What is the limit of 1/x as x approaches infinity?', options: [{t: '1', c: false}, {t: 'Infinity', c: false}, {t: '0', c: true}, {t: 'Undefined', c: false}] },
        { type: 'logic', q: 'If the day after tomorrow is Sunday, what was the day before yesterday?', options: [{t: 'Monday', c: false}, {t: 'Tuesday', c: false}, {t: 'Wednesday', c: true}, {t: 'Thursday', c: false}] }
    ],
    'Undergraduate': [
        { type: 'logic', q: 'What is the time complexity of binary search?', options: [{t: 'O(n)', c: false}, {t: 'O(log n)', c: true}, {t: 'O(n log n)', c: false}, {t: 'O(1)', c: false}] },
        { type: 'math', q: 'Find the determinant of a 2x2 matrix [[1, 2], [3, 4]]', options: [{t: '-2', c: true}, {t: '2', c: false}, {t: '10', c: false}, {t: '-10', c: false}] },
        { type: 'visual', q: 'Which HTTP status code signifies "Not Found"?', options: [{t: '200', c: false}, {t: '403', c: false}, {t: '404', c: true}, {t: '500', c: false}] },
        { type: 'logic', q: 'In a database, what ensures atomicity, consistency, isolation, and durability?', options: [{t: 'BASE', c: false}, {t: 'ACID', c: true}, {t: 'CAP', c: false}, {t: 'SOLID', c: false}] },
        { type: 'math', q: 'What is the expected value of rolling a fair 6-sided die?', options: [{t: '3', c: false}, {t: '3.5', c: true}, {t: '4', c: false}, {t: '3.14', c: false}] },
        { type: 'visual', q: 'In machine learning, what prevents overfitting?', options: [{t: 'Gradient Descent', c: false}, {t: 'Backpropagation', c: false}, {t: 'Regularization', c: true}, {t: 'Activation Function', c: false}] },
        { type: 'logic', q: 'Which sorting algorithm is generally considered the most efficient for large datasets (average case)?', options: [{t: 'Bubble Sort', c: false}, {t: 'Insertion Sort', c: false}, {t: 'Merge/Quick Sort', c: true}, {t: 'Selection Sort', c: false}] },
        { type: 'math', q: 'What is the rank of an invertible n x n matrix?', options: [{t: '0', c: false}, {t: 'n-1', c: false}, {t: 'n', c: true}, {t: '1', c: false}] },
        { type: 'visual', q: 'What is the primary function of DNS?', options: [{t: 'Routing', c: false}, {t: 'Encryption', c: false}, {t: 'Domain Name Resolution', c: true}, {t: 'Caching', c: false}] },
        { type: 'logic', q: 'A graph is bipartite if and only if it does not contain a cycle of what length?', options: [{t: 'Even', c: false}, {t: 'Odd', c: true}, {t: 'Prime', c: false}, {t: '3', c: false}] }
    ]
};
quizBanks['Postgraduate'] = quizBanks['Undergraduate'];

const stateCityMap = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Roing"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    "Goa": ["Vasco da Gama", "Panaji", "Margao", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Rohtak"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching"],
    "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Bishalgarh"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"]
};

const institutionsList = [
    "Parul University", "Sigma University", "Indian Institute of Technology (IIT) Bombay", 
    "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati",
    "Indian Institute of Management (IIM) Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow",
    "National Institute of Technology (NIT) Trichy", "NIT Surathkal", "NIT Warangal",
    "Delhi University", "Jawaharlal Nehru University", "Banaras Hindu University", "Aligarh Muslim University",
    "Anna University", "Jadavpur University", "Vellore Institute of Technology (VIT)", "BITS Pilani",
    "Amity University", "Lovely Professional University", "Chandigarh University", "SRM Institute of Science and Technology",
    "Manipal Academy of Higher Education", "Thapar Institute of Engineering and Technology",
    "Kendriya Vidyalaya (Central School)", "Navodaya Vidyalaya", "Delhi Public School (DPS)",
    "St. Xavier's College", "Loyola College", "Christ University", "Symbiosis International University",
    "NMIMS Mumbai", "Jamia Millia Islamia", "Osmania University", "University of Hyderabad",
    "Pune University", "Mumbai University", "Gujarat University", "MS University Baroda",
    "Nirma University", "DA-IICT", "Pandit Deendayal Energy University", "Ahmedabad University",
    "Other (Custom)"
];

function initDropdowns() {
    const stateSelect = document.getElementById('student-state');
    if (stateSelect) {
        Object.keys(stateCityMap).sort().forEach(state => {
            const opt = document.createElement('option');
            opt.value = state;
            opt.innerText = state;
            stateSelect.appendChild(opt);
        });
    }

    const schoolSelect = document.getElementById('student-school');
    if (schoolSelect) {
        institutionsList.forEach(inst => {
            const opt = document.createElement('option');
            opt.value = inst;
            opt.innerText = inst;
            schoolSelect.appendChild(opt);
        });
    }
}

function populateCities() {
    const state = document.getElementById('student-state').value;
    const citySelect = document.getElementById('student-city');
    citySelect.innerHTML = '<option value="" disabled selected>Select City...</option>';
    if (state && stateCityMap[state]) {
        stateCityMap[state].forEach(city => {
            const opt = document.createElement('option');
            opt.value = city;
            opt.innerText = city;
            citySelect.appendChild(opt);
        });
    }
}

function toggleCustomSchool() {
    const schoolSelect = document.getElementById('student-school').value;
    const customInput = document.getElementById('student-school-custom');
    if (schoolSelect === 'Other (Custom)') {
        customInput.classList.remove('hidden');
        customInput.required = true;
    } else {
        customInput.classList.add('hidden');
        customInput.required = false;
    }
}

document.addEventListener('DOMContentLoaded', initDropdowns);

let userProfile = {
    archetype: '',
    title: '',
    icon: '',
    detailsHTML: '',
    confidence: ''
};

// DOM Elements
const mainNav = document.getElementById('main-nav');
const heroView = document.getElementById('hero-view');
const roleSelectionView = document.getElementById('role-selection-view');
const wizardView = document.getElementById('wizard-view');
const profileRevealView = document.getElementById('profile-reveal-view');
const quizView = document.getElementById('quiz-view');

const studentWizardContent = document.getElementById('student-wizard-content');
const facultyWizardContent = document.getElementById('faculty-wizard-content');
const stepLoading = document.getElementById('step-loading');
const loadingTitle = document.getElementById('loading-title');
const loadingSubtitle = document.getElementById('loading-subtitle');

// Profile DOM Elements
const revealPreTitle = document.getElementById('reveal-pre-title');
const revealTitle = document.getElementById('reveal-title');
const revealIcon = document.getElementById('reveal-icon');
const revealLabel = document.getElementById('reveal-label');
const generatedArchetype = document.getElementById('generated-archetype');
const revealDetailsContainer = document.getElementById('reveal-details-container');
const revealConfidence = document.getElementById('reveal-confidence');
const revealActionBtn = document.getElementById('reveal-action-btn');

// Flow Functions
function showRoleSelection() {
    mainNav.classList.add('hidden');
    heroView.classList.add('hidden');
    roleSelectionView.classList.remove('hidden');
    window.scrollTo(0,0);
}

function cancelRoleSelection() {
    roleSelectionView.classList.add('hidden');
    heroView.classList.remove('hidden');
    mainNav.classList.remove('hidden');
}

function selectRole(role) {
    activeRole = role;
    roleSelectionView.classList.add('hidden');
    
    // Setup Wizard UI
    wizardView.classList.remove('hidden');
    stepLoading.classList.add('hidden');
    
    if (role === 'student') {
        studentWizardContent.style.display = 'flex';
        studentWizardContent.style.flexDirection = 'column';
        studentWizardContent.style.alignItems = 'center';
        facultyWizardContent.style.display = 'none';
        
        // Reset student steps
        for(let i=1; i<=8; i++) {
            const step = document.getElementById(`step-s${i}`);
            if(step) step.classList.add('hidden');
        }
        document.getElementById('step-s1').classList.remove('hidden');
    } else {
        studentWizardContent.style.display = 'none';
        facultyWizardContent.style.display = 'flex';
        facultyWizardContent.style.flexDirection = 'column';
        facultyWizardContent.style.alignItems = 'center';
        
        // Reset faculty steps
        document.getElementById('step-f1').classList.remove('hidden');
        document.getElementById('step-f2').classList.add('hidden');
        document.getElementById('step-f3').classList.add('hidden');
        document.getElementById('step-f4').classList.add('hidden');
    }
    window.scrollTo(0,0);
}

function cancelWizard() {
    wizardView.classList.add('hidden');
    heroView.classList.remove('hidden');
    mainNav.classList.remove('hidden');
}

// Student Flow
function nextStudentStep(currentStepNum) {
    const errorMsg = document.getElementById(`error-s${currentStepNum}`);
    if (errorMsg) errorMsg.classList.add('hidden');

    if (currentStepNum === 1) {
        studentData.name = document.getElementById('student-name').value;
        studentData.dob = document.getElementById('student-dob').value;
        studentData.email = document.getElementById('student-email').value.trim();
        studentData.mobile = document.getElementById('student-mobile').value;
        
        if(!studentData.name || !studentData.dob || !studentData.email || !studentData.mobile) {
            if(errorMsg) { errorMsg.innerText = "Please fill out all mandatory fields."; errorMsg.classList.remove('hidden'); }
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(studentData.email)) {
            if(errorMsg) { errorMsg.innerText = "Please enter a valid email address."; errorMsg.classList.remove('hidden'); }
            return;
        }
    }
    
    if (currentStepNum === 2) {
        studentData.state = document.getElementById('student-state').value;
        studentData.city = document.getElementById('student-city').value;
        const schoolVal = document.getElementById('student-school').value;
        studentData.school = schoolVal === 'Other (Custom)' ? document.getElementById('student-school-custom').value : schoolVal;
        
        if(!studentData.state || !studentData.city || !studentData.school) {
            if(errorMsg) errorMsg.classList.remove('hidden'); return;
        }
    }

    if (currentStepNum === 3) {
        studentData.level = document.getElementById('student-level').value;
        studentData.region = document.getElementById('student-region').value;
        
        if(!studentData.level || !studentData.region) {
            if(errorMsg) errorMsg.classList.remove('hidden'); return;
        }
        
        const c10th = document.getElementById('container-10th');
        const c12th = document.getElementById('container-12th');
        const cLast = document.getElementById('container-last-year');
        const lLast = document.getElementById('label-last-year');
        
        if (studentData.level === 'Class 9-10') {
            c10th.style.display = 'none';
            c12th.style.display = 'none';
            cLast.style.display = 'flex';
            lLast.innerText = "Previous Year Score (%)";
        } else if (studentData.level === 'Class 11-12') {
            c10th.style.display = 'flex';
            c12th.style.display = 'none';
            cLast.style.display = 'flex';
            lLast.innerText = "Class 11 Score (if applicable)";
        } else {
            c10th.style.display = 'flex';
            c12th.style.display = 'flex';
            cLast.style.display = 'flex';
            lLast.innerText = "Current CGPA (Percentage)";
        }
    }
    
    if (currentStepNum === 4) {
        studentData.marks10 = document.getElementById('student-10th').value;
        studentData.marks12 = document.getElementById('student-12th').value;
        studentData.marksLast = document.getElementById('student-last-year').value;
        
        let isValid = true;
        if(studentData.level === 'Class 9-10' && !studentData.marksLast) isValid = false;
        if(studentData.level === 'Class 11-12' && (!studentData.marks10 || !studentData.marksLast)) isValid = false;
        if((studentData.level === 'Undergraduate' || studentData.level === 'Postgraduate') && (!studentData.marks10 || !studentData.marks12 || !studentData.marksLast)) isValid = false;
        
        if(!isValid) {
            if(errorMsg) errorMsg.classList.remove('hidden'); return;
        }
    }
    
    if (currentStepNum === 5) {
        studentData.device = document.getElementById('student-device').value;
        studentData.net = document.getElementById('student-net').value;
        studentData.needs = document.getElementById('student-needs').value;
        
        if(!studentData.device || !studentData.net || !studentData.needs) {
            if(errorMsg) errorMsg.classList.remove('hidden'); return;
        }
    }

    if (currentStepNum === 7) {
        studentData.interest = document.getElementById('student-interest').value;
        if(!studentData.interest) {
            if(errorMsg) errorMsg.classList.remove('hidden'); return;
        }
    }
    
    document.getElementById(`step-s${currentStepNum}`).classList.add('hidden');
    document.getElementById(`step-s${currentStepNum + 1}`).classList.remove('hidden');
}

function setStudentExam(examName) {
    studentData.exam = examName;
    document.getElementById('step-s6').classList.add('hidden');
    document.getElementById('step-s7').classList.remove('hidden');
}

function finishStudentWizard(lang) {
    studentData.language = lang;
    document.getElementById(`step-s8`).classList.add('hidden');
    const loadingMessage = `VidyaSetu AI is securely analyzing ${studentData.name.split(' ')[0] || 'your'}'s profile from ${studentData.state}...`;
    const loadingSubMessage = `Generating a customized cognitive assessment based on the national curriculum for ${studentData.level}.`;
    triggerLoadingState(loadingMessage, loadingSubMessage);
}



// Faculty Flow
function nextFacultyStep(currentStepNum, selection) {
    if (currentStepNum === 1) facultyData.credential = selection;
    if (currentStepNum === 2) facultyData.subject = document.getElementById('faculty-subject').value;
    if (currentStepNum === 3) {
        facultyData.experience = document.getElementById('faculty-yoe').value;
        facultyData.institution = document.getElementById('faculty-inst').value;
    }
    
    document.getElementById(`step-f${currentStepNum}`).classList.add('hidden');
    document.getElementById(`step-f${currentStepNum + 1}`).classList.remove('hidden');
}

function finishFacultyWizard(style) {
    facultyData.pedagogy = style;
    document.getElementById(`step-f4`).classList.add('hidden');
    triggerLoadingState("Certifying Educator Profile...", "Validating credentials across national boards.");
}

function triggerLoadingState(title, subtitle) {
    stepLoading.classList.remove('hidden');
    loadingTitle.innerText = title;
    loadingSubtitle.innerText = subtitle;
    
    setTimeout(() => {
        if (activeRole === 'student' && document.getElementById('step-s8').classList.contains('hidden') && quizView.classList.contains('hidden') && quizScore === 0) {
            startQuiz();
        } else {
            generateProfileLogic();
            showProfileReveal();
        }
    }, 1500); 
}

// === Quiz Functions ===
function startQuiz() {
    wizardView.classList.add('hidden');
    stepLoading.classList.add('hidden');
    quizView.classList.remove('hidden');
    quizScore = 0;
    currentQuestionIndex = 0;
    activeQuizBank = quizBanks[studentData.level] || quizBanks['Class 9-10'];
    renderQuizQuestion();
    window.scrollTo(0,0);
}

function renderQuizQuestion() {
    const qData = activeQuizBank[currentQuestionIndex];
    document.getElementById('quiz-progress-text').innerText = `Cognitive Assessment: ${currentQuestionIndex + 1} of 10`;
    document.getElementById('quiz-progress-fill').style.width = `${((currentQuestionIndex + 1) / 10) * 100}%`;
    document.getElementById('quiz-question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    
    if (qData.type === 'visual') {
        optionsContainer.className = 'quiz-options quiz-image-grid mt-4';
    } else {
        optionsContainer.className = 'quiz-options grid-2 mt-4';
    }
    
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span>${opt.t}</span>`;
        btn.onclick = () => selectQuizAnswer(btn, opt.c);
        optionsContainer.appendChild(btn);
    });
}

function selectQuizAnswer(btnElement, isCorrect) {
    // Disable all buttons
    const allBtns = document.querySelectorAll('.quiz-option');
    allBtns.forEach(b => b.onclick = null);
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        quizScore++;
        // const scoreElement = document.getElementById('quiz-score');
        // if(scoreElement) scoreElement.innerText = quizScore;
    } else {
        btnElement.classList.add('incorrect');
        // highlight correct one
        allBtns.forEach((b, i) => {
            if (activeQuizBank[currentQuestionIndex].options[i].c) {
                b.classList.add('correct');
            }
        });
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < activeQuizBank.length) {
            renderQuizQuestion();
        } else {
            finishQuiz();
        }
    }, 600);
}

function finishQuiz() {
    quizView.classList.add('hidden');
    wizardView.classList.remove('hidden');
    stepLoading.classList.remove('hidden');
    
    loadingTitle.innerText = "Analyzing Cognitive Load...";
    loadingSubtitle.innerText = "Finding the perfect educator match based on your results.";
    
    setTimeout(() => {
        generateProfileLogic();
        showProfileReveal();
    }, 2500);
}

function generateProfileLogic() {
    if (activeRole === 'student') {
        userProfile.title = "Student Academic Profile Generated";
        userProfile.icon = "ph-brain";
        userProfile.label = "Primary Learning Archetype";
        userProfile.archetype = `${studentData.level || 'Student'} | ${studentData.exam || 'General'} Aspirant`;
        userProfile.confidence = "System Confidence Rating: 98.4%";
        
        let avgMarks = studentData.marks10 || '--'; 
        let rank = "Tier 1 Priority Learner";
        
        // Determine accessibility tags
        let tags = [];
        if (studentData.region === 'Rural' || studentData.region === 'Tribal') tags.push("Rural Outreach");
        if (studentData.net === 'Unstable/Offline') tags.push("Offline Optimized");
        if (studentData.needs !== 'None' && studentData.needs) tags.push("Inclusive Mode Active");
        tags.push(`${studentData.language || 'English'} Medium`);
        
        let tagsHTML = tags.map(tag => `<span style="display:inline-block; background:rgba(56,189,248,0.1); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:4px 8px; border-radius:4px; font-size:0.75rem; margin-right:4px; margin-bottom:4px;">${tag}</span>`).join('');
        
        userProfile.dashData = {
            name: studentData.name,
            dob: studentData.dob,
            mobile: "+91 " + studentData.mobile,
            email: studentData.email,
            school: studentData.school,
            location: `${studentData.city}, ${studentData.state}`,
            domain: studentData.interest || 'Undeclared',
            standing: `${rank} (Score: ${avgMarks})`,
            tagsHTML: tagsHTML,
            score: quizScore
        };

        document.getElementById('dashboard-archetype').innerText = (studentData.exam || 'General') + " Target";
    } else {
        userProfile.title = "Educator Certification Approved";
        userProfile.icon = "ph-certificate";
        userProfile.label = "National Educator Tier";
        userProfile.archetype = `Certified ${facultyData.subject || 'Subject'} Expert`;
        userProfile.confidence = "Verification Status: Authentic";
        userProfile.dashData = null;
        
        document.getElementById('dashboard-archetype').innerText = "Faculty Node";
    }
}

function showProfileReveal() {
    wizardView.classList.add('hidden');
    profileRevealView.classList.remove('hidden');
    
    // Populate Header
    revealPreTitle.innerText = activeRole === 'student' ? "Assessment Complete" : "Verification Complete";
    revealTitle.innerText = activeRole === 'student' ? "Student Academic Profile" : "Educator Profile";
    revealIcon.className = `ph-fill ${userProfile.icon}`;
    revealLabel.innerText = userProfile.label;
    generatedArchetype.innerText = userProfile.archetype;
    revealConfidence.innerText = userProfile.confidence;
    
    if (activeRole === 'student' && userProfile.dashData) {
        document.getElementById('dash-name').innerText = userProfile.dashData.name;
        document.getElementById('dash-dob').innerText = userProfile.dashData.dob;
        document.getElementById('dash-mobile').innerText = userProfile.dashData.mobile;
        document.getElementById('dash-email').innerText = userProfile.dashData.email;
        
        document.getElementById('dash-school').innerText = userProfile.dashData.school;
        document.getElementById('dash-location').innerText = userProfile.dashData.location;
        document.getElementById('dash-domain').innerText = userProfile.dashData.domain;
        document.getElementById('dash-standing').innerText = userProfile.dashData.standing;
        document.getElementById('dash-tags').innerHTML = userProfile.dashData.tagsHTML;
        
        document.getElementById('dash-score-val').innerText = userProfile.dashData.score;
        
        // Animate the SVG ring and progress bars
        setTimeout(() => {
            const ring = document.getElementById('dash-score-ring');
            if(ring) ring.style.strokeDasharray = `${userProfile.dashData.score * 10}, 100`;
            
            // Randomize bar charts based on overall score for realistic demo
            const baseScore = userProfile.dashData.score * 10;
            const animateBar = (id) => {
                const bar = document.getElementById(id + '-bar');
                const txt = document.getElementById(id + '-txt');
                if(bar && txt) {
                    const val = Math.min(100, Math.max(10, baseScore + (Math.random() * 30 - 15)));
                    bar.style.width = `${val}%`;
                    txt.innerText = `${Math.round(val)}%`;
                    
                    if(val >= 80) bar.className = 'progress-fill fill-high';
                    else if(val >= 50) bar.className = 'progress-fill fill-med';
                    else bar.className = 'progress-fill fill-low';
                }
            };
            
            animateBar('score-logic');
            animateBar('score-verbal');
            animateBar('score-tech');
            animateBar('score-problem');
        }, 100);
    }
    
    window.scrollTo(0,0);
}

function saveProfile() {
    profileRevealView.classList.add('hidden');
    triggerLoadingState("Encrypting Profile into VidyaSetu Database...", "Securing identity data on national servers.");
    setTimeout(() => {
        stepLoading.classList.add('hidden');
        localStorage.setItem('studentProfileCreated', 'true');
        localStorage.setItem('savedStudentData', JSON.stringify(studentData));
        localStorage.setItem('savedUserProfile', JSON.stringify(userProfile));
        goToDashboard();
    }, 2000);
}

const dashboardView = document.getElementById('dashboard-view');
const dashboardArchetype = document.getElementById('dashboard-archetype');
const searchInput = document.getElementById('search-input');
const searchLoading = document.getElementById('search-loading');
const searchResults = document.getElementById('search-results');
const tutorialGrid = document.getElementById('tutorial-grid');
const mentorGrid = document.getElementById('mentor-grid');

function goToDashboard() {
    profileRevealView.classList.add('hidden');
    document.body.classList.add('dashboard-active');
    document.getElementById('fixed-sidebar').classList.remove('hidden');
    dashboardView.classList.remove('hidden');
    
    // Toggle Nav Items
    const pubLinks = document.getElementById('nav-public-links');
    const pubActions = document.getElementById('nav-public-actions');
    const dashActions = document.getElementById('nav-dashboard-actions');
    if(pubLinks) pubLinks.style.display = 'none';
    if(pubActions) pubActions.style.display = 'none';
    if(dashActions) dashActions.style.display = 'flex';
    
    // Update Dashboard header
    dashboardArchetype.innerText = userProfile.archetype;
    
    // Reset Search View
    searchInput.value = '';
    searchLoading.classList.add('hidden');
    searchResults.classList.add('hidden');
    
    window.scrollTo(0,0);
}

function openProfileModal() {
    // Populate modal fields
    document.getElementById('pm-name').innerText = studentData.name || 'Student';
    document.getElementById('pm-email').innerText = studentData.email || 'N/A';
    document.getElementById('pm-mobile').innerText = studentData.mobile ? "+91 " + studentData.mobile : 'N/A';
    document.getElementById('pm-region').innerText = (studentData.city || '') + (studentData.state ? ', ' + studentData.state : '');
    document.getElementById('pm-school').innerText = studentData.school || 'N/A';
    document.getElementById('pm-exam').innerText = studentData.exam || 'N/A';
    document.getElementById('pm-domain').innerText = studentData.interest || 'N/A';
    
    // Populate API Key
    const apiKeyInput = document.getElementById('settings-api-key');
    if (apiKeyInput) {
        apiKeyInput.value = localStorage.getItem('user_api_key') || '';
    }
    
    const modal = document.getElementById('profile-modal');
    modal.classList.remove('hidden');
    // small timeout to allow display:block before opacity transition
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
    }, 10);
}

function saveCustomApiKey() {
    const input = document.getElementById('settings-api-key');
    if (input) {
        const val = input.value.trim();
        saveApiKey(val);
        alert('API Key saved successfully! It will be used for all AI features.');
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function editProfile() {
    closeProfileModal();
    // Hide dashboard, show wizard
    dashboardView.classList.add('hidden');
    profileRevealView.classList.add('hidden');
    document.getElementById('fixed-sidebar').classList.add('hidden');
    document.body.classList.remove('dashboard-active');
    
    // Repopulate DOM inputs from studentData
    if (activeRole === 'student') {
        document.getElementById('s-name').value = studentData.name || '';
        document.getElementById('s-email').value = studentData.email || '';
        document.getElementById('s-mobile').value = studentData.mobile || '';
        document.getElementById('s-city').value = studentData.city || '';
        document.getElementById('s-state').value = studentData.state || '';
        document.getElementById('s-school').value = studentData.school || '';
        document.getElementById('s-marks10').value = studentData.marks10 || '';
        document.getElementById('s-marks12').value = studentData.marks12 || '';
        document.getElementById('s-markslast').value = studentData.marksLast || '';
        
        wizardView.classList.remove('hidden');
        showStep(1); // Go back to first step of wizard
    }
}



function setSearch(topic) {
    searchInput.value = topic;
    executeSearch();
}

let GEMINI_API_KEY = localStorage.getItem('user_api_key') || "AQ.Ab8RN6Ibia_HaYYDg8M_os6D6IRvuqnf02oLu5ASRg00NTnvIg";

function saveApiKey(newKey) {
    if (newKey) {
        GEMINI_API_KEY = newKey.trim();
        localStorage.setItem('user_api_key', GEMINI_API_KEY);
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

function backToDashboardFromResults() {
    document.getElementById('ai-results-page').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    // Ensure ticker stays visible
}

async function executeSearch() {
    const topic = searchInput.value.trim();
    if (!topic) return;

    // Transition UI to the new AI Results Page
    document.getElementById('dashboard-view').classList.add('hidden');
    const resultsPage = document.getElementById('ai-results-page');
    resultsPage.classList.remove('hidden');
    window.scrollTo(0, 0);

    const loadingDiv = document.getElementById('ai-results-loading');
    const contentDiv = document.getElementById('ai-results-content');
    const videoGrid = document.getElementById('ai-video-grid');
    
    loadingDiv.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    videoGrid.innerHTML = '';

    try {
        const prompt = `You are an AI educational curator. The user wants to learn about '${topic}'. Their learning style is '${userProfile.archetype}' and their preferred language is ${studentData.language || 'English'}. 
Recommend exactly 3 highly relevant YouTube videos for them. You MUST provide real, existing YouTube video IDs. 
Return ONLY a raw JSON array of objects, with no markdown blocks or backticks. 
Each object must have exactly these keys: 'videoId' (string, the 11-character YouTube ID), 'title' (string), 'channel' (string), and 'reason' (string, a personalized 2-sentence explanation of why this fits their learning style).`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No candidates returned from API');
        }

        let jsonText = data.candidates[0].content.parts[0].text.trim();
        // Clean up potential markdown formatting from Gemini
        if (jsonText.startsWith('```json')) jsonText = jsonText.substring(7);
        if (jsonText.startsWith('```')) jsonText = jsonText.substring(3);
        if (jsonText.endsWith('```')) jsonText = jsonText.slice(0, -3);
        
        const videos = JSON.parse(jsonText.trim());

        renderVideos(videos);

    } catch (error) {
        console.error("Gemini API Error:", error);
        
        // Topic-based mock fallback since the API key is invalid/missing
        const searchLower = topic.toLowerCase();
        let fallbackVideos = [];

        if (searchLower.includes('html')) {
            fallbackVideos = [
                { videoId: 'pQN-pnXPaVg', title: 'HTML Full Course - Build a Website Tutorial', channel: 'freeCodeCamp.org', reason: 'Comprehensive guide covering all HTML fundamentals suitable for your learning style.' },
                { videoId: 'qz0aGYrrlhU', title: 'HTML Tutorial for Beginners: HTML Crash Course', channel: 'Programming with Mosh', reason: 'A fast-paced, highly visual introduction to HTML concepts.' },
                { videoId: 'kUMe1FH4CGY', title: 'HTML Tutorial for Beginners - Full Course', channel: 'Apna College', reason: 'Great structured approach for absolute beginners.' }
            ];
        } else if (searchLower.includes('css')) {
            fallbackVideos = [
                { videoId: '1Rs2ND1ryYc', title: 'CSS Tutorial - Zero to Hero', channel: 'freeCodeCamp.org', reason: 'Excellent visual representation of CSS styling techniques.' },
                { videoId: 'yfoY53QXEnI', title: 'CSS Crash Course For Absolute Beginners', channel: 'Traversy Media', reason: 'Practical, hands-on learning for mastering CSS properties.' },
                { videoId: 'Edsxf_NBFrw', title: 'CSS Tutorial In Hindi', channel: 'CodeWithHarry', reason: 'Matches your language preference perfectly with easy-to-understand explanations.' }
            ];
        } else if (searchLower.includes('javascript') || searchLower.includes('js')) {
            fallbackVideos = [
                { videoId: 'W6NZfCO5SIk', title: 'JavaScript Tutorial for Beginners', channel: 'Programming with Mosh', reason: 'A perfect foundational course for learning JS logic.' },
                { videoId: 'jS4aFq5-91M', title: 'JavaScript Programming - Full Course', channel: 'freeCodeCamp.org', reason: 'Deep dive into practical JavaScript programming.' },
                { videoId: 'VlPiVmYuoqw', title: 'JavaScript Tutorial In Hindi', channel: 'CodeWithHarry', reason: 'In-depth tutorial focused on logic and practical usage.' }
            ];
        } else if (searchLower.includes('python')) {
            fallbackVideos = [
                { videoId: '_uQrJ0TkZlc', title: 'Python Tutorial for Beginners', channel: 'Programming with Mosh', reason: 'Very popular beginner-friendly approach to Python.' },
                { videoId: 'rfscVS0vtbw', title: 'Learn Python - Full Course for Beginners', channel: 'freeCodeCamp.org', reason: 'Thorough coverage of all core Python programming concepts.' },
                { videoId: 'vLqTf2b6GZw', title: 'Python Tutorial in Hindi', channel: 'CodeWithHarry', reason: 'Excellent pacing and detailed explanations for your profile.' }
            ];
        } else {
            fallbackVideos = [
                {
                    videoId: 'kJQP7kiw5Fk',
                    title: `Introduction to ${topic}`,
                    channel: 'System Fallback',
                    reason: `Please update your GEMINI_API_KEY in app.js to get dynamic videos for "${topic}".`
                },
                {
                    videoId: 'dQw4w9WgXcQ',
                    title: `Advanced Concepts in ${topic}`,
                    channel: 'System Fallback',
                    reason: `Without a valid API key, we can only show these placeholder videos.`
                },
                {
                    videoId: 'jNQXAC9IVRw',
                    title: `Practical Examples of ${topic}`,
                    channel: 'System Fallback',
                    reason: `Add a valid Google Gemini API key to unlock the AI curator.`
                }
            ];
        }
        
        renderVideos(fallbackVideos);
    }
    
    function renderVideos(videos) {
        videos.forEach((video, index) => {
            let thumbUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
            videoGrid.innerHTML += `
                <div class="tutorial-card" style="box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff; cursor: pointer; transition: transform 0.2s;" onclick="playVideo('${video.videoId}', '${video.title.replace(/'/g, "\\'")}')">
                    <div style="background-image: url('${thumbUrl}'); width: 100%; aspect-ratio: 16/9; background-size: cover; background-position: center; position: relative;">
                        <div style="position: absolute; top: 12px; left: 12px; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.4); z-index: 10; border: 2px solid #ffffff;">
                            #${index + 1}
                        </div>
                        <div style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; transition: background 0.3s;" onmouseover="this.style.background='rgba(15,23,42,0.2)'" onmouseout="this.style.background='rgba(15,23,42,0.4)'">
                            <button class="btn-primary" style="border-radius: 50%; width: 56px; height: 56px; padding: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                                <i class="ph-fill ph-play" style="font-size: 1.5rem; margin-left: 4px;"></i>
                            </button>
                        </div>
                    </div>
                    <div style="padding: 1.5rem;">
                        <h4 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem 0; line-height: 1.4; font-weight: 700;">${video.title}</h4>
                        <p style="font-size: 0.9rem; color: #64748b; font-weight: 600; margin: 0 0 1rem 0;"><i class="ph-fill ph-user-circle"></i> ${video.channel}</p>
                        <div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 1.5rem;">
                            <p style="font-size: 0.9rem; color: #334155; margin: 0; line-height: 1.5;"><i class="ph-fill ph-sparkle" style="color: #3b82f6;"></i> ${video.reason}</p>
                        </div>
                        <button class="btn-primary block" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem; font-size: 1rem; padding: 0.75rem;">
                            <i class="ph-fill ph-play-circle" style="font-size: 1.25rem;"></i> Start Learning
                        </button>
                    </div>
                </div>
            `;
        });

        loadingDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
    }
}

// --- Learning Environment Functions ---
const learningView = document.getElementById('learning-view');
const learningVideoContainer = document.getElementById('learning-video-container');
const learningTopicTitle = document.getElementById('learning-topic-title');
const learningMentorDetails = document.getElementById('learning-mentor-details');

let currentFlashcards = [];
let currentFlashcardIndex = 0;

function playVideo(videoId, title) {
    // Hide dashboard and AI results, show learning view
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('ai-results-page').classList.add('hidden');
    learningView.classList.remove('hidden');
    
    // Set Title
    learningTopicTitle.innerText = title;
    
    // Inject iframe dynamically
    learningVideoContainer.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        title="VidyaSetu Video Player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen></iframe>
    `;

    // Populate Mentor Panel (Re-using top mentor logic)
    learningMentorDetails.innerHTML = `
        <div class="mentor-header" style="margin-bottom: 1rem;">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" alt="Alex" class="mentor-avatar" style="width: 50px; height: 50px;">
            <div class="mentor-info">
                <h3 style="font-size: 1.1rem;">Prof. Alex Rivera</h3>
                <p class="role" style="font-size: 0.85rem;">Head of Department, IIT</p>
            </div>
        </div>
        <div class="dna-tags" style="margin-bottom: 0;">
            <span class="tag"><i class="ph ph-chalkboard"></i> ${userProfile.archetype} Specialist</span>
            <span class="tag"><i class="ph ph-translate"></i> ${studentData.language || 'English'}</span>
        </div>
    `;

    // Reset Tabs
    switchTab('tab-notes');
    window.scrollTo(0,0);
    
    // Trigger AI Content Generation
    generateAIContent(title);
}

let currentQuizData = [];
let currentChatTopic = "";

async function generateAIContent(topic) {
    const loader = document.getElementById('ai-hub-loader');
    loader.classList.remove('hidden');
    currentChatTopic = topic;
    
    // Clear previous dynamic content
    document.getElementById('dynamic-notes-content').innerHTML = '';
    document.getElementById('quiz-list-container').innerHTML = '';
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('chat-history').innerHTML = `
        <div class="chat-message">
            <div class="chat-avatar"><i class="ph-fill ph-robot"></i></div>
            <div style="flex: 1;">
                <p style="font-weight: 600; margin-bottom: 0.25rem; color: var(--accent-primary);">VidyaSetu AI Assistant</p>
                <p id="dynamic-doubt-intro">The lecture transcript for "${topic}" has been processed. What specific concept requires clarification?</p>
            </div>
        </div>
    `;

    try {
        const generateText = async (prompt, isJson = false) => {
            const body = { contents: [{ parts: [{ text: prompt }] }] };
            if (isJson) body.generationConfig = { responseMimeType: "application/json" };
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            
            if (data.error) throw new Error(data.error.message);
            if (!data.candidates || !data.candidates[0].content) throw new Error("Invalid AI response");
            
            let text = data.candidates[0].content.parts[0].text.trim();
            if (isJson) {
                text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            }
            return text;
        };

        // Parallel Requests
        const [notesHtml, flashcardsJson, quizJson] = await Promise.all([
            generateText(`You are an expert tutor. Write a concise, 4-bullet point summary of the topic "${topic}" in raw HTML format using <ul>, <li>, and <strong> tags. Focus on key academic principles suitable for a ${userProfile.archetype}. Do not use markdown backticks, just raw HTML.`),
            generateText(`You are an expert tutor. Generate exactly 5 flashcards for the topic "${topic}". Return ONLY a raw JSON array of objects with no markdown backticks. Each object must have a 'q' (question) and 'a' (answer) key.`, true),
            generateText(`You are an expert tutor. Generate a 5-question multiple choice quiz on the topic "${topic}". Return ONLY a raw JSON array of objects with no markdown backticks. Each object must have: 'q' (the question string), 'options' (array of 4 string options), and 'correctIndex' (integer 0-3 indicating the correct option).`, true)
        ]);

        // Notes
        document.getElementById('dynamic-notes-content').innerHTML = notesHtml.replace(/```html|```/g, '');

        // Flashcards
        currentFlashcards = JSON.parse(flashcardsJson);
        currentFlashcardIndex = 0;
        renderFlashcard();

        // Quiz
        currentQuizData = JSON.parse(quizJson);
        renderQuizList();

    } catch (err) {
        console.error("AI Generation failed:", err);
        document.getElementById('dynamic-notes-content').innerHTML = `<p style="color:red;">Failed to generate AI content: ${err.message}. Please try again.</p>`;
    }

    loader.classList.add('hidden');
}

function renderQuizList() {
    const container = document.getElementById('quiz-list-container');
    container.innerHTML = '';
    currentQuizData.forEach((item, qIndex) => {
        let optionsHtml = item.options.map((opt, oIndex) => `
            <label class="quiz-option" style="display:block; margin-bottom: 0.5rem; cursor: pointer;">
                <input type="radio" name="q${qIndex}" value="${oIndex}"> ${opt}
            </label>
        `).join('');
        
        container.innerHTML += `
            <div style="margin-bottom: 2rem;">
                <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">${qIndex + 1}. ${item.q}</p>
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    });
}

function submitQuiz() {
    let score = 0;
    currentQuizData.forEach((item, qIndex) => {
        const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
        if (selected && parseInt(selected.value) === item.correctIndex) {
            score++;
        }
    });
    const results = document.getElementById('quiz-results');
    results.innerText = `You scored ${score} out of 5!`;
    results.classList.remove('hidden');
}

async function submitChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    input.value = '';
    const history = document.getElementById('chat-history');
    
    const safeMsg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // User message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message';
    userDiv.style.flexDirection = 'row-reverse';
    userDiv.innerHTML = `
        <div class="chat-avatar" style="background: var(--primary);"><i class="ph-fill ph-user" style="color:white;"></i></div>
        <div style="flex: 1; text-align: right;">
            <p style="font-weight: 600; margin-bottom: 0.25rem; color: var(--text-primary);">You</p>
            <p style="background: var(--bg-secondary); padding: 0.75rem; border-radius: 12px; display: inline-block; text-align: left;">${safeMsg}</p>
        </div>
    `;
    history.appendChild(userDiv);
    history.scrollTop = history.scrollHeight;

    // AI Loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-message';
    loadingDiv.innerHTML = `
        <div class="chat-avatar"><i class="ph-fill ph-robot"></i></div>
        <div style="flex: 1;">
            <p style="font-weight: 600; margin-bottom: 0.25rem; color: var(--accent-primary);">VidyaSetu AI Assistant</p>
            <p>Thinking...</p>
        </div>
    `;
    history.appendChild(loadingDiv);
    history.scrollTop = history.scrollHeight;

    try {
        const prompt = `You are an AI Tutor named VidyaSetu AI Assistant. You are helping a student who is learning about "${currentChatTopic}". The student asks: "${msg}". Provide a direct, professional, and academically accurate response. Write in plain paragraphs ONLY. Do NOT use markdown formatting, hashtags (###), bullet points, or asterisks (**). Answer exactly what is asked without conversational filler.`;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);
        if (!data.candidates || !data.candidates[0].content) throw new Error("Invalid AI response");
        
        let aiResponse = data.candidates[0].content.parts[0].text;
        
        // Strip out markdown formatting (asterisks, hashtags) to keep it clean and professional
        aiResponse = aiResponse.replace(/[*#]/g, '');
        
        loadingDiv.innerHTML = `
            <div class="chat-avatar"><i class="ph-fill ph-robot"></i></div>
            <div style="flex: 1;">
                <p style="font-weight: 600; margin-bottom: 0.25rem; color: var(--accent-primary);">VidyaSetu AI Assistant</p>
                <p>${aiResponse.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    } catch (err) {
        console.error(err);
        loadingDiv.innerHTML = `
            <div class="chat-avatar"><i class="ph-fill ph-robot"></i></div>
            <div style="flex: 1;">
                <p style="font-weight: 600; margin-bottom: 0.25rem; color: red;">System Error</p>
                <p>Sorry, I encountered an error: ${err.message}</p>
            </div>
        `;
    }
    history.scrollTop = history.scrollHeight;
}

function handleChatEnter(event) {
    if (event.key === 'Enter') submitChat();
}

function renderFlashcard() {
    const fc = currentFlashcards[currentFlashcardIndex];
    document.getElementById('flashcard-q').innerText = fc.q;
    document.getElementById('flashcard-a').innerText = fc.a;
    document.getElementById('flashcard-counter').innerText = `${currentFlashcardIndex + 1} / ${currentFlashcards.length}`;
    
    // Ensure card is front-facing when changing
    document.getElementById('dynamic-flashcard').classList.remove('flipped');
}

function nextFlashcard(direction) {
    currentFlashcardIndex += direction;
    if (currentFlashcardIndex < 0) currentFlashcardIndex = currentFlashcards.length - 1;
    if (currentFlashcardIndex >= currentFlashcards.length) currentFlashcardIndex = 0;
    
    // Slight delay to allow flip animation to reset if it was flipped
    document.getElementById('dynamic-flashcard').classList.remove('flipped');
    setTimeout(() => {
        renderFlashcard();
    }, 150);
}

function backToDashboard() {
    learningView.classList.add('hidden');
    learningVideoContainer.innerHTML = ''; // Stop video playback
    dashboardView.classList.remove('hidden');
    window.scrollTo(0,0);
}

// --- Interactive Hub Tab Logic ---
function switchTab(tabId) {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.classList.add('hidden');
    });

    // Add active class to clicked button
    const activeBtn = document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Show active pane
    const activePane = document.getElementById(tabId);
    if (activePane) {
        activePane.classList.remove('hidden');
        activePane.classList.add('active');
    }
}

function resetApp() {
    // Reset State
    localStorage.removeItem('studentProfileCreated');
    localStorage.removeItem('savedStudentData');
    localStorage.removeItem('savedUserProfile');
    studentData = { level: '', region: '', marks10: '', marks12: '', marksLast: '', device: '', net: '', needs: '', exam: '', interest: '', language: '' };
    facultyData = { credential: '', subject: '', experience: '', institution: '', pedagogy: '' };
    activeRole = '';
    
    // Hide all, Show Hero
    learningView.classList.add('hidden');
    learningVideoContainer.innerHTML = ''; // Stop video
    dashboardView.classList.add('hidden');
    profileRevealView.classList.add('hidden');
    wizardView.classList.add('hidden');
    roleSelectionView.classList.add('hidden');
    quizView.classList.add('hidden');
    
    if(document.getElementById('quiz-score')) document.getElementById('quiz-score').innerText = '0';
    
    heroView.classList.remove('hidden');
    mainNav.classList.remove('hidden');
    document.body.classList.remove('dashboard-active');
    document.getElementById('fixed-sidebar').classList.add('hidden');
    
    // Toggle Nav Items Back
    const pubLinks = document.getElementById('nav-public-links');
    const pubActions = document.getElementById('nav-public-actions');
    const dashActions = document.getElementById('nav-dashboard-actions');
    if(pubLinks) pubLinks.style.display = 'flex';
    if(pubActions) pubActions.style.display = 'flex';
    if(dashActions) dashActions.style.display = 'none';
    
    // Reset loading texts
    loadingTitle.innerText = "Evaluating Profile...";
    loadingSubtitle.innerText = "Syncing with national database standards.";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onload = () => {
    if (localStorage.getItem('studentProfileCreated') === 'true') {
        activeRole = 'student';
        
        const savedData = localStorage.getItem('savedStudentData');
        const savedProfile = localStorage.getItem('savedUserProfile');
        if (savedData && savedProfile) {
            studentData = JSON.parse(savedData);
            userProfile = JSON.parse(savedProfile);
        }
        
        document.getElementById('hero-view').classList.add('hidden');
        goToDashboard();
    }
};
