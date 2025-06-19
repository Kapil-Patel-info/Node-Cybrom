import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import { Table, Button, Badge, Spinner, Alert, Modal } from "react-bootstrap";
import { CheckCircle, Clock, AlertCircle } from "react-feather";

const MyTask = () => {
  const [mydata, setMydata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const userId = localStorage.getItem("userid");
    const api = `${BackEndUrl}/user/mytask/?id=${userId}`;

    try {
      setLoading(true);
      const response = await axios.get(api);
      setMydata(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const submitTask = async () => {
    if (!selectedTask) return;

    const api = `${BackEndUrl}/user/completetask/?id=${selectedTask._id}`;

    try {
      setSubmitting(true);
      await axios.get(api);
      loadData();
      setShowModal(false);
    } catch (e) {
      console.error("Error submitting task:", e);
      setError("Failed to submit task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    return status ? (
      <Badge bg="success" className="d-flex align-items-center">
        <CheckCircle size={16} className="me-1" /> Completed
      </Badge>
    ) : (
      <Badge bg="warning" text="dark" className="d-flex align-items-center">
        <Clock size={16} className="me-1" /> Pending
      </Badge>
    );
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          <CheckCircle size={24} className="me-2 text-primary" />
          My Tasks
        </h3>
        <Button variant="outline-primary" onClick={loadData} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <AlertCircle size={20} className="me-2" />
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading tasks...</p>
        </div>
      ) : mydata.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th>Title</th>
                <th>Description</th>
               
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mydata.map((task) => (
                <tr key={task._id}>
                  <td className="fw-semibold">{task.title}</td>
                  <td>{task.description}</td>

                  <td>{getStatusBadge(task.taskstatus)}</td>
                  <td>
                    {task.taskstatus ? (
                      <Button variant="success" size="sm" disabled>
                        Completed
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSubmitTask(task)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded">
          <img
            src="/empty-state.svg"
            alt="No tasks"
            style={{ height: "150px", opacity: 0.7 }}
            className="mb-3"
          />
          <h5 className="text-muted">No tasks assigned yet</h5>
          <p className="text-muted">Check back later or contact your admin</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Task Completion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark <strong>"{selectedTask?.title}"</strong> as complete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitTask} disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyTask;