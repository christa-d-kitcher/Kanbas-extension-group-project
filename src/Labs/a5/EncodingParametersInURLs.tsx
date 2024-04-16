import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [welcome, setWelcome] = useState("");
  const fetchWelcome = async () => {
    const response = await axios.get(`${API_BASE}/a5/welcome`);
    setWelcome(response.data);
  };
  const [result, setResult] = useState(a + b);
  const fetchSum = async (a: number, b: number) => {
    const response = await axios.get(`${API_BASE}/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtraction = async (a: number, b: number) => {
    const response = await axios.get(`${API_BASE}/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };
  useEffect(() => {
    fetchWelcome();
  }, []);
  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>
      <h4>Calculator</h4>
      <input type="number" value={a} className="me-3 form-control mb-2"
        onChange={(e) => setA(Number(e.target.value))}/>
      <input type="number" className="form-control mb-2"
        onChange={(e) => setB(Number(e.target.value))} value={b}/>
      <input className="form-control" value={result} type="number" readOnly />
      <h3>Fetch Result</h3>
      <button className="btn btn-primary me-2" onClick={() => fetchSum(a, b)} >
        Fetch Sum of {a} + {b}
      </button>
      <button className="btn btn-danger" onClick={() => fetchSubtraction(a, b)} >
        Fetch Substraction of {a} - {b}
      </button>
      <h3>Path Parameters</h3>
      <button className="btn btn-primary me-2">
        <a className="text-white" style={{"textDecoration":'none'}} href={`${API_BASE}/a5/add/${a}/${b}`}>
            Add {a} + {b}
        </a>
      </button>
      <button className="btn btn-danger me-2">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/subtract/${a}/${b}`}>
            Substract {a} - {b}
        </a>
      </button>
      <button className="btn btn-info me-2">
        <a className="text-white" style={{"textDecoration":'none'}} href={`${API_BASE}/a5/multiply/${a}/${b}`}>
            Multiply {a} * {b}
        </a>
      </button>
      <button className="btn btn-warning">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/divide/${a}/${b}`}>
            Divide {a} / {b}
        </a>
      </button>
      <h3>Query Parameters</h3>
      <button className="btn btn-primary me-2">
        <a className="text-white" style={{"textDecoration":'none'}}
            href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}>
            Add {a} + {b}
        </a>
      </button>
      <button className="btn btn-danger me-2">
        <a className="text-white" style={{'textDecoration':'none'}}
            href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
            Substract {a} - {b}
        </a>
      </button>
      <button className="btn btn-info me-2">
        <a className="text-white" style={{"textDecoration":'none'}}
            href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
            Multiply {a} * {b}
        </a>
      </button>
      <button className="btn btn-warning">
        <a className="text-white" style={{'textDecoration':'none'}}
            href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}>
            Divide {a} / {b}
        </a>
      </button>
    </div>
  );
}
export default EncodingParametersInURLs;