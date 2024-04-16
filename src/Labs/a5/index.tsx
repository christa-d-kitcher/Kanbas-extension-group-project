import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
function Assignment5() {
    return (
      <div>
        <h1>Assignment 5</h1>
        <button className="btn btn-primary">
          <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/welcome`}>
            Welcome
          </a>
        </button>
        <EncodingParametersInURLs />
        <WorkingWithObjects />
        <WorkingWithArrays />
      </div>
    );
  }
  export default Assignment5;