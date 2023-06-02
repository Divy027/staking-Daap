import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form,Card,Button } from 'web3uikit';
import { errors, ethers } from 'ethers';

function StakeForm() {
  const stakingAddress = "0x9B58901b3e7D4266e771099bFaBA0aa18D960051";
  const tesTokenAddress = "0xfd86695Ce2cE385FAfda6E24D59f6d9115e20D00";

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };
  let withdrawOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'withdraw'
  };
  let claimOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'claimReward'
  };

  


  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    console.log('Stake transaction complete');
  }
  async function handleWithdrawSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    const amountFormated = ethers.utils.parseEther(amountToApprove, 'ether')
    console.log(amountToApprove);
    withdrawOptions.params = {
      amount: amountFormated,
    };
    console.log(withdrawOptions.params.amount);
     const tx = await runContractFunction({
      params: withdrawOptions,
      onError: (error)=> console.log(error)
    });
     console.log(tx);
  }
  async function handleClaimReward(){
    const tx = await runContractFunction({
      params: claimOptions,
      onError: (error) => console.log(error)
    });
    console.log(tx);
  }
  return (
    <div className='text-black'>
      <Form
        onSubmit={handleStakeSubmit}
        data={[
          {
            inputWidth: '50%',
            name: 'Amount to stake ',
            type: 'number',
            value: '',
            key: 'amountToStake'
          }
        ]}
        title="Stake Now!"
      ></Form> <br/>
      <Form
        onSubmit={handleWithdrawSubmit}
        data={[
          { 
          inputWidth: '50%',
          name: 'Amount to stake ',
          type: 'number',
          value: '',
          key: 'amountToStake'
          }
        ]}
        title="Withdraw Now!"
      ></Form> <br/>
      <Card > 
        <p className='text-2xl ml-2 font-bold text-yellow-400'> Claim Reward!</p> 
        <Button onClick={handleClaimReward} className='ml-2'> </Button>
      </Card>
      </div>
  );
}

export default StakeForm;
