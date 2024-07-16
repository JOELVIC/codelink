// models/Registration.js
class Registration {
      constructor(id, userId, programId, status) {
        this.id = id;
        this.userId = userId;
        this.programId = programId;
        this.status = status; // 'pending', 'approved', 'cancelled'
      }
    }
    
    module.exports = Registration;
    