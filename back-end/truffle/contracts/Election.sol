/**
 * @author Sadok Mehri, Badis El Beji
 * @desc Creating voting smart contract for election
 */

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import {String} from "./String.sol";

contract Election {
    // List of events
    event VoterRegisteredEvent(address voterAddress);
    event ProposalRegisteredEvent(uint256 proposalId);
    event ProposalsRegistrationStartedEvent();
    event ProposalsRegistrationEndedEvent();
    event VotedEvent(address voter, uint256 proposalId);
    event VotingSessionStartedEvent();
    event VotingSessionEndedEvent();
    event VotesTalliedEvent();
    event ElectionWorkflowStatusChangeEvent(
        ElectionWorkflow previousStatus,
        ElectionWorkflow newStatus
    );

    // Election life cycle
    enum ElectionWorkflow {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    // Hard Coded state names
    enum StatesName {
        Tunis,
        Ariana,
        Ben_Arous,
        Mannouba,
        Bizerte,
        Nabeul,
        Beja,
        Jendouba,
        Zaghouan,
        Siliana,
        Kef,
        Sousse,
        Monastir,
        Mahdia,
        Kasserine,
        Sidi_Bouzid,
        Kairouan,
        Gafsa,
        Sfax,
        Gabes,
        Medenine,
        Tozeur,
        Kebili,
        Ttataouine
    }

    // Voter structure
    struct Voter {
        uint256 id;
        bool isRegistered;
        bool hasVoted;
        uint256 age;
        uint256 stateId;
        uint256 proposalId;
    }

    // Proposal structure
    struct Proposal {
        uint256 id;
        string fullName;
        string imageUrl;
        string description;
        uint256 voteCount;
    }

    // State structure
    struct State {
        uint256 id;
        string name;
    }

    // Variable declaration
    Proposal[] public proposals;
    State[] public states;
    Voter[] public votersArray;

    ElectionWorkflow public electionWorkflowStatus;
    address public administrator;

    mapping(address => Voter) public voters;

    uint256 public nbrVoters = 0;
    uint256 public nbrStates = 0;
    uint256 public nbrProposals = 0;
    uint256 private winningProposalId;

    /* Modifiers */

    // Check if the proposals tuple is not empty
    modifier nonEmptyProposalsTuple() {
        require(proposals.length != 0, "Thre is no data for proposals tuple");
        _;
    }

    // Check if the given index is valid
    modifier validBoundaryProposalsTuple(uint256 index) {
        require(index < proposals.length, "Out of Boundary");
        _;
    }

    // Check if the proposals tuple is not empty
    modifier nonEmptyStatesTuple() {
        require(states.length != 0, "Thre is no data for proposals tuple");
        _;
    }

    // Check if the given index is valid
    modifier validBoundaryStatesTuple(uint256 index) {
        require(index < states.length, "Out of Boundary");
        _;
    }

    // Administrator modifier, check the person who is calling the function is an administrator
    modifier onlyAdministrator() {
        require(
            msg.sender == administrator,
            "The caller must be the administrator"
        );
        _;
    }

    // This modifier ensures that the function be called if the voter is over 18 years old
    modifier onlyOver18YearsOld(uint256 age) {
        require(age >= 18, "The voter should be over 18 years old");
        _;
    }

    // This modifier ensures that the function be called if the voter is not already registred
    modifier onlyNonRegistredVoters(address _voterAddress) {
        require(
            !voters[_voterAddress].isRegistered,
            "The voter is already registered"
        );
        _;
    }

    // This modifier ensures that the caller must be a registered voter
    modifier onlyRegisteredVoter() {
        require(
            voters[msg.sender].isRegistered,
            "The caller must be a registered voter"
        );
        _;
    }

    // This modifier ensures that the function can be called only before proposals registration has started
    modifier onlyDuringVotersRegistration() {
        require(
            electionWorkflowStatus == ElectionWorkflow.RegisteringVoters,
            "This function can be called only before proposals registration has started"
        );
        _;
    }

    // This modifier ensures that the function can be called only during proposals registration
    modifier onlyDuringProposalsRegistration() {
        require(
            electionWorkflowStatus ==
                ElectionWorkflow.ProposalsRegistrationStarted,
            "This function can be called only during proposals registration"
        );
        _;
    }

    // This modifier ensures that the function can be called only after proposals registration has ended
    modifier onlyAfterProposalsRegistration() {
        require(
            electionWorkflowStatus ==
                ElectionWorkflow.ProposalsRegistrationEnded,
            "This function can be called only after proposals registration has ended"
        );
        _;
    }

    // This modifier ensures that the function can be called only during the voting session
    modifier onlyDuringVotingSession() {
        require(
            electionWorkflowStatus == ElectionWorkflow.VotingSessionStarted,
            "This function can be called only during the voting session"
        );
        _;
    }

    // This modifier ensures that the function be called only after the voting session has ended
    modifier onlyAfterVotingSession() {
        require(
            electionWorkflowStatus == ElectionWorkflow.VotingSessionEnded,
            "This function can be called only after the voting session has ended"
        );
        _;
    }

    // This modifier ensures that the function be called only after votes have been tallied
    modifier onlyAfterVotesTallied() {
        require(
            electionWorkflowStatus == ElectionWorkflow.VotesTallied,
            "This function can be called only after votes have been tallied"
        );
        _;
    }

    constructor() {
        administrator = msg.sender;
        electionWorkflowStatus = ElectionWorkflow.RegisteringVoters;
        addStates();
    }

    /* Getters */

    // Check if the address belongs to the administrator
    function isAdministrator(address _address) public view returns (bool) {
        return _address == administrator;
    }

    // Test if the address called already registred
    function isRegisteredVoter(address _voterAddress)
        public
        view
        returns (bool)
    {
        return voters[_voterAddress].isRegistered;
    }

    // Get Voters's tuple
    function getVotersTuple() public view returns (Voter[] memory) {
        return votersArray;
    }

    // Get Proposal's tuple
    function getProposalsTuple() public view returns (Proposal[] memory) {
        return proposals;
    }

    // Get full description bio of registered proposals in the election
    function getProposalInformation(uint256 index)
        public
        view
        nonEmptyProposalsTuple
        validBoundaryProposalsTuple(index)
        returns (Proposal memory)
    {
        return proposals[index];
    }

    // Get States Tuple
    function getStatesTuple() public view returns (State[] memory) {
        return states;
    }

    // Get current election phase cycle
    function getWorkflowStatus() public view returns (ElectionWorkflow) {
        return electionWorkflowStatus;
    }

    // Get the election winner
    function getWinningProposalId()
        public
        view
        onlyAfterVotesTallied
        returns (uint256)
    {
        return winningProposalId;
    }

    /* Election cycle actions */

    function addStates() private onlyAdministrator {
        registerState("Tunis");
        registerState("Ariana");
        registerState("Ben_Arous");
        registerState("Mannouba");
        registerState("Bizerte");
        registerState("Nabeul");
        registerState("Beja");
        registerState("Jendouba");
        registerState("Zaghouan");
        registerState("Siliana");
        registerState("Kef");
        registerState("Sousse");
        registerState("Monastir");
        registerState("Mahdia");
        registerState("Kasserine");
        registerState("Sidi Bouzid");
        registerState("Kairouan");
        registerState("Gafsa");
        registerState("Sfax");
        registerState("Gabes");
        registerState("Medenine");
        registerState("Tozeur");
        registerState("Kebili");
        registerState("Ttataouine");
    }

    // Registration states only done by administrator and during registration date
    function registerState(string memory state)
        private
        onlyAdministrator
        onlyDuringVotersRegistration
    {
        states.push(State({id: nbrStates++, name: state}));
    }

    // Registration voters process only done by administrator and during registration date
    function registerVoter(
        address _voterAddress,
        uint256 stateId,
        uint256 age
    )
        public
        onlyAdministrator
        onlyDuringVotersRegistration
        onlyOver18YearsOld(age)
        nonEmptyStatesTuple
        validBoundaryStatesTuple(stateId)
        onlyNonRegistredVoters(_voterAddress)
    {
        voters[_voterAddress].id = nbrVoters;
        voters[_voterAddress].isRegistered = true;
        voters[_voterAddress].hasVoted = false;
        voters[_voterAddress].stateId = stateId;
        voters[_voterAddress].age = age;
        voters[_voterAddress].proposalId = type(uint256).min;
        nbrVoters++;

        votersArray.push(
            Voter({
                id: voters[_voterAddress].id,
                isRegistered: voters[_voterAddress].isRegistered,
                hasVoted: voters[_voterAddress].hasVoted,
                stateId: voters[_voterAddress].stateId,
                age: voters[_voterAddress].age,
                proposalId: voters[_voterAddress].proposalId
            })
        );

        emit VoterRegisteredEvent(_voterAddress);
    }

    // Registring proposal for election only done by administrator and during registration date
    function startProposalsRegistration()
        public
        onlyAdministrator
        onlyDuringVotersRegistration
    {
        electionWorkflowStatus = ElectionWorkflow.ProposalsRegistrationStarted;
        emit ProposalsRegistrationStartedEvent();
        emit ElectionWorkflowStatusChangeEvent(
            ElectionWorkflow.RegisteringVoters,
            electionWorkflowStatus
        );
    }

    // Register Proposal for election
    function registerProposal(Proposal memory proposal)
        public
        onlyRegisteredVoter
        onlyDuringProposalsRegistration
    {
        require(
            !find(proposals, proposal.fullName),
            "The voter is already registered"
        );

        proposals.push(
            Proposal({
                id: nbrProposals++,
                fullName: proposal.fullName,
                imageUrl: proposal.imageUrl,
                description: proposal.description,
                voteCount: 0
            })
        );

        emit ProposalRegisteredEvent(proposals.length - 1);
    }

    // Proposal registration ending done by administrator and during registration date
    function endProposalsRegistration()
        public
        onlyAdministrator
        onlyDuringProposalsRegistration
    {
        electionWorkflowStatus = ElectionWorkflow.ProposalsRegistrationEnded;
        emit ProposalsRegistrationEndedEvent();
        emit ElectionWorkflowStatusChangeEvent(
            ElectionWorkflow.ProposalsRegistrationStarted,
            electionWorkflowStatus
        );
    }

    // Start the voting session action , it's triggered only by administrator
    function startVotingSession()
        public
        onlyAdministrator
        onlyAfterProposalsRegistration
    {
        electionWorkflowStatus = ElectionWorkflow.VotingSessionStarted;
        emit VotingSessionStartedEvent();
        emit ElectionWorkflowStatusChangeEvent(
            ElectionWorkflow.ProposalsRegistrationEnded,
            electionWorkflowStatus
        );
    }

    // End the voting session action , it's triggered only by administrator
    function endVotingSession()
        public
        onlyAdministrator
        onlyDuringVotingSession
    {
        electionWorkflowStatus = ElectionWorkflow.VotingSessionEnded;
        emit VotingSessionEndedEvent();
        emit ElectionWorkflowStatusChangeEvent(
            ElectionWorkflow.VotingSessionStarted,
            electionWorkflowStatus
        );
    }

    // The registred voters are voting one of the list
    function vote(uint256 proposalId)
        public
        onlyRegisteredVoter
        onlyDuringVotingSession
    {
        require(!voters[msg.sender].hasVoted, "The caller has already voted");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].proposalId = proposalId;
        votersArray[voters[msg.sender].id].hasVoted = true;
        proposals[proposalId].voteCount += 1;

        emit VotedEvent(msg.sender, proposalId);
    }

    // The registred voters are voting one of the list
    function tallyVotes() public onlyAdministrator onlyAfterVotingSession {
        uint256 winningVoteCount = type(uint256).min;
        uint256 winningProposalIndex = type(uint256).min;

        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalIndex = i;
            }
        }

        winningProposalId = winningProposalIndex;
        electionWorkflowStatus = ElectionWorkflow.VotesTallied;

        emit VotesTalliedEvent();
        emit ElectionWorkflowStatusChangeEvent(
            ElectionWorkflow.VotingSessionEnded,
            electionWorkflowStatus
        );
    }

    function find(Proposal[] memory array, string memory proposalFullName)
        private
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < array.length; i++)
            if (String.compareStrings(array[i].fullName, proposalFullName))
                return true;

        return false;
    }
}
