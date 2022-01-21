import Vue from "vue";

export const store = Vue.observable({
  triviaVersion: null,
  stage: null,
  title: null,
  img: null,

// Episode Mix-up
  currentRound: null,
  rounds: [],

// Character Match  
	score: null,
	currentCategory: null,
	categories: [],

// Vocab Trivia
  currentQuestion: null, 
  feedbackIndex: null,
  questionText: null,
  questions: [],
  answers: [],

});

export const mutations = {
	
	setRounds( rounds ) {
		store.rounds = rounds;
	},

  setCurrentRound(n) {
    store.currentRound = n;
  },

	setCategories( categories ) {
		store.categories = categories;
	},

  setCurrentCategory(n) {
    store.currentCategory = n;
  },

	setScore(n) {
		store.score = n;
	},

  setStage(stage) {
    store.stage = stage;
  },
  
  setTitle(title) {
    store.title = title;
  },
  
  setImg(img) {
    store.img = img;
  },
  
  setTriviaVersion( version ) {
    store.triviaVersion = version;
  },
  
  setQuestions(questions) {
    store.questions = questions;
  },
    
  setCurrentQuestion(n) {
    store.currentQuestion = n;
  },

  setQuestionText( questionText ) {
    store.questionText = questionText;
  },
  
  setFeedbackIndex(n) {
    store.feedbackIndex = n;
  },
  
  addAnswer(answer) {
    store.answers.push(answer);
  },
  
  setAnswers(answers) {
    store.answers = answers;
  },
    
  resetAnswers() {
    store.answers = [];
  },  
};

export const episodeActions = {
  async fetchData( json ) {
    mutations.setRounds( json.rounds );
  }
};

export const matchActions = {
  async fetchData( json ) {
    mutations.setCategories( json.categories );
  }
};

export const actions = {
  async fetchData( json ) {
    mutations.setTriviaVersion( json.version );
    console.log("version = " + json.version );
    mutations.setQuestions( json.questions );
  }
};