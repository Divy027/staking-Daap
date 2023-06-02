const{ethers} =require("hardhat");

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  console.log("RewardToken contract deployed to:", rewardToken.address);

  const EarnedToken = await ethers.getContractFactory("EarnedToken");
  const EarnToken = await EarnedToken.deploy();
  await EarnToken.deployed();
  console.log("EarnToken contract deployed to:", EarnToken.address);

  const Staking = await ethers.getContractFactory("staking");
  const staking = await Staking.deploy(rewardToken.address,EarnToken.address);
  await staking.deployed();

  console.log("Staking contract deployed to:", staking.address);
}

//  handle errors if any
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
