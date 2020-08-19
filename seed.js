const Campground = require("./models/Campground");
const Comment = require("./models/Comment");
const comment = require("./models/Comment");

const seeds = [
    {
        title : "first",
        image : "https://images.unsplash.com/photo-1592576117677-3ef618935b86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        body  : "Ea consequat aliqua duis labore ullamco enim aliquip dolore ut ipsum in. Incididunt non amet velit ex anim sit nisi. Culpa tempor et minim aliquip velit occaecat fugiat duis enim occaecat nostrud ea reprehenderit reprehenderit. Proident ea dolor quis voluptate elit. Nulla ut ipsum aliqua veniam magna aute."
    },
    {
        title : "second",
        image : "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        body  : "Veniam minim esse esse dolore incididunt. Minim id anim reprehenderit sint ex excepteur eu officia irure et ut adipisicing. Dolor fugiat culpa culpa minim dolor consequat ut pariatur minim. Non aute officia enim anim exercitation. Nulla aliquip excepteur ut quis Lorem officia pariatur aliquip ipsum labore incididunt adipisicing laboris eiusmod. Quis sint ut qui dolore."
    },
    {
        title : "third",
        image : "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        body  : "Tempor ea esse velit aliqua pariatur pariatur dolor labore aliqua velit fugiat ad. Aute eu cupidatat consectetur amet consequat. Adipisicing ex aliquip magna qui dolore eiusmod nostrud consequat commodo elit mollit. Deserunt reprehenderit deserunt ullamco id ullamco dolore laboris eiusmod. Esse dolore mollit eiusmod ipsum."
    },
    {
        title : "fourth",
        image : "https://images.unsplash.com/photo-1546422276-2448de17a209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        body  : "Tempor ea esse velit aliqua pariatur pariatur dolor labore aliqua velit fugiat ad. Aute eu cupidatat consectetur amet consequat. Adipisicing ex aliquip magna qui dolore eiusmod nostrud consequat commodo elit mollit. Deserunt reprehenderit deserunt ullamco id ullamco dolore laboris eiusmod. Esse dolore mollit eiusmod ipsum."
    }
];
 

async function seedDB(){
    try{
        await Campground.deleteMany({});
        await Comment.deleteMany({});

        for(const seed of seeds){
            let campgroundCreated = await Campground.create(seed);
            let commentCreated = await Comment.create({content : "This is the first comment on each campground!" , author : "Sam"});

            campgroundCreated.comments.push(commentCreated);
            campgroundCreated.save();
        }
    }
    catch(err){
        console.log(err)
    }

};

module.exports = seedDB;