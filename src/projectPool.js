
// Class to create the Project pool
class ProjectPool {

    // Constructor for the transaction pool as an array of transactions
    constructor() {
        this.projectsInPool = [];
    }

    // Function to add transactions to the transaction pool
    addProject(addNew) {
        this.projectsInPool.push(addNew);  
        return this.projectsInPool;
    };

};

//const newProjectPool = new ProjectPool; 

module.exports = ProjectPool;

