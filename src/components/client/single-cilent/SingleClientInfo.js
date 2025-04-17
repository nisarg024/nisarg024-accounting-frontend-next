"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClientTable, getSingleClient } from "@/services/client/clientApi";
import { useParams } from "next/navigation";
import UserNotFound from "@/common/UserNotFound";
import SinglePageLoader from "@/common/SinglePageLoader";
import Table from "./table/Table";
import NavTab from "./table/tab-navbar/NavTab";

const SingleClientInfo = ({ id, tab }) => {
  const [editModal, setEditModal] = useState(false);
  const [active, setActive] = useState("Main");

  const { data: singleclientInfo, isLoading } = useQuery({
    queryKey: ["single-client", id],
    queryFn: () => getSingleClient(id),
  });

  const { data: tableData, isLoading: tableLoading } = useQuery({
    queryKey: ["single-client-table", id],
    queryFn: () => getClientTable(id, { tabName: tab }),
  });
  
  const { firstName, lastName } = singleclientInfo?.data ?? "";

  if (isLoading) return <SinglePageLoader />;
  if (singleclientInfo?.error) return <UserNotFound name="Client" />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="head-label text-center">
          <h5 className="card-title ms-2 mb-0">
            Client /{" "}
            <span className="text-muted">
              {firstName} {lastName}
            </span>
            <i
              className="ti ti-edit cursor-pointer ps-2"
              onClick={() => setEditModal(true)}
            />
          </h5>
        </div>
      </div>
      <div className="row mt-4 c-table">
        <div className="col-12 order-0 order-md-1 mb-4">
          <NavTab
            tabs={singleclientInfo?.data?.tabs}
            active={active}
            setActive={setActive}
          />
          <Table tableData={tableData?.data} />
        </div>
      </div>
      {/* Modal to edit profile */}
      {/* {editModal && (
        <EditProfile show={editModal} handleClose={() => setEditModal(false)} />
      )} */}
    </>
  );
};

export default SingleClientInfo;
