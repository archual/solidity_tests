// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract NFTLottery {
    constructor () {}

    // Need generate tickets (nft)
    // Publish NFT
    function generateTickets(uint amount) {
        for (let i = 0; i < amount; i++) {
            // generate 5 numbers from 1 to fromNumbers unique
            // write them in string with -
            const numbers = [];
            while (numbers.length !== this.amountNumbers - 1) {
                const number = Math.ceil(Math.random() * this.fromNumbers);
                if (!numbers.includes(number)) numbers.push(number);
            }
            const ticketStr = numbers.join("-");
            this.tickets = [...this.tickets, ticketStr];
        }
    }
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}