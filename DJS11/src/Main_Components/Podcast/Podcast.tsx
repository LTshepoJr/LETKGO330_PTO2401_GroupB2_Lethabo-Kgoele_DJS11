import { useParams } from "react-router-dom";

const Podcast = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <h1>This is where the pod details will be</h1>
    </>
  );
};

export default Podcast;
