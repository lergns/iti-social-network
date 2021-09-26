import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/store";
import { selectPosts } from "../../../redux/profile/profileSelectors";
import { profileActions } from "../../../redux/profile/profileReducer";
// IMPORTS

type MapStatePropsType = {
  posts: ReturnType<typeof selectPosts>;
};
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
  deletePost: (postID: number) => void;
};
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  posts: selectPosts(state),
});

export const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, {
  addPost: profileActions.addPost,
  deletePost: profileActions.deletePost,
})(MyPosts);
