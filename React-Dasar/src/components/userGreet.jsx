import React, { Component } from "react";

class UserGreeting extends Component {

    constructor(props) {
        super(props)

        this.state = {
         isLogin: false   
        }
    }

    render(){
        return this.state.isLogin ? (
            <div>Welcome Admin</div>
        ) : (
            <div>Welcome Guest</div>
        )

        // if else statement
        
        // let message

        // if(this.state.isLogin){
        //     message = <div>Welcome Admin</div>
        // }else{
        //     message = <div>Welcome Guest</div>
        // }

        // return(
        //     <div>
        //         {message}
        //     </div>
        // )

        // element variables

        // let message;

        // if (this.state.isLogin) {
        //     message = <div>Welcome Admin</div>;
        // } else {
        //     message = <div>Welcome Guest</div>;
        // }

        // return message;
    }
}

export default UserGreeting