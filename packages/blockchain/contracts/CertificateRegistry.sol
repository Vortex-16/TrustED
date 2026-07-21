// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

interface IUniversityRegistry {
    function isUniversityApproved(address _wallet) external view returns (bool);
}

/**
 * @title CertificateRegistry
 * @notice UUPS upgradeable contract storing certificate Merkle tree roots, IPFS CIDs, and cryptographic hashes.
 */
contract CertificateRegistry is Initializable, AccessControlUpgradeable, ReentrancyGuardUpgradeable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    IUniversityRegistry public universityRegistry;

    struct CertificateBatch {
        bytes32 merkleRoot;
        string batchIpfsCid;
        uint32 totalCertificates;
        uint256 issuedAt;
        address issuer;
    }

    struct CertificateRecord {
        bytes32 certificateHash;
        string ipfsCid;
        address issuingUniversity;
        uint256 timestamp;
        bool exists;
    }

    mapping(bytes32 => CertificateRecord) public certificates;
    mapping(bytes32 => CertificateBatch) public batches;

    event BatchIssued(bytes32 indexed merkleRoot, address indexed issuer, uint32 totalCertificates, string ipfsCid);
    event SingleCertificateIssued(bytes32 indexed certHash, address indexed issuer, string ipfsCid);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address defaultAdmin, address _universityRegistry) public initializer {
        __AccessControl_init();
        __ReentrancyGuard_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        universityRegistry = IUniversityRegistry(_universityRegistry);
    }

    function issueCertificateBatch(
        bytes32 _merkleRoot,
        uint32 _totalCertificates,
        string calldata _batchIpfsCid
    ) external nonReentrant {
        require(universityRegistry.isUniversityApproved(msg.sender), "Caller is not an approved university");
        require(batches[_merkleRoot].merkleRoot == bytes32(0), "Batch Merkle Root already registered");

        batches[_merkleRoot] = CertificateBatch({
            merkleRoot: _merkleRoot,
            batchIpfsCid: _batchIpfsCid,
            totalCertificates: _totalCertificates,
            issuedAt: block.timestamp,
            issuer: msg.sender
        });

        emit BatchIssued(_merkleRoot, msg.sender, _totalCertificates, _batchIpfsCid);
    }

    function issueSingleCertificate(
        bytes32 _certHash,
        string calldata _ipfsCid
    ) external nonReentrant {
        require(universityRegistry.isUniversityApproved(msg.sender), "Caller is not an approved university");
        require(!certificates[_certHash].exists, "Certificate hash already registered");

        certificates[_certHash] = CertificateRecord({
            certificateHash: _certHash,
            ipfsCid: _ipfsCid,
            issuingUniversity: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit SingleCertificateIssued(_certHash, msg.sender, _ipfsCid);
    }

    function verifyCertificateHash(bytes32 _certHash) external view returns (bool exists, address issuer, uint256 timestamp) {
        CertificateRecord memory cert = certificates[_certHash];
        return (cert.exists, cert.issuingUniversity, cert.timestamp);
    }
}
