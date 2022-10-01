const router = require("express").Router();
const Journal = require("../models/Journal");
const { verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin} = require("./verifyToken");



//CREATE A NOTE 

router.post("/", verifyTokenAndAuthorization, async(req,res)=>{
    const newNote = new Journal(req.body)
    try{
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE A NOTE 
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const updatedNote = await Journal.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedNote);

    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE A NOTE 
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Journal.findByIdAndDelete(req.params.id);
        res.status(200).json("Note has been deleted!")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET A NOTE 
router.get("/find/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
    const note = await Journal.findById(req.params.id);
    res.status(200).json(note);
    }catch(err){
        res.status(500).json(err)
    }

});

//GET USER JOURNAL 
router.get("/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const notes = await Journal.find({ userId: req.params.userId });
        res.status(200).json(notes);

    }catch(err){
        res.status(500).json(err);

    }
});


module.exports = router;