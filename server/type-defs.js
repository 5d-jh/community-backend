export default `
  type Comment {
    body: String!,
    date: String!,
    user: String!
  }

  type PostBody {
    preview: String,
    detail: String!
  }
  
  type UserBody {
    userId: String!
    username: String!
  }

  type Post {
    _id: String!,
    postType: String!,
    title: String,
    body: PostBody!,
    user: UserBody!,
    tag: String,
    date: String!,
    comments: [Comment] 
  }

  type IsNewPost {
    isNewPost: Boolean!,
    postList: [Post]
  }

  type Query {
    postsByRecent(skip: Int!, limit: Int!, category: String): [Post]

    post(id: String!): Post

    userSessionInfo: UserBody

    user(id: String!): UserBody

    checkNewPost(lastPostId: String!, category: String): IsNewPost

    categories: [String]!
  }

  type Mutation {
    createPost(
      title: String, 
      body: String!,
      postType: String!,
      category: String
    ): String

    createComment(postId: String!, body: String!): Boolean!

    createUser(
      username: String!,
      password: String!
    ): Boolean!
  }
`