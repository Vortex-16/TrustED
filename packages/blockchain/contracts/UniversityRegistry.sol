// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title UniversityRegistry
 * @notice Maintains institutional accreditation status, authorized signing keys, and KYC verification records for universities.
 */
contract UniversityRegistry is Initializable, AccessControlUpgradeable {
    bytes32 public constant REGISTRAR_ADMIN_ROLE = keccak256("REGISTRAR_ADMIN_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    enum KYCStatus { Pending, Approved, Suspended, Revoked }

    struct University {
        string name;
        string institutionalCode;
        string domain;
        address walletAddress;
        KYCStatus kycStatus;
        uint256 registeredAt;
    }

    mapping(address => University) public universities;
    mapping(string => address) public codeToWallet;

    event UniversityRegistered(address indexed wallet, string name, string code);
    event KYCStatusUpdated(address indexed wallet, KYCStatus status);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin) public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(REGISTRAR_ADMIN_ROLE, defaultAdmin);
    }

    function registerUniversity(
        address _wallet,
        string calldata _name,
        string calldata _code,
        string calldata _domain
    ) external onlyRole(REGISTRAR_ADMIN_ROLE) {
        require(universities[_wallet].walletAddress == address(0), "University already registered");
        require(codeToWallet[_code] == address(0), "Institutional code already exists");

        universities[_wallet] = University({
            name: _name,
            institutionalCode: _code,
            domain: _domain,
            walletAddress: _wallet,
            kycStatus: KYCStatus.Approved,
            registeredAt: block.timestamp
        });

        codeToWallet[_code] = _wallet;
        emit UniversityRegistered(_wallet, _name, _code);
    }

    function updateKYCStatus(address _wallet, KYCStatus _status) external onlyRole(REGISTRAR_ADMIN_ROLE) {
        require(universities[_wallet].walletAddress != address(0), "University does not exist");
        universities[_wallet].kycStatus = _status;
        emit KYCStatusUpdated(_wallet, _status);
    }

    function isUniversityApproved(address _wallet) external view returns (bool) {
        return universities[_wallet].kycStatus == KYCStatus.Approved;
    }
}
