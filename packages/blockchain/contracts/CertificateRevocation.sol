// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface IUnivRegistry {
    function isUniversityApproved(address _wallet) external view returns (bool);
}

/**
 * @title CertificateRevocation
 * @notice On-chain revocation registry storing revoked certificate hashes and reason codes.
 */
contract CertificateRevocation is Initializable, AccessControlUpgradeable {
    IUnivRegistry public universityRegistry;

    struct RevocationRecord {
        bool isRevoked;
        string reason;
        uint256 revokedAt;
        address revokedBy;
    }

    mapping(bytes32 => RevocationRecord) public revocations;

    event CertificateRevoked(bytes32 indexed certHash, address indexed revokedBy, string reason);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address _universityRegistry) public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        universityRegistry = IUnivRegistry(_universityRegistry);
    }

    function revokeCertificate(bytes32 _certHash, string calldata _reason) external {
        require(universityRegistry.isUniversityApproved(msg.sender), "Only approved universities can revoke certificates");
        require(!revocations[_certHash].isRevoked, "Certificate already revoked");

        revocations[_certHash] = RevocationRecord({
            isRevoked: true,
            reason: _reason,
            revokedAt: block.timestamp,
            revokedBy: msg.sender
        });

        emit CertificateRevoked(_certHash, msg.sender, _reason);
    }

    function isCertificateRevoked(bytes32 _certHash) external view returns (bool isRevoked, string memory reason, uint256 revokedAt) {
        RevocationRecord memory rev = revocations[_certHash];
        return (rev.isRevoked, rev.reason, rev.revokedAt);
    }
}
