$(document).ready(function(){
  
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',

  questions: {
    q1: 'Which NBA Team Won the 2018 NBA Championship?',
    q2: 'Which NBA Player was the MVP of the 2018 NBA season?',
    q3: 'Derrick Rose plays for what NBA team In the Western Conference?',
    q4: 'This Player was the 2016 Championship MVP ?',
    q5: "Micheal Jordan retired on this NBA Franchise?",
    q6: 'Lebron James Plays for this NBA currently?',
    q7: "Penny Hardaway was a dynamic guard for what team with Shaquille Oneal?"
  },
  options: {
    q1: ['San Antonio Spurs', 'Memphis Grizzlies', 'Golden State Warriors', 'Cleveland Cavaliers'],
    q2: ['Kobe Bryant', 'Lebron JAmes', 'Stephon Curry', 'James Harden'],
    q3: ['Minnestoa Timberwolves', 'San Antonio Spurs', 'Los Angelos Lakers', 'Phoenix Suns'],
    q4: ['Stephon Curry', "Lebron James", "Kyrie Irving", "Jimmy Butler"],
    q5: ['Cristiano Ronaldo','Lionel Messi','Pele','Miroslav Klose'],
    q6: ['Oklahoma City Thunder','New York Knicks','Boston Celtics','Los Angelos Lakers'],
    q7: ["Orlando Magic", 'Seattele Supersonics', 'Milwaukee Bucks','Indiana Pacers']
  },
  answers: {
    q1: "Golden State Warriors",
    q2: "James Harden",
    q3: 'Minnesota Timberwolves',
    q4: 'Stephon Curry',
    q5: 'Washington Wizards',
    q6: 'Los Angelos LAkers',
    q7: 'Orlando Magic'
  },


  startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    $('#game').show();
   
    $('#results').html('');
    
    $('#timer').text(trivia.timer);
    
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
 
  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },

  timerRunning : function(){

    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
 
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
 
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      $('#game').hide();
      
      $('#start').show();
    }
    
  },

  guessChecker : function() {
    
    var resultId;
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }

    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  
  guessResult : function(){
    trivia.currentSet++;
    $('.option').remove();
    $('#results h3').remove();
    trivia.nextQuestion();
     
  }

}
 
































  