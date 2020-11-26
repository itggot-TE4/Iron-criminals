interface Journal {
  comments: Comment[];
  id: number;
  student: number;
  date: Date;
  body: Body;
}

interface Body {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
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

interface UpdateJournal {
  id: number;
  data: string;
  questionID: number;
  week: string;
}
