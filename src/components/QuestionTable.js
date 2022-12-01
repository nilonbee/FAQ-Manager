import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import SingleEmployee from "./TableRaw";
import { useGlobalContext } from "./Context";
import QuestionModal from "./QuestionModal";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const EmployeeList = () => {
  const {
    questions,
    handleSubmit,
    handleSearch,
    value,
    setValue,
    currentPage,
    fetchQuestions,
    pageLimit,
    handleClickOpen,
    handleClose,
  } = useGlobalContext();

  /* Pagination */

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <Button
              type="button"
              onClick={() => fetchQuestions(4, 8, 1)}
              color="primary"
              variant="outlined"
              size="small"
            >
              <ArrowForwardIosOutlinedIcon fontSize="small" />
            </Button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && questions.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <Button
              type="button"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() =>
                fetchQuestions((currentPage - 1) * 4, currentPage * 4, -1)
              }
            >
              <ArrowBackIosOutlinedIcon fontSize="small" />
            </Button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <Button
              type="button"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() =>
                fetchQuestions((currentPage + 1) * 4, (currentPage + 2) * 4, 1)
              }
            >
              <ArrowForwardIosOutlinedIcon fontSize="small" />
            </Button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <Button
              type="button"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => fetchQuestions(4, 8, -1)}
            >
              <ArrowBackIosOutlinedIcon fontSize="small" />
            </Button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  const renderModal = () => {
    return <QuestionModal open={handleClickOpen} close={handleClose} />;
  };

  return (
    <>
      <div className="container-xl">
        <div className="row">
          <div className="col-sm-10 color">
            <h2>
              <b>FAQ</b>Manager i-Labs{" "}
            </h2>
          </div>
          <div className="col-sm-2 color">
            <h2>
              <Button
                variant="outlined"
                color="primary"
                className="button"
                size="medium"
                onClick={handleClickOpen}
                startIcon={<AddCircleIcon />}
              >
                Add Question
              </Button>
            </h2>
          </div>
        </div>
        <div className="col-sm-6"></div>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="row">
              <div className="col-sm-10 color">
                <div className="form-wrapper">
                  <form onSubmit={handleSubmit} className="col-sm-12">
                    <input
                      type="text"
                      className="form-control searchbar"
                      placeholder="Search Questions"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              <div className="col-sm-2">
                <Button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleSearch}
                  color="primary"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Questions</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {questions?.map((question) => {
                return <SingleEmployee key={question.id} item={question} />;
              })}
            </table>
            <div className="row">
              <div className="col-sm-12">{renderPagination()}</div>
            </div>
          </div>
        </div>
      </div>
      {renderModal()}
    </>
  );
};

export default EmployeeList;
