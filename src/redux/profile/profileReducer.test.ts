import {
  profileActions,
  ProfileInitialStateType,
  profileReducer,
} from "./profileReducer";

const initialState: ProfileInitialStateType = {
  posts: [
    { id: 1, postText: "none", likesCount: 1 },
    { id: 2, postText: "some", likesCount: 2 },
  ],
  status: "none",
  userProfile: {
    userId: 1,
    fullName: "none",
    aboutMe: "none",
    lookingForAJob: false,
    lookingForAJobDescription: "none",
    photos: { large: "none", small: "none" },
    contacts: {
      github: "none",
      vk: "none",
      facebook: "none",
      instagram: "none",
      twitter: "none",
      website: "none",
      youtube: "none",
      mainLink: "none",
    },
  },
}; // no need of beforeEach() due to reducer immutability

test("new post should be added properly", () => {
  const testText = "test text";
  const updatedState = profileReducer(
    initialState,
    profileActions.addPost(testText)
  );

  expect(updatedState.posts.length).toBe(initialState.posts.length + 1);
  expect(updatedState.posts[0].id).toBe(initialState.posts.length + 1);
  expect(updatedState.posts[0].likesCount).toBe(0);
  expect(updatedState.posts[0].postText).toBe(testText);
  expect(updatedState.status).toBe(initialState.status);
  expect(updatedState.userProfile).toEqual(initialState.userProfile);
});

test("existing post should be deleted properly", () => {
  const postID = 1;
  const updatedState = profileReducer(
    initialState,
    profileActions.deletePost(postID)
  );

  expect(updatedState.posts[0].postText).toBe(initialState.posts[1].postText);
  expect(updatedState.posts.length).toBe(initialState.posts.length - 1);
});

test("non-existing post deletion shouldn't mutate existing posts", () => {
  const postID = 100;
  const updatedState = profileReducer(
    initialState,
    profileActions.deletePost(postID)
  );

  expect(updatedState.posts[0].likesCount).toBe(
    initialState.posts[0].likesCount
  );
  expect(updatedState.posts.length).toBe(initialState.posts.length);
});
