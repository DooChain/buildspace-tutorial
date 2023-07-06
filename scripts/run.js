const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // const waveContract = await waveContractFactory.deploy();
  // await waveContract.deployed();
  const waveContract = await hre.ethers.deployContract("WavePortal", {
    value: hre.ethers.parseEther("0.01"),
  });

  console.log("Contract deployed to:", waveContract.target);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.target
  );
  console.log("Contract balance:", hre.ethers.formatEther(contractBalance));

  /*
   * Send Wave
   */
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  /*
   * Get Contract balance to see what happened!
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.target);
  console.log("Contract balance:", hre.ethers.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
