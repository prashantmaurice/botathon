module.exports =  function(mongoose){
    //Trains schema
    var UserSchema = mongoose.Schema({
        userId : { type : String, unique : true},
        email : { type : String, unique : true},
        name : String,
        isdoctor : Boolean,
        facebookId : String,
        specialization : String,
        profilepic : String,
        children : [String],
        following : [String]
    });
    UserSchema.statics.createUserByEmail = function(data,cb) {
        this.create({
            email : data.email,
            userId : data.userId,
            name : data.name,
            facebookId : data.facebookId,
            profilepic : data.profilepic,
            isdoctor : data.isdoctor,
            children : [],
            following : []
        }, cb);
    };
    UserSchema.statics.updateUserBio = function(data,cb) {
        this.update(
            {userId : data.userId},
            data.change,
            {upsert : false}, cb
        );
    };
    //ThreadSchema.statics.upsertTrain = function(data,cb) {
    //    this.findOneAndUpdate({trainno : data.trainno, from :data.from, to: data.to}, data, {upsert : true}, cb);
    //};
    //ThreadSchema.statics.updateThread = function(data,cb) {
    //    this.findOneAndUpdate({trainno : data.trainno, from :data.from, to: data.to}, {fare:data.fare}, cb);
    //};
    //ThreadSchema.statics.getThread = function(data,cb) {
    //    this.find({trainno : data.trainno, from :data.from, to: data.to}, cb);
    //};
    //ThreadSchema.statics.getThreadByNum = function(data,cb) {
    //    this.find({trainno : data.trainno}, cb);
    //};
    UserSchema.statics.getUserById = function(data,cb) {
        this.findOne({userId : data.userId}, cb);
    };
    UserSchema.statics.getAllUsers = function(data,cb) {
        this.find({}, cb);
    };
    UserSchema.statics.getUserByEmail = function(data,cb) {
        this.findOne({email : data.email}, cb);
    };
    UserSchema.statics.getAllUsersD = function(params,cb) {
        this.find(cb);
    };

    //CRUD
    UserSchema.statics.createUserCRUD = function(data,cb) {
        var self = this;
        this.findOne({email : data.email}, function(err,res){
            if(res){ cb('user already exists2');return ;}//cb(err,res)
            console.log("REACH2");
            self.create({
                userId      :   data.userId,
                email  		: 	data.email,
                username    :   data.username,
                facebookId  :   data.facebookId,
                profilepic  :   data.profilepic
            }, cb);
        });

    };
    UserSchema.statics.readUserCRUD = function(data,cb) {
        this.findOne({userId : data.userId}, cb);
    };
    UserSchema.statics.updateUserCRUD = function(data,cb) {
        this.findOne({userId : data.userId}, cb);
    };
    UserSchema.statics.destroyUserCRUD = function(data,cb) {
        this.findOne({userId : data.userId}, cb);
    };


    return UserSchema;
};
