
// Class to create the Project pool
class ProjectPool {

    // Constructor for the transaction pool as an array of transactions
    constructor() {
        this.projects = [];
    }

    // Function to add transactions to the transaction pool
    addProject(addNew) {
        this.projects.push(addNew);  
        return this.projects;
    };

    updateProject(projectID, updatedProject) {
        const index = this.projects.findIndex(p => p.projectID === projectID);
        if (index !== -1) {
            this.projects[index] = updatedProject;
        }
        return this.projects;
    }

    getAllProjects() {
        return this.projects;
    }

};

//const newProjectPool = new ProjectPool; 

module.exports = ProjectPool;

