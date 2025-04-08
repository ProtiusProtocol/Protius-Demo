const { generateUUID } = require("pubnub")


class ProjectDevelopmentPhase {
    constructor ( projectName, projectDeveloper, projectPhases ){
        this.projectName = projectName,
        this.projectDeveloper = projectDeveloper,
        this.projectPhases = projectPhases,
        this.projectID = `ID-${crypto.randomUUID()}`
    }
    

    createNewProject( projectName, projectDeveloper){
        let projectID, projectStatus, projectPhases;

        projectID = `ID-${crypto.randomUUID()}`;
        projectStatus = "Ongoing";
        projectPhases = {
            landTenure: "Pending",
            servitudeLeeway: "Pending",
            resourceStudy: "Pending",
            gridConnection: "Pending",
            gridConnectionAgreement: "Pending",
            environmentalReview: "Pending",
            publicParticipation: "Pending",
            permits: "Pending",
            PowerPurchaseAgreemnet: "Pending",
            PlantDesign: "Pending",
            EPC: "Pending",
            DebtProvider: "Pending",
            EquityProvider: "Pending",
            financialModel: "Pending",
            financialModelAudit: "Pending",
            equipmentSupplier: "Pending",
            roadsLogisticsPlan: "Pending",
            taxPlan: "Pending",
            stakeholders: "Pending",
            communityEngagementPlan: "Pending",
            accDevelopmentSpendOnBudget: "Pending",
            completeDevelopmentPhase: "Pending"
        }
        return { projectName, projectDeveloper, projectID, projectStatus, projectPhases}
    }

}

module.exports = ProjectDevelopmentPhase;