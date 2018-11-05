import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import '../css/Post.css';
import CreateCommentButton from '../Components/Buttons/CreateCommentButton'

const styles = theme => ({
    post: {
        height: '10%',
    },
});


const PostContainer = (props) => {
    return (
        <Card className="post">
            <div>
                <p>Title - {props.title}</p>
                <p>Address - {props.address}</p>
                <p>Owner Address - {props.owner}</p>
            </div>
            <CreateCommentButton />
        </Card>
    )
};

export default PostContainer;
