// models/Program.js
class Program {
      constructor(id, name, description, type, image, duration, courses) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.image = image;
        this.duration = duration;
        this.courses = courses; // Array of course objects
      }
    }
    
    module.exports = Program;
    