const bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      express               = require("express"),
      Campground            = require("./models/Campground"),
      Comment               = require("./models/Comment"),
      User                  = require("./models/User");
      passport              = require("passport"),
      localStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      seedDB                = require("./seed"),
      methodOverride        = require("method-override"),
      flash                 = require("connect-flash"),
	  app                   = express();

const campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes    = require("./routes/comments"),
      indexRoutes      = require("./routes/index");
      
// mongoose.connect("mongodb://localhost:27017/yelpcamp" , {
// 	useNewUrlParser : true,
// 	useUnifiedTopology : true
// })
mongoose.connect("mongodb+srv://blk_ht_hk_r:m99tECm4YeAXQPK@mongosam.kcf7c.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority" , {
	useNewUrlParser : true,
	useUnifiedTopology : true
})
.then(() => console.log("Connected to DB!"))
.catch(err => console.log(err.message));

app.set("view engine" , "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(flash());

//creating new campground and comment each time server starts
//seedDB();

//setting everything for Auth usage
app.use(require("express-session")({
    secret : "Samyak is not a good programmer!",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing the data of flash messages and the current user data to all the templates
app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


app.use("/" , indexRoutes);
app.use("/campgrounds" , campgroundRoutes);
app.use("/campgrounds/:id/comments" , commentRoutes);






//configuring the port settings for heroku hosting
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Start the server
app.listen(port , () => {
	console.log("Server has started on port 3000!");
});
