app.factory('messageFactory', [function ($http) {

    return {

        temp: function (celsius) {

            var msg;

             //funny messages : )
            if (celsius > 40)
                msg = 'Let\'s fry some eggs in the floor!';
            if (celsius < 40 && celsius > 25)
                msg = 'Pretty hot, isn\'t it? We better go to the beach!';
            if (celsius < 25 && celsius > 15)
                msg = 'It\'s so cozy! How about some tea and a good book?';
            if (celsius < 15 && celsius > 10)
                msg = 'It\'s getting cold, grab me some hot chocolate!';
            if (celsius < 10 && celsius > 0)
                msg = 'Don\'t forget your coat!';
            if (celsius < 0)
                msg = 'I think that I saw a penguin around here...';

            return msg;

        }

    };

}]); //end location factory