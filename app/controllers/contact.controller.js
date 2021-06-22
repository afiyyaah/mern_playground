const db = require("../models");
const Contact = db.contacts;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        published: req.body.published ? req.body.published : false
      });

      contact
        .save(contact)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Contact.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contacts."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Contact.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
            });
          } else res.send({ message: "Contact was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating contact with id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Contact with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Contact was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete contact with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Contact.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Contacts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts."
      });
    });
};

exports.findAllPublished = (req, res) => {
    Contact.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};
