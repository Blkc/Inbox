pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    
    //constructor function has the same name as the class
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
}