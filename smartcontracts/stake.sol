
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PVProjectStaking is ReentrancyGuard {

    address public developer;
    IERC20 public usdcToken;

    uint public fundingGoal;
    uint public minimumGoal;
    uint public totalStaked;
    uint public stakingDeadline;
    bool public isFunded;
    bool public financialCloseReached;

    mapping(address => uint) public stakes;
    address[] public stakers;

    event Staked(address indexed user, uint amount);
    event Refunded(address indexed user, uint amount);
    event Funded(address indexed developer, uint totalRaised);
    event PremiumDistributed(uint totalPremium);
    event Unstaked(address indexed user, uint reward);

    modifier onlyDeveloper() {
        require(msg.sender == developer, "Only developer");
        _;
    }

    modifier beforeDeadline() {
        require(block.timestamp <= stakingDeadline, "Staking closed");
        _;
    }

    modifier afterDeadline() {
        require(block.timestamp > stakingDeadline, "Staking still open");
        _;
    }

    constructor(
        address _developer,
        address _usdcToken,
        uint _fundingGoal,
        uint _minimumGoal,
        uint _stakingPeriodDays
    ) {
        developer = _developer;
        usdcToken = IERC20(_usdcToken);
        fundingGoal = _fundingGoal;
        minimumGoal = _minimumGoal;
        stakingDeadline = block.timestamp + (_stakingPeriodDays * 1 days);
    }

    function stake(uint amount) external beforeDeadline nonReentrant {
        require(amount > 0, "Must stake more than 0");
        require(usdcToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (stakes[msg.sender] == 0) {
            stakers.push(msg.sender);
        }

        stakes[msg.sender] += amount;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function confirmFundingSuccess() external onlyDeveloper afterDeadline nonReentrant {
        require(totalStaked >= minimumGoal, "Minimum funding not met");
        require(!isFunded, "Already funded");

        isFunded = true;
        require(usdcToken.transfer(developer, totalStaked), "Transfer to developer failed");

        emit Funded(developer, totalStaked);
    }

    function triggerFinancialClose(uint premiumAmount) external onlyDeveloper nonReentrant {
        require(isFunded, "Project not funded");
        require(!financialCloseReached, "Already closed");
        require(usdcToken.transferFrom(msg.sender, address(this), premiumAmount), "Premium transfer failed");

        // Distribute premium proportionally
        for (uint i = 0; i < stakers.length; i++) {
            address user = stakers[i];
            uint userShare = (stakes[user] * premiumAmount) / totalStaked;
            require(usdcToken.transfer(user, userShare), "Reward transfer failed");
            emit Unstaked(user, userShare);
        }

        financialCloseReached = true;
        emit PremiumDistributed(premiumAmount);
    }

    function refund() external afterDeadline nonReentrant {
        require(!isFunded, "Funding succeeded");
        uint amount = stakes[msg.sender];
        require(amount > 0, "No stake");

        stakes[msg.sender] = 0;
        require(usdcToken.transfer(msg.sender, amount), "Refund failed");
        emit Refunded(msg.sender, amount);
    }

    function getStakerCount() external view returns (uint) {
        return stakers.length;
    }
}