"use client";
import CenterLoader from "@/common/CenterLoader";
import { deleteClient, getClients } from "@/services/client/clientApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddClient from "./AddClient";
import DeleteModal from "@/common/DeleteModal";

const deleteModalInfo = {
  header: "Client Delete",
  description: "Are you sure you want to delete this client?",
};
const ClientList = () => {
  const query = useQueryClient();
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const filteredClients = data?.data?.filter((client) =>
    `${client.firstName} ${client.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const deleteMutation = useMutation({
    onMutate: () => setDeleteModalLoading(true),
    mutationFn: () => deleteClient(id),
    onSuccess: () => {
      query.invalidateQueries(["clients"]);
      setDeleteModal(false);
    },
    onSettled: () => setDeleteModalLoading(false),
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="head-label text-center">
          <h5 className="card-title ms-2 mb-0">Client</h5>
        </div>
        <button
          className="dt-button create-new btn btn-primary waves-effect waves-light"
          type="button"
          onClick={() => setShow(true)}
        >
          <span>
            <i className="ti ti-plus me-sm-1" />
            <span className="d-none d-sm-inline-block">Add Client</span>
          </span>
        </button>
      </div>
      <div className="input-group input-group-merge accent-full mt-4">
        <span className="input-group-text" id="basic-addon-search31">
          <i className="ti ti-search" />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {isLoading ? (
        <CenterLoader />
      ) : (
        <div className="card mt-2">
          <div className="card-datatable table-responsive pt-0">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>ID</th>
                  <th>Client</th>
                  <th style={{ width: "10%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients?.length > 0 ? (
                  filteredClients.map((item, i) => (
                    <tr key={item?._id}>
                      <td>{i + 1}.</td>
                      <td className="text-nowrap">
                        {item?.firstName} {item?.lastName}
                      </td>
                      <td>
                        <div className="d-flex justify-content-evenly">
                          <i className="ti ti-pencil me-1" />
                          <i
                            className="ti ti-trash me-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModal(true);
                              setId(item?._id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          handleDelete={() => deleteMutation.mutate()}
          deleteModalInfo={deleteModalInfo}
          deleteModalLoading={deleteModalLoading}
          handleClose={() => setDeleteModal(false)}
        />
      )}

      {show && <AddClient show={show} handleClose={() => setShow(false)} />}
    </div>
  );
};

export default ClientList;
