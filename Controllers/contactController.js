const asyncHandler = require("express-async-handler");
const Contact = require("../models/model");

const getContact = async (req, res) => {

  try {
    const contact = await Contact.findById(req.params.id);
    console.log('Contact found:', contact);
    if (!contact) {
      console.log('Contact not found!');
      return res.status(404).json({message : "Not Found!"});
      
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});

  res.status(200).json(contacts);
});
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(201).json(contact);
});

const editContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found")
    }
    if(contact.user_id.toString() !== req.user.id){
      return res.status(403).json({message:"User dont have permission to update other user contacts!"})
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
      return res.status(403).json({message:"User dont have permission to delete other user contacts!"})
    }
    await Contact.deleteOne();

  res.status(200).json(contact);
});

module.exports = {
  getContact,
  deleteContact,
  editContact,
  createContact,
  getContacts,
};
