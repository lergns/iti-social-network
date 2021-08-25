import { addPost, deletePost } from "../../../redux/profile/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/redux-store";
import { selectPosts } from "../../../redux/profile/profileSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
  deletePost: (postID: number) => void;
};
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType) => ({
  posts: selectPosts(state),
});

export const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, { addPost, deletePost })(MyPosts);
