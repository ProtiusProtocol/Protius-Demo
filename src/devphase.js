const { generateUUID } = require("pubnub")


class ProjectDevelopmentPhase {
    constructor ( projOwner, projectName, projectDeveloper, projectPhases, projectFinance, developerContribution ){
        this.projOwner = projOwner,
        this.projectName = projectName,
        this.projectDeveloper = projectDeveloper,
        this.projectFinance = projectFinance,
        this.developerContribution = developerContribution,
        this.projectPhases = projectPhases,
        this.projectID = crypto.randomUUID()
    }
    

    createNewProject( projOwner, projectName, projectDeveloper, projectFinance, developerContribution){
        let projectID, projectStatus, projectPhases;

        projectID = crypto.randomUUID();
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
        return { projOwner, projectName, projectDeveloper, projectFinance, developerContribution, projectID, projectStatus, projectPhases}
    }

}

module.exports = ProjectDevelopmentPhase;