export type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
};
export type DialogueItemType = {
  id: number;
  personName: string;
};
export type MessageType = {
  id: number;
  messageText: string;
};
export type DialoguesPageType = {
  dialogues: Array<DialogueItemType>;
  messages: Array<MessageType>;
};
export type RootStateType = {
  profilePage: ProfilePageType;
  dialoguesPage: DialoguesPageType;
};

const state: RootStateType = {
  profilePage: {
    posts: [
      { id: 1, postText: "It's my first post!", likesCount: 11 },
      { id: 2, postText: "How are you, guys?", likesCount: 8 },
      { id: 3, postText: "I'm boss!!!!", likesCount: 2 },
    ],
    newPostText: "",
  },
  dialoguesPage: {
    dialogues: [
      { id: 1, personName: "Stacy" },
      { id: 2, personName: "Gracy" },
      { id: 3, personName: "Mike" },
      { id: 4, personName: "Sam" },
      { id: 5, personName: "Sanya" },
    ],
    messages: [
      { id: 1, messageText: "Best man ever, top-class man!" },
      { id: 2, messageText: "Feed." },
      { id: 3, messageText: "I don't use public transport" },
      { id: 4, messageText: "I've already fucked her" },
      { id: 5, messageText: "$5,000/month is not enough, man..." },
    ],
  },
};

export const addPost = () => {
  const newPost: PostType = {
    id: 5,
    postText: state.profilePage.newPostText, // no need to receive postText from as input to addPost() anymore - taking the same value from state directly !
    likesCount: 0,
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = ""; // clearing the input <textarea> field on post add
  onChangeReRenderApp();
};

export const updateNewPostText = (inputPostText: string) => {
  state.profilePage.newPostText = inputPostText; // inputPostText from UI <textarea>
  onChangeReRenderApp();
};

let onChangeReRenderApp = () => {};

export const subscribe = (observer: () => void) => {
  onChangeReRenderApp = observer; // observer pattern !
};

export default state;
