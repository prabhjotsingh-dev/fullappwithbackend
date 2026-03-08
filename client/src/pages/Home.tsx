import { useContext } from "react";
import { UserContext } from "../contextApi/UserContext";
const Home = () => {
  const context = useContext(UserContext);
  return <div>Home {context?.user.name}</div>;
};

export default Home;
