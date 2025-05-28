module.exports = function(app, passport, db, upload, GoogleGenAI, Type) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================
    app.post('/images', upload.single('image'), async (req, res) => {
      if (!req.file) {
        res.status(400).json({'error': 'Please attach an image'});
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GAPI_KEY });
      
      async function main() {
        const base64ImageFile = req.file.buffer.toString('base64');
        const contents = [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: base64ImageFile,
            },
          },
          { text: `
            The image below contains a receipt, extract the data and return a JSON response, 
            do not include any content in your response that is not the json text, all numbers must be to 2 decimal places
            `
          },
        ];
        // :
        //     Format JSON:
        //     {
        //       "items": [
        //         {
        //           "quantity": Number,
        //           "price": Number,
        //           "name": Number
        //         },
        //       ],
        //       "subTotal": Number (the sum of all item prices on the receipt)
        //       "tax": Number,
        //       "total": Number,
        //     }
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-04-17",
          contents: contents,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                'tax': {
                  type: Type.NUMBER,
                  description: 'Tax in usd to two decimal places',
                  nullable: false,
                  default: 0,
                },
                'total': {
                  type: Type.NUMBER,
                  description: 'The total in usd to two decimal places',
                  nullable: false,
                },
                'subTotal': {
                  type: Type.NUMBER,
                  description: 'The subtotal in usd, or the cost of all items in the receipt to two decimal places',
                  nullable: false,
                },
                'items': {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      'quantity': {
                        type: Type.NUMBER,
                        description: 'The number of the items bought to two decimal places',
                        nullable: false,
                        default: 0,
                      },
                      'price': {
                        type: Type.NUMBER,
                        description: 'The price of the item in usd to two decimal places',
                        nullable: false,
                      },
                      'name': {
                        type: Type.STRING,
                        description: 'The name or description of the item',
                        nullable: false,
                      },
                    },
                    required: ['quantity', 'price', 'name'],
                  }
                }
              },
              required: ['tax', 'total', 'subTotal', 'items'],
            },
          },
        });
        res.status(200).json({response});
      }
      
      await main();
    });

    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
