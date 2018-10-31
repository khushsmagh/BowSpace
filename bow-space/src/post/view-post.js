import React, {Component} from 'react';
import Post from './post'
import {GetMyPost} from '../API/fetch'
import Wait from '../API/loader.js'

class ViewPost extends Component {
    
    componentDidMount() {
        this.timerId = window.setTimeout(() => this.checkNewPost(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    checkNewPost = () => {
        const viewPostProps = this.props.viewPostProps;
        const loginCredentials = viewPostProps.loginCredentials;
        const UpdateUserPost = viewPostProps.UpdateUserPost;
        var userId = viewPostProps.userSpaceID;
        if (userId === "") {
            userId = loginCredentials.UserId;
        }
        GetMyPost(userId, loginCredentials.LoginToken)
            .then(result => {
                var fetchPosts = result.MatchingPosts;
                UpdateUserPost(fetchPosts);
            })
            .catch(error => UpdateUserPost([],true))
            .then(this.timerId = window.setTimeout(() => this.checkNewPost(), 2000));
    }

    getUserName = id => {
        const userList = this.props.viewPostProps.userList;
        const user = userList.find((user) => user.UserId === id);
        if (user) {
            return user.UserName;
        }
        return '';
    }
    
    render() {
        const viewPostProps = this.props.viewPostProps;
        const userPosts = viewPostProps.userPosts;
        const posts = userPosts.posts;
        const waitNeeded = userPosts.busy;
        return (
            <div id = 'message-container' className="">
                {
                    !waitNeeded?
                    posts.map((post) => 
                        <div key={post.PostId}>
                            <Post newPost={post} sender={this.getUserName(post.SenderId)}/>
                        </div>
                    )
                    : 
                    <Wait height={100} width={100} color={'black'} />
                }
            </div>
        );
    }
}

export default ViewPost;