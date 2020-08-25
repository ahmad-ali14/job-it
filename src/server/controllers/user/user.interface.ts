import Interview from "../interviews/interview.interface";

interface Iuser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interviews?: Interview[];
}

export default Iuser;
