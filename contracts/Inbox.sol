pragma solidity ^0.4.17;

contract Inbox {
    string public message; //will create a function message() for returning the variable
    
    //constructor function has the same name as the class
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
}