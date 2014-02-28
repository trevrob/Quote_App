module.exports = function Route(app){
  app.get('/', function(req, res){
    res.render('index', {title: 'Quotes', session_id: req.sessionID});
  });
  app.get('/math', function(req,res){
    res.render('math', {title: "Math", session_id: req.sessionID});
  })

  geek_quotes = ["The best way to predict the future is to create it.", "Winners never quit and quitters never win.", "It’s fine to celebrate success but it is more important to heed the lessons of failure.", "I have not failed. I’ve just found 10,000 ways that won’t work.", "If you cannot do great things, do small things in a great way.", "Success is not what you have, but who you are.", "You have an Idea, you make it work (The Mosh)"];

  artist_quotes = ["True art is characterized by an irresistible urge in the creative artist.","Art is art (Trevor)", "A picture is worth a thousand words.", "An artist is not paid for his labor but for his vision.", "We have art in order not to die of the truth.", "This world is but a canvas to our imagination.", "Life imitates art far more than art imitates Life." ];
  app.io.route('give_me_a_new_quote', function(req){
    if(room == 'geek')
      {
        var random_num = Math.floor((Math.random()*6)+1);
        var geek_quote = geek_quotes[random_num];
        // console.log(quote);
        req.io.emit('new_quote', {name: geek_quote});
      }
      else
      {
        var random_num = Math.floor((Math.random()*6)+1);
        var artist_quote = artist_quotes[random_num];
        // console.log(quote);
        req.io.emit('new_quote', {name: artist_quote});
      }
  })

  app.io.route('give_me_a_quote', function(req){
    var answer = req.data.answer;
    var correct_answer = req.data.correct_answer;
    room = req.data.room;
    // console.log(req);
    if(answer == correct_answer)
    {
      if(room == 'geek')
      {
        var random_num = Math.floor((Math.random()*6)+1);
        var geek_quote = geek_quotes[random_num];
        // console.log(quote);
        req.io.emit('new_quote', {name: geek_quote});
      }
      else
      {
        var random_num = Math.floor((Math.random()*6)+1);
        var artist_quote = artist_quotes[random_num];
        // console.log(quote);
        req.io.emit('new_quote', {name: artist_quote});
      }

    }
    else
    {
      var message = 'You entered the wrong answer! Try again!';
      // console.log('your wrong!!!');
      req.io.emit('wrong', message);
    }
  })





  // app.io.route('give_me_a_quote', function(req){
  //   var random_num = Math.floor((Math.random()*6)+1);
  //   var quote = quotes[random_num];

  //   req.io.emit('new_quote', {name: quote});

  // })

  

}
