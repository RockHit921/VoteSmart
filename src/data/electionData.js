export const electionContent = {
  learningModules: [
    {
      id: "basics",
      title: "How elections work in India",
      steps: [
        {
          title: "What is an election?",
          content: "In a democracy, an election is a process where citizens choose their representatives who will form the government and make decisions on their behalf."
        },
        {
          title: "Who conducts the elections?",
          content: "The Election Commission of India (ECI) is an independent constitutional body responsible for administering elections across the country. They ensure elections are free and fair."
        },
        {
          title: "Types of Elections",
          content: "There are mainly three types of elections: Lok Sabha (National level to choose the Prime Minister), Vidhan Sabha (State level to choose the Chief Minister), and Local Body elections (Panchayats and Municipalities)."
        },
        {
          title: "The Voting Process",
          content: "It starts with voter registration, followed by receiving a Voter ID. On polling day, you visit the booth, verify your identity, and cast your vote using an Electronic Voting Machine (EVM)."
        }
      ]
    },
    {
      id: "register",
      title: "How to register and vote (Step-by-Step)",
      steps: [
        {
          title: "Step 1: Check Eligibility",
          content: "You must be an Indian citizen, 18 years of age or older on the qualifying date (usually January 1st of the year), and a resident of the polling area."
        },
        {
          title: "Step 2: Fill Form 6",
          content: "To register, you need to fill out Form 6. You can do this online via the Voter Portal (voters.eci.gov.in) or offline by submitting it to your Electoral Registration Officer."
        },
        {
          title: "Step 3: Keep Documents Ready",
          content: "You will need a passport-size photograph, proof of age (like a birth certificate or 10th mark sheet), and proof of address (like an Aadhaar card or electricity bill)."
        },
        {
          title: "Step 4: Get Your Voter ID",
          content: "Once verified, your name will be added to the Electoral Roll, and you will receive your EPIC (Voter ID card) by mail."
        },
        {
          title: "Step 5: Polling Day",
          content: "On election day, check your name on the voter list, go to your designated polling booth, show your ID, and press the button on the EVM next to your chosen candidate."
        }
      ]
    },
    {
      id: "timeline",
      title: "Election timeline and process",
      steps: [
        {
          title: "1. Announcement",
          content: "The ECI announces the election dates and the Model Code of Conduct comes into effect immediately, setting rules for parties and candidates."
        },
        {
          title: "2. Nomination",
          content: "Candidates file their nomination papers, declaring their assets, criminal records (if any), and educational background."
        },
        {
          title: "3. Campaigning",
          content: "Candidates and parties campaign to share their vision. Campaigning officially stops 48 hours before polling begins."
        },
        {
          title: "4. Voting Day",
          content: "Citizens go to the polling booths to cast their votes securely using EVMs and VVPATs."
        },
        {
          title: "5. Counting & Results",
          content: "On a predetermined date, votes from all EVMs are counted under strict security, and results are declared."
        }
      ]
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: "Who is responsible for conducting Lok Sabha elections in India?",
      options: ["The Supreme Court", "The Parliament", "Election Commission of India", "The President"],
      answer: 2,
      explanation: "The Election Commission of India (ECI) is an independent body that conducts Lok Sabha, Rajya Sabha, and State Assembly elections."
    },
    {
      id: 2,
      question: "What is the minimum voting age in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      answer: 1,
      explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years."
    },
    {
      id: 3,
      question: "What does EVM stand for?",
      options: ["Election Voting Machine", "Electronic Voting Machine", "Electrical Voter Mechanism", "Efficient Voting Method"],
      answer: 1,
      explanation: "EVM stands for Electronic Voting Machine, which replaced paper ballots in Indian elections."
    },
    {
      id: 4,
      question: "Which form must a new voter fill out to register?",
      options: ["Form 4", "Form 6", "Form 8", "Form 10"],
      answer: 1,
      explanation: "Form 6 is the application form for new voters to get their names registered in the Electoral Roll."
    },
    {
      id: 5,
      question: "What comes into effect immediately after election dates are announced?",
      options: ["Voting starts", "Model Code of Conduct", "Parliament dissolves", "Results are declared"],
      answer: 1,
      explanation: "The Model Code of Conduct (MCC) comes into force immediately to ensure fair campaigning."
    }
  ],
  flashcards: [
    {
      front: "Who can vote in India?",
      back: "Any Indian citizen aged 18 or above who is registered in the electoral roll."
    },
    {
      front: "What is an EPIC?",
      back: "Electors Photo Identity Card. It's the official name for your Voter ID card."
    },
    {
      front: "What is VVPAT?",
      back: "Voter Verifiable Paper Audit Trail. It prints a slip confirming your vote went to the correct candidate."
    },
    {
      front: "What is the Model Code of Conduct?",
      back: "A set of guidelines issued by ECI to regulate political parties and candidates during elections."
    },
    {
      front: "Can you vote if you don't have a Voter ID card but your name is on the list?",
      back: "Yes, you can use other ECI-approved photo ID documents like an Aadhaar card, PAN card, or passport."
    }
  ],
  scenarios: [
    {
      id: 1,
      scenario: "You are a first-time voter who just turned 18. What should you do first?",
      options: [
        { text: "Go to the polling booth on election day", correct: false, response: "You can't vote without registering first!" },
        { text: "Fill Form 6 to register your name on the voter list", correct: true, response: "Correct! You need to get on the Electoral Roll before you can vote." },
        { text: "Join a political party", correct: false, response: "While you can join a party, it's not a requirement for voting." }
      ]
    }
  ]
};
