const { generateUUID } = require("pubnub")

/*
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
*/

class ProjectDevelopmentPhase {
    constructor(
        projOwner,
        projectName,
        projectDeveloper,
        projectPhases,
        projectFinance,
        developerContribution,
        projectLocation,
        projectDistance,
        projectCapacity,
        landOwnershipStatus,
        landZoning,
        debtEquityRatio,
        equityRequired,
        expectedCODDate,
        oeContracted
    ) {
        this.projOwner = projOwner;
        this.projectName = projectName;
        this.projectDeveloper = projectDeveloper;
        this.projectFinance = projectFinance;
        this.developerContribution = developerContribution;
        this.projectPhases = projectPhases;
        this.projectLocation = projectLocation;
        this.projectDistance = projectDistance;
        this.projectCapacity = projectCapacity;
        this.landOwnershipStatus = landOwnershipStatus;
        this.landZoning = landZoning;
        this.debtEquityRatio = debtEquityRatio;
        this.equityRequired = equityRequired;
        this.expectedCODDate = expectedCODDate;
        this.oeContracted = oeContracted;
        this.projectID = crypto.randomUUID();
    }

    createNewProject(
        projOwner,
        projectName,
        projectDeveloper,
        projectFinance,
        developerContribution,
        projectLocation,
        projectDistance,
        projectCapacity,
        landOwnershipStatus,
        landZoning,
        debtEquityRatio,
        equityRequired,
        expectedCODDate,
        oeContracted
    ) {
        const projectID = crypto.randomUUID();
        const projectStatus = "Ongoing";
        const projectPhases = {
            landTenure: "Pending",
            servitudeLeeway: "Pending",
            resourceStudy: "Pending",
            gridConnection: "Pending",
            gridConnectionAgreement: "Pending",
            environmentalReview: "Pending",
            publicParticipation: "Pending",
            permits: "Pending",
            PowerPurchaseAgreement: "Pending",
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
        };

        return {
            projOwner,
            projectName,
            projectDeveloper,
            projectFinance,
            developerContribution,
            projectLocation,
            projectDistance,
            projectCapacity,
            landOwnershipStatus,
            landZoning,
            debtEquityRatio,
            equityRequired,
            expectedCODDate,
            oeContracted,
            projectID,
            projectStatus,
            projectPhases
        };
    }
}


module.exports = ProjectDevelopmentPhase;