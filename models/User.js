// models/User.js
class User {
      constructor(id, name, email, password, phone, dob, educationDescription) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dob = dob;
        this.educationDescription = educationDescription;
      }
    }
    
    module.exports = User;
    