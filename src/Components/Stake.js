import React from "react";
import homeimage from "../assets/images/chessbg.jpg"
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Stake = () => {

    const navigate = useNavigate();

    const [account1, setAccount1] = React.useState({ 'account': '', 'balance': '' })
    const [account2, setAccount2] = React.useState({ 'account': '', 'balance': '' })
    const [account1Amount, setAccount1Amount] = React.useState(0)
    const [account2Amount, setAccount2Amount] = React.useState(0)
    const [account1Staked, setAccount1Staked] = React.useState(false)
    const [account2Staked, setAccount2Staked] = React.useState(false)

    const connectAccount1 = async () => {
        console.log("jhjh");
        
        if (window.ethereum) {
            await window.ethereum.enable();
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    
        const web3 = new window.Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
    
        // Fetch the balance for the first account
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balance = web3.utils.fromWei(balanceWei, 'ether'); // Convert from wei to ether
    
        let temp = {};
        temp['account'] = accounts[0];
        temp['balance'] = balance; // Set the balance in ether
        setAccount1(temp);
    }
    
    const connectAccount2 = async () => {
        if (window.ethereum) {
            await window.ethereum.enable();
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    
        const web3 = new window.Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
    
        // Make sure the accounts are different
        if (accounts[0] !== account1.account) {
            // Fetch the balance for the second account
            const balanceWei = await web3.eth.getBalance(accounts[0]);
            const balance = web3.utils.fromWei(balanceWei, 'ether'); // Convert from wei to ether
    
            let temp = {};
            temp['account'] = accounts[0];
            temp['balance'] = balance; // Set the balance in ether
            setAccount2(temp);
        } else {
            alert('Change to the other account from Metamask.');
        }
    }
    

    const stakeAccount1 = async (e) => {
        e.preventDefault()
        localStorage.setItem('account1', account1.account);
        localStorage.setItem('account1amount', account1Amount);
        setAccount1Staked(true);
        NotificationManager.success('Account 1 Tokens Staked!');
    }

    const stakeAccount2 = async (e) => {
        e.preventDefault()
        localStorage.setItem('account2', account2.account);
        localStorage.setItem('account2amount', account2Amount);
        setAccount2Staked(true);
        NotificationManager.success('Account 2 Tokens Staked!');
    }

    return (
        <div className="bg-bgcolor">
            <Helmet>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js" />
            </Helmet>
            <div className="absolute left-36">
                <h1 onClick={() => navigate('/')} className="text-4xl font-extrabold pt-10"><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300 filter drop-shadow hover:drop-shadow-lg">NOVELTY</span></h1><br />
            </div>
            <img className="ml-auto h-screen animate-pulse" src={homeimage} alt="Novelty Chess Dapp" />
            <div className="absolute top-16 left-36 ">
                <div className="pt-10">
                    <div className="text-left">
                        <h1 className="text-3xl font-extrabold pt-8"><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300 filter drop-shadow hover:drop-shadow-lg">STAKE TOKENS</span></h1><br />
                        <h1 className="mt-2 mb-12 text-2xl text-amber-400">Play Chess on the same device.<br />Connect your accounts using Metamask.</h1>
                        <h1 className="mt-8 mb-8 text-xl text-amber-400">Click on Connect Accounts and select 2 accounts from Metamask.</h1>
                        {account1.account === "" ?
                            <button onClick={connectAccount1} className="text-white text-lg font-medium rounded-xl px-10 py-2 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">Connect Accounts</button>
                            :
                            <button className="text-white text-lg font-medium rounded-xl px-10 py-2 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">{account1.account}</button>
                        }
                        {account1Staked ? <>
                            <h1 className="mt-12 mb-8 w-2/5 text-xl text-amber-400">Since Metamask only allows one account to be connected at a time, change to the other account from Metamask and click Connect Account 2.</h1>
                            {account2.account === "" ?
                                <button onClick={connectAccount2} className="text-white text-lg font-medium rounded-xl mt-2 px-10 py-2 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">Connect Account 2</button>
                                :
                                <button className="text-white text-lg font-medium rounded-xl mt-2 px-10 py-2 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">{account2.account}</button>
                            }
                            <br />
                        </>
                            : <></>}
                    </div>
                </div>
            </div >
            {account1.account !== "" && !account1Staked ?
                <div className="absolute top-12 right-12 ">
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <form onSubmit={stakeAccount1} className="bg-amber-400 shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                                <div
                                    className="text-gray-800 text-2xl border-b-2 py-2 mb-4 text-ellipsis overflow-hidden"
                                >
                                    Stake Tokens from {account1.account}
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="Tokens"
                                        type="number"
                                        required
                                        autofocus
                                        step="0.001"
                                        min="0"
                                        placeholder="Tokens"
                                        onChange={(e) => setAccount1Amount(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="text-white text-lg font-medium rounded-xl mt-2 px-10 py-2 bg-gradient-to-r from-amber-700 to-amber-500 hover:shadow-2xl">Stake Tokens</button>
                            </form>
                        </div>
                    </div>
                </div>
                : <></>}
            {account2.account !== "" && !account2Staked ?
                <div className="absolute top-12 right-12 ">
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <form onSubmit={stakeAccount2} className="bg-amber-400 shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                                <div
                                    className="text-gray-800 text-2xl border-b-2 py-2 mb-4 text-ellipsis overflow-hidden"
                                >
                                    Stake Tokens from {account1.account}
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="Tokens"
                                        type="number"
                                        required
                                        autofocus
                                        step="0.001"
                                        min="0"
                                        placeholder="Tokens"
                                        onChange={(e) => setAccount2Amount(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="text-white text-lg font-medium rounded-xl mt-2 px-10 py-2 bg-gradient-to-r from-amber-700 to-amber-500 hover:shadow-2xl">Stake Tokens</button>
                            </form>
                        </div>
                    </div>
                </div>
                : <></>}
            {account2Staked ?
                <div className="absolute top-16 right-20 ">
                    <button onClick={() => navigate('/play/')} className="text-white text-lg font-medium rounded-xl mt-4 px-20 py-4 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">Play Now</button>
                </div>
                : <></>}
            <NotificationContainer />
        </div >
    );
};

export default Stake;