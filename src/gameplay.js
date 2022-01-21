import { store, mutations } from "./store";
import { version as appVersion } from "../package.json";

export const gameplay = {
    async init( fetchData ) {
      await fetchData;
      
// 			mutations.setStage( "instructions" );
      mutations.setCurrentQuestion( null );
      mutations.setFeedbackIndex( null );
      mutations.resetAnswers();

      if (
        !localStorage.stage ||

        localStorage.stage === "instructions" ||
        localStorage.appVersion !== appVersion ||
        localStorage.triviaVersion !== store.triviaVersion
      ) {

        this.initInstructStage();
      } else if ( localStorage.stage === "gameOn" ) {
        this.initTriviaStage( localStorage.currentQuestion || 1 );
      } else {
        this.initResultsStage();
      }
    },
    
    initInstructStage( appVersion, loading ) {

      mutations.setStage( "instructions" );
      mutations.setTitle( "INSTRUCTIONS" );
/*       mutations.setImg(welcomeImg); */
      mutations.setCurrentQuestion( 0 );
      mutations.setFeedbackIndex( 0 );
      mutations.resetAnswers();

      localStorage.appVersion = appVersion;
      localStorage.triviaVersion = store.triviaVersion;

      loading = false;
    },
    
    initWelcomeStage() {
      mutations.setStage( "welcome" );
      mutations.setTitle( "How Well Do You Know Friends?" );
/*       mutations.setImg(welcomeImg); */
      mutations.setCurrentQuestion( 0 );
      mutations.setFeedbackIndex( 0 );
      mutations.resetAnswers();

      localStorage.appVersion = appVersion;
      localStorage.triviaVersion = store.triviaVersion;

      this.loading = false;
    },
    
    initTriviaStage( currentQuestion, questions ) {
      mutations.setStage( "gameOn" );
      mutations.setTitle( localStorage.questionText );
      mutations.setQuestionText( localStorage.setQuestionText );
      mutations.setAnswers(
        localStorage.answers ? localStorage.answers.split(",") : []
      );
      this.goToQuestion( +currentQuestion || 1, questions );
      this.loading = false;
    },

    initFeedbackStage() {
			mutations.setStage( "feedback" )

      this.loading = false;
    },
    
    initResultsStage() {
      mutations.setStage( "results" );
      
      mutations.setAnswers( localStorage.answers.split(",") );
      mutations.setTitle(
        `Your Score: ${ this.correctAnswers } out of ${ this.questions.length }`
      );
      mutations.setImg(this.resultsInfo.img);
      mutations.setCurrentQuestion( null );
      mutations.setFeedbackIndex( null );
      this.loading = false;
    },
    
    goToQuestion( qNum, questionsArr ) {
	    console.log( "goToQuestion called" );
	    console.log( questionsArr );
//       usersAnswer = null;
      const qText = questionsArr[ qNum - 1 ].question;
			mutations.setQuestionText( qText );
      mutations.setCurrentQuestion( qNum );
      mutations.setFeedbackIndex( qNum );
    },
}