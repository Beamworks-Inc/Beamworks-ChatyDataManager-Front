import api from "./index";
import { Folder } from "interfaces/Content.interface";

// Folders
export const createFolderTree = async (folder: Folder) => {
  const url = "/folder";
  try {
    const response = await api.post<Folder>(url, { folder });
    return response.data;
  } catch (error: any) {
    const { status, statusText } = error.response;
    alert(`Error: (Fail to createFolderTree), ${status} ${statusText}`);
  }
};

export const getFolderTree = async () => {
  const url = "/folder";
  try {
    const response = await api.get<Folder>(url);
    return response.data; // root folder
  } catch (error: any) {
    const { status, statusText } = error.response;
    alert(`Error: (Fail to getFolderTree), ${status} ${statusText}`);
  }
};

export const updateFolderTree = async (
  originName: String,
  destName: Folder
) => {
  const url = "/folder";
  try {
    const response = await api.put<Folder>(url, { originName, destName });
    return response.data;
  } catch (error: any) {
    const { status, statusText } = error.response;
    alert(`Error: (Fail to updateFolderTree), ${status} ${statusText}`);
  }
};

export const deleteFolderTreeItem = async (name: string) => {
  const url = `/folder/${name}`;
  try {
    const response = await api.delete<Folder>(url);
    return response.data;
  } catch (error: any) {
    const { status, statusText } = error.response;
    alert(`Error: (deleteFolderTreeItem), ${status} ${statusText}`);
  }
};
