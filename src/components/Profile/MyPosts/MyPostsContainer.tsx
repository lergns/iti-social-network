import { addPost, PostType } from "../../../redux/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/redux-store";
// IMPORTS

type MapStatePropsType = {
  posts: Array<PostType>;
};
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  posts: state.profilePage.posts,
});

export const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, { addPost })(MyPosts);
