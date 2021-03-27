import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import moment from "moment";

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
        console.log(JSON.parse(data));
        setDataList(JSON.parse(data));
        setLoading(false);
      });
  }
  function formatDate(value) {
    return moment(new Date(value)).fromNow();
  }
  function getJobs() {
    if (dataList.length == 0 && loading == false) API_getJobs();
    if (loading) return "Loading...";
    return (
      <div>
        {dataList.map((item) => (
          <div className="" key={item.id}>
            <Link to={`/job/${item.id}`}>
              <div className="flex jobElement   p-6">
                <div className="flex h-16 w-16 md:h-24 md:w-24 imageBox">
                  <img
                    className="self-center mx-0 mr-6"
                    src={item.company_logo}
                  />
                </div>
                <div className="w-full text-left self-center">
                  <p className="mb-4">{item.company}</p>
                  <p className="text-lg mb-4">{item.title}</p>
                  <div className="flex">
                    <div className="flex-3 mr-10">
                      <p className="text-purple-500">{item.type}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">{item.location}</p>
                    </div>
                    <div className="flex-4">
                      <p className="text-gray-600 flex-8">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
      <div className="flex">
        <div className="viewJobs flex-1">{getJobs()}</div>
      </div>
    </div>
  );
};
export default View;
