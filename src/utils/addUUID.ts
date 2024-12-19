

// import { v4 as uuidv4 } from "uuid";
export function addUUID(data: object[]) {
  const result = data.map((d) => {
    return { ...d, id: crypto.randomUUID() };
  });
  return result;
}
