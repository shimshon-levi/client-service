export interface IClient {
  userId: string; // מזהה של המשתמש (client)
  advisorId: string; // מזהה של היועץ
  caseIds?: string[]; // תיקים שהלקוח פתח
  createdAt?: Date;
}
