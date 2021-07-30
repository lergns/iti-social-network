import { addPost, PostType } from "../../../redux/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/redux-store";
import { selectPosts } from "../../../redux/profileSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
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
>(mapStateToProps, { addPost })(MyPosts);
