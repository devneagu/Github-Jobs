import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import ReactMarkdown from "react-markdown";

const Job = function Job(props) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  function API_getJob() {
    setLoading(true);
    fetch("/api/positionid?id=" + props.id)
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        setDataList([JSON.parse(data)]);
        setLoading(false);
      });
  }

  function getJobs() {
    if (dataList.length == 0 && loading == false) API_getJob();
    if (loading) return "Loading...";
    return (
      <div>
        {dataList.map((item) => (
          <div key={item.id}>
            <div className="md:flex">
              <div className="md:flex-3 md:mr-10 pt-10 sm:pb-10">
                <Link to="/">Back</Link>
                <h1>How to apply?</h1>
                {item.how_to_apply}
              </div>

              <div className="md:flex-5 bg-white p-10">
                <h1>
                  {item.title} [ {item.type} ]
                </h1>
                <ReactMarkdown source={item.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="viewJobs">{getJobs()}</div>
    </div>
  );
};
export default Job;
