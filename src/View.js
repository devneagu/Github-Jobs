import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";

const View = function View() {
  const [searchValue, setSearchValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [full_time, setFull_Time] = useState(0);

  function API_getJobs() {
    setLoading(true);

    fetch(
      "/api/positions?" +
        "page=" +
        page +
        "&description=" +
        searchValue +
        "&full_time=" +
        full_time
    )
      .then((data) => data.text())
      .then((data) => {
        setDataList(JSON.parse(data));
        console.log(JSON.parse(data));
        setLoading(false);
      });
  }

  function getJobs() {
    if (dataList.length == 0 && loading == false) API_getJobs();
    if (loading) return "Loading...";
    return (
      <div>
        {dataList.map((item) => (
          <div className="jobElement " key={item.id}>
            <div className="flex   p-6">
              <div className="flex h-24 w-24 imageBox">
                <img
                  className="self-center mx-0 mr-6"
                  src={item.company_logo}
                />
              </div>
              <div className="text-center md:text-left">
                <p>{item.company}</p>
                <p className="text-lg">{item.title}</p>
                <p className="text-purple-500">{item.type}</p>
                <p className="text-gray-600">{item.location}</p>
                <p className="text-gray-600">{item.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="searchContainer">
        <form
          className="text-center"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            API_getJobs();
          }}
        >
          <input
            className="md:w-3/5"
            type="text"
            name="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Title,companies, expertise or benefits"
          />
          <button>Search</button>
        </form>
      </div>

      <div className="viewJobs">{getJobs()}</div>
    </div>
  );
};
export default View;
