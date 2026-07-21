const { ethers, upgrades } = require("hardhat");

async function main() {
  console.log("==================================================");
  console.log("Deploying VerifyEd v2.0 Smart Contracts...");
  console.log("==================================================");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // 1. Deploy UniversityRegistry UUPS Proxy
  console.log("\n1. Deploying UniversityRegistry UUPS Proxy...");
  const UniversityRegistry = await ethers.getContractFactory("UniversityRegistry");
  const univRegistry = await upgrades.deployProxy(UniversityRegistry, [deployer.address], {
    kind: "uups",
  });
  await univRegistry.waitForDeployment();
  const univAddress = await univRegistry.getAddress();
  console.log("✅ UniversityRegistry deployed to:", univAddress);

  // 2. Deploy CertificateRegistry UUPS Proxy
  console.log("\n2. Deploying CertificateRegistry UUPS Proxy...");
  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  const certRegistry = await upgrades.deployProxy(CertificateRegistry, [deployer.address, univAddress], {
    kind: "uups",
  });
  await certRegistry.waitForDeployment();
  const certAddress = await certRegistry.getAddress();
  console.log("✅ CertificateRegistry deployed to:", certAddress);

  // 3. Deploy CertificateRevocation Proxy
  console.log("\n3. Deploying CertificateRevocation Proxy...");
  const CertificateRevocation = await ethers.getContractFactory("CertificateRevocation");
  const revocationRegistry = await upgrades.deployProxy(CertificateRevocation, [deployer.address, univAddress], {
    kind: "uups",
  });
  await revocationRegistry.waitForDeployment();
  const revocationAddress = await revocationRegistry.getAddress();
  console.log("✅ CertificateRevocation deployed to:", revocationAddress);

  console.log("\n==================================================");
  console.log("DEPLOYMENT COMPLETE! Save these addresses to your .env:");
  console.log(`NEXT_PUBLIC_UNIVERSITY_REGISTRY_ADDRESS="${univAddress}"`);
  console.log(`NEXT_PUBLIC_CERTIFICATE_REGISTRY_ADDRESS="${certAddress}"`);
  console.log(`NEXT_PUBLIC_CERTIFICATE_REVOCATION_ADDRESS="${revocationAddress}"`);
  console.log("==================================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contracts:", error);
    process.exit(1);
  });
