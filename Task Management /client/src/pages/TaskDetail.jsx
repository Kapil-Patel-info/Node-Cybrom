import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import { 
  Table, Button, Form, Modal, 
  Card, Row, Col, Pagination,
  Badge, Container 
} from "react-bootstrap";
import { 
  CheckCircleFill, XCircleFill, 
  PencilFill, TrashFill, ArrowRepeat,
  Search, PersonFill, EnvelopeFill,
  CalendarFill, CardText, CardHeading
} from "react-bootstrap-icons";
import "../css/TaskDetail.css"; 

const TaskDetail = () => {
  const [mydata, setMydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({
    _id: "",
    title: "",
    description: "",
    compday: "",
    userid: { name: "", email: "" },
  });

  const loadData = async () => {
    try {
      const api = `${BackEndUrl}/admin/taskdetail`;
      const response = await axios.get(api);
      setMydata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeTaskStatus = async (id) => {
    try {
      await axios.get(`${BackEndUrl}/admin/changetaskstatus/?id=${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(`${BackEndUrl}/admin/handleDelete/?id=${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = mydata.filter((task) =>
      task.userid?.name?.toLowerCase().includes(value) ||
      task.userid?.email?.toLowerCase().includes(value) ||
      task.title?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleEditClick = (task) => {
    setEditTask({
      ...task,
      compday: task.compday || "",
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post(`${BackEndUrl}/admin/updatetask`, editTask);
      setShowModal(false);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredData.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredData.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="py-4 task-detail-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-primary">Task Management Dashboard</h2>
        <div className="search-box" style={{ width: '300px' }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-primary">
              <Search className="text-primary" />
            </span>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
              className="border-primary"
            />
          </div>
        </div>
      </div>

      <Row className="g-4">
        {currentTasks.map((task) => (
          <Col key={task._id} md={6} lg={4}>
            <Card className="h-100 shadow-sm task-card">
              <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                <div className="d-flex align-items-center">
                  {task.taskstatus ? (
                    <CheckCircleFill className="text-success me-2" size={20} />
                  ) : (
                    <XCircleFill className="text-danger me-2" size={20} />
                  )}
                  <Badge bg={task.taskstatus ? "success" : "warning"} className="text-uppercase">
                    {task.taskstatus ? "Completed" : "Pending"}
                  </Badge>
                </div>
                <div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    <PencilFill size={14} />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(task._id)}
                  >
                    <TrashFill size={14} />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-dark">
                  <CardHeading className="me-2 text-primary" />
                  {task.title}
                </Card.Title>
                <Card.Text className="text-muted">
                  <CardText className="me-2 text-secondary" />
                  {task.description}
                </Card.Text>
                <hr />
                <div className="mb-2">
                  <PersonFill className="me-2 text-primary" />
                  <strong>Employee:</strong> {task.userid?.name}
                </div>
                <div className="mb-2">
                  <EnvelopeFill className="me-2 text-primary" />
                  <strong>Email:</strong> {task.userid?.email}
                </div>
                <div>
                  <CalendarFill className="me-2 text-primary" />
                  <strong>Completion Day:</strong> {task.compday || "Not specified"}
                </div>
              </Card.Body>
              <Card.Footer className="bg-light">
                <div className="d-flex justify-content-between">
                  <Button 
                    variant={task.taskstatus ? "outline-success" : "outline-warning"} 
                    size="sm"
                    onClick={() => changeTaskStatus(task._id)}
                  >
                    {task.taskstatus ? (
                      <>
                        <ArrowRepeat className="me-1" /> Reassign
                      </>
                    ) : (
                      "Task pending"
                    )}
                  </Button>
                 
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredData.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination className="shadow-sm">
            <Pagination.First 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1} 
            />
            <Pagination.Prev 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
            />
            
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            
            <Pagination.Next 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages} 
            />
            <Pagination.Last 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages} 
            />
          </Pagination>
        </div>
      )}

      {/* Enhanced Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-primary">
            <PencilFill className="me-2" />
            Edit Task Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 p-3 bg-light rounded border">
            <h5 className="text-primary">Employee Information</h5>
            <div className="d-flex mb-2">
              <PersonFill className="me-2 mt-1 text-primary" />
              <div>
                <small className="text-muted">Name</small>
                <p className="mb-0">{editTask.userid?.name}</p>
              </div>
            </div>
            <div className="d-flex">
              <EnvelopeFill className="me-2 mt-1 text-primary" />
              <div>
                <small className="text-muted">Email</small>
                <p className="mb-0">{editTask.userid?.email}</p>
              </div>
            </div>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <CardHeading className="me-2 text-primary" />
                Task Title
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editTask.title}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <CardText className="me-2 text-primary" />
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editTask.description}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <CalendarFill className="me-2 text-primary" />
                Completion Day
              </Form.Label>
              <Form.Control
                type="text"
                name="compday"
                value={editTask.compday}
                onChange={handleEditChange}
                placeholder="e.g. Monday, Friday"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveChanges}
            className="shadow-sm"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskDetail;