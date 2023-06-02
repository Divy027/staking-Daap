import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import ClaimedAbi from '../constants/EarnedToken.json';

function StakeDetails() {
  const { account, isWeb3Enabled } = useMoralis();
  const [rtBalance, setRtBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedBalance, setEarnedBalance] = useState('0');
  const [claimedBalance,setClaimedBalance] = useState('0');

  const stakingAddress="0x9B58901b3e7D4266e771099bFaBA0aa18D960051";
  const rewardTokenAddress="0xfd86695Ce2cE385FAfda6E24D59f6d9115e20D00";
  const claimedTokenAddress = "0xC299aC394f882ccF8127C912C80C082C6D021963"


  const { runContractFunction: getRTBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: rewardTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'getStaked',
    params: {
      account
    }
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'earned',
    params: {
      account
    }
  });
  
  const { runContractFunction: getClaimedBalance } = useWeb3Contract({
    abi: ClaimedAbi.abi,
    contractAddress: claimedTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });


  useEffect(() => {
    async function updateUiValues() {
      const rtBalance = (await getRTBalance({ onError: (error) => console.log(error) })).toString();
      const formattedRtBalance = parseFloat(rtBalance) / 1e18; // converting from wei to eth(tokens)
      const formattedRtBalaceRounded = formattedRtBalance.toFixed(2);
      setRtBalance(formattedRtBalaceRounded);

      const stakedBalance = (await getStakedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedStakedBalance = parseFloat(stakedBalance) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance.toFixed(2);
      setStakedBalance(formattedStakedBalanceRounded);

      const earnedBalance = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedEarnedBalance = parseFloat(earnedBalance);
       const formattedEarnedBalanceRounded = formattedEarnedBalance.toFixed(2);
      setEarnedBalance( formattedEarnedBalanceRounded);

      const claimedBalance = (await getClaimedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedClaimedBalance = parseFloat(claimedBalance);
      const formattedClaimedBalanceRounded = formattedClaimedBalance.toFixed(2);
      setClaimedBalance( formattedClaimedBalanceRounded);
    }

    if (isWeb3Enabled) updateUiValues();
  
}, [account,getEarnedBalance,getRTBalance,getStakedBalance,getClaimedBalance, isWeb3Enabled]);
return (
    <div className='p-3'>
    
      <div className='font-bold m-2'>RT Balance is: {rtBalance}</div>
      <div className='font-bold m-2'>Earned Balance is: {earnedBalance}</div>
      <div className='font-bold m-2'>Staked Balance is: {stakedBalance}</div>
      <div className='font-bold m-2'>Claimed Balance is: {claimedBalance}</div>
    </div>
  );
}

export default StakeDetails;
