import {
  addPost,
  PostType,
  updateNewPostText,
} from "../../../redux/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/redux-store";
// IMPORTS

type MapStatePropsType = {
  posts: Array<PostType>;
  newPostText: string;
};
type MapDispatchPropsType = {
  updateNewPostText: (inputPostText: string) => void;
  addPost: () => void;
};
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

export const MyPostsContainer = connect(mapStateToProps, {
  updateNewPostText,
  addPost,
})(MyPosts);
