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
  attachments: File | null | string

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
    attachments
  });

  return formData as Reimbursement;
}

export const getUserRequests = async (user: User): Promise<Reimbursement[]> => {
  const {data: request} = await trmsClient.get<Reimbursement[]>(`/api/v1/${user.username}/reimbursement-requests`);

  return request as Reimbursement[];
}

export const getUserOwnedRequests = async (user: User): Promise<Reimbursement[]> => {
  const {data: request} = await trmsClient.get<Reimbursement[]>(`/api/v1/${user.username}`);

  return request as Reimbursement[];
}