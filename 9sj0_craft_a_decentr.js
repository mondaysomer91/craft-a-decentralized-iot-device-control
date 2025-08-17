// Import required libraries
const Web3 = require('web3');
const ethers = require('ethers');

// IoT Device Controller Class
class DecentralizedController {
  // Initialize with device ID and Ethereum provider
  constructor(deviceId, provider) {
    this.deviceId = deviceId;
    this.provider = provider;
    this.web3 = new Web3(provider);
    this.contract = new ethers.Contract(
      '0x...DeviceControllerContractAddress...', // Replace with your contract address
      [
        'function getDeviceState(address deviceId) public view returns (bool)',
        'function setDeviceState(address deviceId, bool state) public',
      ]
    );
  }

  // Get device state from blockchain
  async getDeviceState() {
    const deviceState = await this.contract.getDeviceState(this.deviceId);
    return deviceState;
  }

  // Set device state on blockchain
  async setDeviceState(state) {
    const txCount = await this.web3.eth.getTransactionCount();
    const tx = {
      from: '0x...YourEthereumAccount...', // Replace with your Ethereum account
      to: this.contract.address,
      value: '0x0',
      gas: '20000',
      gasPrice: '20000000000',
      nonce: txCount,
      data: this.contract.interface.encodeFunctionData('setDeviceState', [this.deviceId, state]),
    };
    const signedTx = await this.web3.eth.accounts.signTransaction(tx, '0x...YourEthereumPrivateKey...'); // Replace with your Ethereum private key
    await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  // Communicate with IoT device
  async sendCommand(command) {
    // Implement communication with IoT device using WebSockets, MQTT, or HTTP
    // ...
  }
}

// Example usage
const controller = new DecentralizedController('0x...DeviceId...', 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'); // Replace with your device ID and Ethereum provider
controller.setDeviceState(true);
console.log(controller.getDeviceState());