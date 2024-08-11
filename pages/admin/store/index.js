import React, { useEffect, useState } from "react";
import axios from "axios";
import roles from "@/utils/roles";
import AuthHOC from "@/pages/AuthHOC";
const StoreDisplay = () => {
  const select = "border rounded-lg p-3";
  const select_container = "flex gap-3 items-center justify-between";
  const [storesList, setStoresList] = useState([]);
  const [filter, setFilter] = useState({
    "arrange-by": "name",
    "sort-by": "ascending",
  });
  function filterHandler(e, name) {
    setFilter((prev) => ({ ...prev, [name]: e.target.value }));
  }
  async function getStoresList() {
    const result = await axios.post("/api/getAllStores", {
      test: "test",
    });
    setStoresList(result.data.storesList);
  }
  useEffect(() => {
    getStoresList();
  }, []);

  useEffect(() => {
    async function filterStoresList() {
      const result = await axios.post("/api/getAllStores", {
        ...filter,
      });
      console.log(result);
      setStoresList(result.data.storesList);
    }
    filterStoresList();
  }, [filter]);

  return (
    <div>
      <div className="filter p-4 md:h-20 border flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-around md:items-center">
        <div className={`${select_container}`}>
          <label htmlFor="arrange-by">Arrange By</label>
          <select
            value={filter["arrange-by"]}
            onChange={(e) => filterHandler(e, "arrange-by")}
            className={select}
            id="arrange-by"
          >
            <option value={"name"}>Name</option>
            <option value={"email"}>Email</option>
            <option value={"address"}>Address</option>
            <option value={"overall_rating"}>Rating</option>
          </select>
        </div>
        <div className={select_container}>
          <label htmlFor="sort-by">Sort By</label>
          <select
            value={filter["sort-by"]}
            onChange={(e) => filterHandler(e, "sort-by")}
            className={select}
            id="sort-by"
          >
            <option value={"ascending"}>Ascending</option>
            <option value={"descending"}>Descending</option>
          </select>
        </div>
      </div>
      <div className="overflow-auto">
        <table>
          <thead className="">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Address</th>
              <th>E-mail</th>
              <th>Store Name</th>
              <th>Overall Rating</th>
            </tr>
          </thead>
          <tbody>
            {storesList.length > 0 &&
              storesList.map((store, index) => {
                const {
                  name,
                  email,
                  store_name,
                  overall_rating,
                  _id,
                  address,
                  role,
                } = store;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      {role == roles.ADMIN
                        ? "System Admin"
                        : role == roles.STOREOW
                        ? "Store Owner"
                        : "Normal User"}
                    </td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>{store_name}</td>
                    <td>{overall_rating}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* {storesList.map((store) => {
        const { name, email, store_name, overall_rating } = store;
        return <div>{name}</div>;
      })} */}
    </div>
  );
};

export default StoreDisplay;
