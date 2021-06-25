import Reimbursement from "../models/reimbursement";
import User from "../models/user";
import trmsClient from "./trms.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await trmsClient.post<User>('/', {
    username,
    password,
  });
  
  return user as User;
}

export const sendStatusUpdate = async (docid: string | undefined, status: string | undefined, comments: string | undefined): Promise<void> => {
  await trmsClient.put<any>(`/api/v1/${docid}/reimbursement-requests/${docid}/status`, {
    docid,
    status,
    comments,
  });
}

export const sendUpdateFinalGrade = async(grade: string, docid: undefined | string, comments: string | undefined): Promise<void> => {
  await trmsClient.put<any>(`/api/v1/${docid}/reimbursement-requests/${docid}`, {
    grade,
    docid,
    comments,
  });
}

export const sendForm = async (
  employeeName: string, 
  employeeEmail: string,
  eventStartDate: string,
  eventStartTime: string,
  eventLocation: string, 
  eventDescription: string, 
  eventCost: string, 
  gradingFormat: string, 
  passingGrade: string,
  eventType: string,
  attachments: File | null | string,
  projectedAmount: number,

  ): Promise<Reimbursement> => {
  const {data: formData} = await trmsClient.post<Reimbursement>(`/api/v1/${employeeName}/reimbursement-requests`, {
    employeeName, 
    employeeEmail,
    eventStartDate,
    eventStartTime,
    eventLocation, 
    eventDescription, 
    eventCost, 
    gradingFormat, 
    passingGrade,
    eventType,
    attachments,
    projectedAmount,
  });

  return formData as Reimbursement;
}

export const getUserRequests = async (user: User | undefined): Promise<Reimbursement[]> => {
  const {data: request} = await trmsClient.get<Reimbursement[]>(`/api/v1/${user?.username}/reimbursement-requests`);

  return request as Reimbursement[];
}

export const getUserOwnedRequests = async (user: User): Promise<Reimbursement[]> => {
  const {data: request} = await trmsClient.get<Reimbursement[]>(`/api/v1/${user.username}`);

  return request as Reimbursement[];
}

export const getRequestsPendingPayment = async (): Promise<Reimbursement[]> => {
  const {data: requests} = await trmsClient.get<Reimbursement[]>('/api/v1/:user/reimbursement-requests/pending')

  return requests as Reimbursement[];
}

export const getAllRequests= async (): Promise<Reimbursement[]> => {
  const {data: requests} = await trmsClient.get<Reimbursement[]>('/api/v1/:user/reimbursement-requests/all')

  return requests as Reimbursement[];
}

export const sendUpdateAmount = async(docid: string | undefined, amount: number, comment: string, isExceedingFunds: boolean): Promise<void> => {
  await trmsClient.put<any>(`/api/v1/${docid}/reimbursement-requests/${docid}/amount`, {
    docid,
    amount,
    comment,
    isExceedingFunds,
  });
}

export const sendRefund = async (username: string | undefined, refund: number | undefined): Promise<void> => {
  await trmsClient.put<any>(`/api/v1/:user/refund`)
}

export const sendDeleteRequest = async (request: Reimbursement | undefined): Promise<void> => {
  const {data: requests} = await trmsClient.delete<any>(`/api/v1/${request?.docid}/reimbursement-requests/${request?.docid}`)

  return requests
}