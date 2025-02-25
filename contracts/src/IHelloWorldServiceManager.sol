// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IHelloWorldServiceManager {
    event NewTaskCreated(uint32 indexed taskIndex, Task task, string location);

    event TaskResponded(uint32 indexed taskIndex, Task task, address operator);

    struct Task {
        string name;
        uint32 taskCreatedBlock;
    }

     struct TravelEvent {
        string name;
        string location;
    }

    function latestTaskNum() external view returns (uint32);

    function allTaskHashes(
        uint32 taskIndex
    ) external view returns (bytes32);

    function allTaskResponses(
        address operator,
        uint32 taskIndex
    ) external view returns (bytes memory);

    function createNewTask(
        string memory name,
        string memory location
    ) external returns (Task memory);

    function respondToTask(
        Task calldata task,
        uint32 referenceTaskIndex,
        bytes calldata signature,
        string calldata location,
        bool isSafeToPost
    ) external;
}
