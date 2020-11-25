interface Journal {
  comments: Comment[];
  id: number;
  student: number;
  date: Date;
}

interface User {
  id: number;
  name: string;
  type: string;
  email: string;
  password: string;
  assignedTeacher: number;
}

interface Comment {
  id: number;
  body: string;
  author: number;
  timestamp: Date;
}

interface AddComment {
  logID: number;
  comment: string;
}

interface RemoveComment {
  logID: number;
  commentID: number;
}

interface CreateComment {
  logID: number;
  body: string;
  author: number;
}
