import React, {Component} from 'react';
import UserListPanel from "../user/user-list";
import Post from './post'
import {GetMyPost} from '../API/fetch'

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: ''}
    }
    
    componentDidMount() {
        var userPosts = GetMyPost(this.props.loginCredentials.UserId, this.props.loginCredentials.LoginToken);
        userPosts.then (result => { console.log("------------[rendering ***** getmypost results]---------------"); console.table(result.MatchingPosts);
            var mappedPosts = result.MatchingPosts;
            var posts = mappedPosts.map((eachPostOfUser, index) => 
            <div id={'post'+index} key={index}>
                <Post newPost={eachPostOfUser} />
            </div>
            );
            this.setState({posts: posts})
            });          
    }
    
    render() {
        console.log("------------[renderin view-post component]---------------");
        const loginCredentials = this.props.loginCredentials;
        const userList = this.props.userList;
        const setUserList = this.props.setUserList;
        var posts = this.state.posts;

        return (
 
            <div id = "main-panel" className="row align-items-center " >

                <div className="col-md-4">
                    <UserListPanel userList = {userList} setUserList = {setUserList} loginCredentials={loginCredentials} OnLogout={this.props.OnLogout}/>
                </div>
                <div className="col-md-8">
                    {posts}
                </div>


                <a href="#" className="newPostButton">+</a>
                

            </div>
            
        );
    }
}

export default ViewPost;